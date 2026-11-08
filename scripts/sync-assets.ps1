param(
  [switch]$VerifyOnly
)

$ErrorActionPreference = 'Stop'
$project = Split-Path -Parent $PSScriptRoot
$showcase = Get-Content (Join-Path $project 'content/showcase.json') -Raw -Encoding utf8 | ConvertFrom-Json
$seeds = Get-Content (Join-Path $project 'content/asset-seeds.json') -Raw -Encoding utf8 | ConvertFrom-Json
$catalogPath = Join-Path $project 'content/asset-library.json'
$seedIds = @($seeds.id)
$existing = if (Test-Path -LiteralPath $catalogPath) {
  @( (Get-Content $catalogPath -Raw -Encoding utf8 | ConvertFrom-Json).assets | Where-Object { $_.category -eq 'original-concepts' -or $_.id -in $seedIds } )
} else { @() }
$images = Join-Path $project 'public/images'
$scratch = Join-Path $project '.asset-work'
$headers = @{ 'User-Agent' = 'FOHShowcase/1.0 (contact: hello@fohrestaurants.com)' }
$licenseUrl = 'https://creativecommons.org/publicdomain/zero/1.0/'
$assets = [System.Collections.Generic.List[object]]::new()

if (-not $VerifyOnly) { New-Item -ItemType Directory -Path $scratch -Force | Out-Null }

$items = [System.Collections.Generic.List[object]]::new()
$included = [System.Collections.Generic.HashSet[string]]::new()
foreach ($asset in $existing) {
  $items.Add([pscustomobject]@{
    id = $asset.id; category = $asset.category; title = $asset.fileTitle
    alt = $asset.alt; author = $asset.author
    image = $asset.image; smallImage = $asset.smallImage
  })
  [void]$included.Add($asset.id)
}
foreach ($scene in $showcase.scenes) {
  if (($scene.PSObject.Properties.Name -contains 'image') -and -not $included.Contains($scene.id)) {
    $title = [uri]::UnescapeDataString(($scene.photoSource -split '/')[-1]).Replace('_', ' ')
    $items.Add([pscustomobject]@{
      id = $scene.id; category = 'original-concepts'; title = $title
      alt = $scene.imageAlt; author = $scene.photoCredit
      image = $scene.image; smallImage = $scene.smallImage
    })
    [void]$included.Add($scene.id)
  }
}
foreach ($seed in $seeds) {
  if ($included.Contains($seed.id)) { continue }
  $items.Add([pscustomobject]@{
    id = $seed.id; category = $seed.category; title = $seed.title
    alt = ($seed.title -replace '^File:', '' -replace ' \(Unsplash.*$', '' -replace '\.(jpg|jpeg|png)$', '')
    author = $null
    image = "/images/lib-$($seed.id).webp"
    smallImage = "/images/lib-$($seed.id)-sm.webp"
  })
  [void]$included.Add($seed.id)
}

$seen = [System.Collections.Generic.HashSet[string]]::new()
foreach ($item in $items) {
  if (-not $seen.Add($item.id)) { throw "Duplicate asset id: $($item.id)" }
  $request = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' +
    [uri]::EscapeDataString($item.title) +
    '&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize%7Cmime&iiurlwidth=1600&format=json'
  $response = Invoke-RestMethod -Uri $request -Headers $headers
  $page = @($response.query.pages.PSObject.Properties.Value)[0]
  if (-not $page.imageinfo) { throw "No Commons file information: $($item.title)" }
  $info = $page.imageinfo[0]
  $license = $info.extmetadata.LicenseShortName.value
  if ($license -ne 'CC0') { throw "Expected CC0, found '$license': $($item.title)" }
  if ($info.width -lt 1200 -or $info.height -lt 700) { throw "Image too small: $($item.title)" }
  if ($info.mime -notin @('image/jpeg', 'image/png')) { throw "Unsupported image: $($item.title)" }
  $artist = [System.Net.WebUtility]::HtmlDecode(($info.extmetadata.Artist.value -replace '<[^>]+>', '' -replace '\s+', ' ').Trim())
  $author = if ($item.author) { $item.author } elseif ($artist) { $artist } else { 'Photographer listed on source page' }
  $source = $info.descriptionurl
  if (-not $source.StartsWith('https://commons.wikimedia.org/wiki/File:')) { throw "Unexpected source URL: $source" }

  $desktop = Join-Path $project ('public' + $item.image.Replace('/', [IO.Path]::DirectorySeparatorChar))
  $mobile = Join-Path $project ('public' + $item.smallImage.Replace('/', [IO.Path]::DirectorySeparatorChar))
  if (-not $VerifyOnly -and ((-not (Test-Path -LiteralPath $desktop)) -or (-not (Test-Path -LiteralPath $mobile)))) {
    $sourceFile = Join-Path $scratch ($item.id + '.source')
    Invoke-WebRequest -Uri $info.thumburl -Headers $headers -OutFile $sourceFile
    & ffmpeg -hide_banner -loglevel error -y -i $sourceFile -vf 'scale=1600:1600:force_original_aspect_ratio=decrease' -c:v libwebp -quality 78 -compression_level 5 $desktop
    if ($LASTEXITCODE -ne 0) { throw "Desktop image conversion failed: $($item.id)" }
    & ffmpeg -hide_banner -loglevel error -y -i $sourceFile -vf 'scale=720:720:force_original_aspect_ratio=decrease' -c:v libwebp -quality 73 -compression_level 5 $mobile
    if ($LASTEXITCODE -ne 0) { throw "Mobile image conversion failed: $($item.id)" }
  }
  if (-not (Test-Path -LiteralPath $desktop) -or -not (Test-Path -LiteralPath $mobile)) { throw "Missing local variants: $($item.id)" }
  $assets.Add([ordered]@{
    id = $item.id
    category = $item.category
    fileTitle = $item.title
    alt = $item.alt
    author = $author
    sourceUrl = $source
    license = 'CC0-1.0'
    licenseUrl = $licenseUrl
    verifiedOn = (Get-Date).ToString('yyyy-MM-dd')
    sourceWidth = [int]$info.width
    sourceHeight = [int]$info.height
    image = $item.image
    smallImage = $item.smallImage
  })
  Write-Output "$($item.id) | CC0 | $($info.width)x$($info.height)"
}

if (-not $VerifyOnly) {
  $catalog = [ordered]@{ schemaVersion = '1.0.0'; assets = $assets.ToArray() }
  $json = $catalog | ConvertTo-Json -Depth 6
  [System.IO.File]::WriteAllText($catalogPath, $json, [System.Text.UTF8Encoding]::new($false))
  Write-Output "Saved $($assets.Count) assets to $catalogPath"
} else {
  Write-Output "Verified $($assets.Count) CC0 assets"
}

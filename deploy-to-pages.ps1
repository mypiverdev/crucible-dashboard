# deploy-to-pages.ps1 — Build static site and push to gh-pages branch
$ErrorActionPreference = 'Stop'

$ProjectRoot = $PSScriptRoot
$Dist = Join-Path $ProjectRoot 'dist'

Write-Host "`n=== Crucible Dashboard Deploy ===" -ForegroundColor Cyan

# 1. Build the static site
Write-Host "Building static site..." -ForegroundColor Yellow
Push-Location $ProjectRoot
try {
    node build-static.js
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
} finally {
    Pop-Location
}

if (-not (Test-Path $Dist)) {
    throw "dist/ directory not found after build"
}

# 2. Copy demos and reports into dist if they exist
$PmoRoot = 'C:\projects\pmo'
$DemosSource = Join-Path $PmoRoot 'demos'
$ReportsSource = Join-Path $PmoRoot 'reports'
$DemosDest = Join-Path $Dist 'demos'
$ReportsDest = Join-Path $Dist 'reports'

if (Test-Path $DemosSource) {
    if (-not (Test-Path $DemosDest)) { New-Item -ItemType Directory -Path $DemosDest -Force | Out-Null }
    Copy-Item "$DemosSource\*" $DemosDest -Recurse -Force
    Write-Host "  Copied demos" -ForegroundColor Gray
}

if (Test-Path $ReportsSource) {
    if (-not (Test-Path $ReportsDest)) { New-Item -ItemType Directory -Path $ReportsDest -Force | Out-Null }
    Copy-Item "$ReportsSource\*" $ReportsDest -Recurse -Force
    Write-Host "  Copied reports" -ForegroundColor Gray
}

# 3. Initialize a temporary git repo in dist/, commit, and force-push to gh-pages
Write-Host "Deploying to gh-pages..." -ForegroundColor Yellow
Push-Location $Dist
try {
    git init --quiet
    git checkout -b gh-pages 2>$null
    git add -A
    git commit -m "Deploy dashboard $(Get-Date -Format 'yyyy-MM-dd HH:mm')" --quiet
    git remote add origin https://github.com/mypiverdev/crucible-dashboard.git 2>$null
    git push origin gh-pages --force --quiet
    Write-Host "  Pushed to gh-pages" -ForegroundColor Green
} finally {
    Pop-Location
}

# 4. Clean up the temporary .git in dist/
Remove-Item (Join-Path $Dist '.git') -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "`nDone! Site live at: https://mypiverdev.github.io/crucible-dashboard/" -ForegroundColor Green

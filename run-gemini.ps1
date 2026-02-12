$entry = Join-Path $env:APPDATA "npm\node_modules\@google\gemini-cli\dist\index.js"
$prompt = Get-Content "C:\projects\crucible-dashboard\prompt.txt" -Raw
$result = $prompt | & node --no-deprecation $entry -p " " 2>$null
$result | Out-File -FilePath "C:\projects\crucible-dashboard\mockup.html" -Encoding utf8
Write-Host "Done - wrote mockup.html"

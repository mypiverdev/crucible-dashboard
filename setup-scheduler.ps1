# setup-scheduler.ps1 — Create Windows Task Scheduler task for 2x/day deploys
$ErrorActionPreference = 'Stop'

$TaskName = 'Crucible\DeployDashboard'
$ScriptPath = Join-Path $PSScriptRoot 'deploy-to-pages.ps1'

Write-Host "`n=== Setting up Crucible Deploy Scheduler ===" -ForegroundColor Cyan

# Remove existing task if present
$existing = schtasks /Query /TN $TaskName 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Removing existing task..." -ForegroundColor Yellow
    schtasks /Delete /TN $TaskName /F | Out-Null
}

# Create the action
$Action = New-ScheduledTaskAction `
    -Execute 'pwsh.exe' `
    -Argument "-NonInteractive -ExecutionPolicy Bypass -File `"$ScriptPath`"" `
    -WorkingDirectory $PSScriptRoot

# Create triggers: 9am and 5pm daily
$Trigger9am = New-ScheduledTaskTrigger -Daily -At '9:00AM'
$Trigger5pm = New-ScheduledTaskTrigger -Daily -At '5:00PM'

# Settings: run whether logged in or not, don't stop if running longer
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

# Register the task (runs as current user)
Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger9am, $Trigger5pm `
    -Settings $Settings `
    -Description 'Build and deploy Crucible dashboard to GitHub Pages' `
    -Force | Out-Null

Write-Host "Task '$TaskName' created successfully!" -ForegroundColor Green
Write-Host "  Triggers: Daily at 9:00 AM and 5:00 PM" -ForegroundColor Gray
Write-Host "  Script: $ScriptPath" -ForegroundColor Gray

# Verify
Write-Host "`nVerification:" -ForegroundColor Yellow
schtasks /Query /TN $TaskName /V /FO LIST | Select-String 'Task Name|Status|Next Run|Trigger'

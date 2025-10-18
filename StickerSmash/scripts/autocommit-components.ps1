<#
Autocommit components script

What it does:
- Finds files under the `components/` directory (recursively).
- By default runs in dry-run mode and prints the commits it would make.
- With -Execute it will:
    - Create a new branch named `autocommit/components/YYYYMMDD-HHMMSS` from current HEAD
    - For each file, stage only that file and make a single commit with a message like:
        "feat(components): add/update <relative-path>"
    - Optionally make multiple commits per file if -CommitsPerFile is provided (>1). In that case each file will be committed multiple times with incremental suffixes.

Usage examples:
# Dry-run (default) - shows planned commits only
PS> .\scripts\autocommit-components.ps1

# Execute actual commits (creates a new branch)
PS> .\scripts\autocommit-components.ps1 -Execute

# Execute and make 2 commits per file
PS> .\scripts\autocommit-components.ps1 -Execute -CommitsPerFile 2

Safety notes:
- Script will create a new branch and commit local changes; it will NOT push to remote.
- Review the dry-run before running with -Execute.
- Make sure you have a clean working tree or that you understand what will be staged.

#>
param(
    [switch]$Execute,
    [int]$CommitsPerFile = 1,
    [string]$ComponentsDir = "components",
    [switch]$IncludeNested = $true
)

function Write-Heading($s){ Write-Host "`n=== $s ===" -ForegroundColor Cyan }

# Resolve repository root based on script location (script lives in scripts/)
$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
try {
    $repoRootResolved = Resolve-Path (Join-Path $scriptDir "..") -ErrorAction Stop
    $repoRoot = $repoRootResolved.Path
    Push-Location $repoRoot
} catch {
    Write-Host "Failed to resolve repository root from script location: $scriptDir" -ForegroundColor Red
    Exit 1
}

# Find component files
 $searchPath = Join-Path $repoRoot $ComponentsDir
if (-not (Test-Path $searchPath)) {
    Write-Host "Components directory not found: $searchPath" -ForegroundColor Red
    Exit 1
}

Write-Heading "Scanning components in $ComponentsDir"
$files = Get-ChildItem -Path $searchPath -Recurse -File | Where-Object { $_.Extension -ne ".map" }
if ($files.Count -eq 0) {
    Write-Host "No files found under $ComponentsDir" -ForegroundColor Yellow
    Exit 0
}

# Build planned commits
$planned = @()
foreach ($f in $files) {
    # compute relative path from repo root
    $repoRootStr = [string]$repoRoot
    if ($f.FullName.StartsWith($repoRootStr, [System.StringComparison]::OrdinalIgnoreCase)) {
        $rel = $f.FullName.Substring($repoRootStr.Length + 1)
    } else {
        $rel = $f.FullName
    }
    for ($i = 1; $i -le $CommitsPerFile; $i++) {
        $suffix = ""
        if ($CommitsPerFile -gt 1) { $suffix = " (part $i)" }
        $msg = "feat(components): update $rel$suffix"
        $planned += [PSCustomObject]@{ Path = $rel; Message = $msg }
    }
}

Write-Heading "Planned commits"
$idx = 1
foreach ($p in $planned) {
    Write-Host ("{0,3}. {1} -> {2}" -f $idx, $p.Path, $p.Message)
    $idx++
}

if (-not $Execute) {
    Write-Host "`nDry-run only. Re-run with -Execute to create branch and commit." -ForegroundColor Yellow
    Pop-Location
    Exit 0
}

# Ensure git available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "git not found in PATH" -ForegroundColor Red
    Pop-Location
    Exit 1
}

# Ensure working tree state
$status = git status --porcelain
if ($status -ne "") {
    Write-Host "Working tree is not clean. Staging/committing may include other changes." -ForegroundColor Yellow
    Write-Host $status
    $confirm = Read-Host "Proceed anyway? (y/N)"
    if ($confirm -ne 'y') { Write-Host "Aborted by user"; Pop-Location; Exit 1 }
}

# Create branch
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$branch = "autocommit/components/$ts"
git checkout -b $branch
if ($LASTEXITCODE -ne 0) { Write-Host "git checkout failed" -ForegroundColor Red; Pop-Location; Exit 1 }

Write-Heading "Creating commits on branch $branch"

foreach ($p in $planned) {
    # Reset index to HEAD to avoid staging previous things
    git reset --mixed HEAD --quiet
    # Stage only the file
    git add "$($p.Path)"
    if ($LASTEXITCODE -ne 0) { Write-Host "git add failed for $($p.Path)" -ForegroundColor Red; Pop-Location; Exit 1 }
    # Commit
    git commit -m "$($p.Message)" --quiet
    if ($LASTEXITCODE -ne 0) { Write-Host "git commit failed for $($p.Path)" -ForegroundColor Red; Pop-Location; Exit 1 }
    Write-Host "Committed: $($p.Path) -> $($p.Message)" -ForegroundColor Green
}

Write-Heading "Done"
Write-Host "Created branch: $branch" -ForegroundColor Cyan
Write-Host "No push performed. Push manually when ready: git push -u origin $branch" -ForegroundColor Yellow

Pop-Location

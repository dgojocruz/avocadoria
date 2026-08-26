# audit-images.ps1
# Reports which files in public/ are referenced anywhere in src/ or index.html.
# READ-ONLY — deletes nothing. Run from the repo root:  .\audit-images.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

Write-Host "Scanning source for image references..." -ForegroundColor Cyan

# Every place a path could be referenced: components, styles, entry HTML.
$sourceText = (
    Get-ChildItem -Path src -Recurse -Include *.jsx, *.js, *.css, *.ts, *.tsx -ErrorAction SilentlyContinue |
        Get-Content -Raw
) -join "`n"

if (Test-Path index.html) { $sourceText += "`n" + (Get-Content index.html -Raw) }

$images = Get-ChildItem -Path public -Recurse -Include *.png, *.jpg, *.jpeg, *.webp, *.gif, *.svg

$used   = [System.Collections.Generic.List[object]]::new()
$unused = [System.Collections.Generic.List[object]]::new()

foreach ($img in $images) {
    # Match on filename only — paths are written many different ways.
    if ($sourceText -like "*$($img.Name)*") { $used.Add($img) } else { $unused.Add($img) }
}

function Show-Table($list, $title, $colour) {
    if ($list.Count -eq 0) { return }
    $totalKB = [math]::Round(($list | Measure-Object Length -Sum).Sum / 1KB)
    Write-Host ""
    Write-Host "$title  ($($list.Count) files, $totalKB KB)" -ForegroundColor $colour
    Write-Host ("-" * 78)
    $list | Sort-Object Length -Descending | ForEach-Object {
        $rel = $_.FullName.Replace((Get-Location).Path + '\', '')
        $dim = ''
        if ($_.Extension -in '.png', '.jpg', '.jpeg') {
            try {
                $i = [System.Drawing.Image]::FromFile($_.FullName)
                $dim = "$($i.Width)x$($i.Height)"
                $i.Dispose()
            } catch { $dim = '?' }
        }
        "{0,-52} {1,-12} {2,6} KB" -f $rel, $dim, [math]::Round($_.Length / 1KB)
    }
}

Show-Table $unused "UNUSED - no reference found in src/ or index.html" 'Yellow'
Show-Table $used   "IN USE" 'Green'

$saving = [math]::Round(($unused | Measure-Object Length -Sum).Sum / 1KB)
Write-Host ""
Write-Host "Deleting the unused files would save $saving KB." -ForegroundColor Cyan
Write-Host "Verify a few by hand before deleting - a file referenced only from" -ForegroundColor DarkGray
Write-Host "a database, CMS entry, or a path built at runtime will look unused." -ForegroundColor DarkGray

# tree-site.ps1
# Generate a clean, filtered directory tree of the Hugo "site" folder.
# Uses Get-ChildItem for precise control.

# ----------------------------------------
# Excluded folders / files
# ----------------------------------------
$excludeList = @(
    "node_modules",
    "public",
    "resources",
    ".git",
    ".hugo_cache",
    "_cache",
    ".bin",
    "dist",
    "coverage",
    "tmp"
)

# ----------------------------------------
# Helper: recursive function to print tree
# ----------------------------------------
function Show-Tree {
    param (
        [string]$Path,
        [int]$Indent = 0
    )
    $prefix = " " * $Indent + "|-- "
    Get-ChildItem -LiteralPath $Path -Force |
        Where-Object { -not ($excludeList -contains $_.Name) } |
        Sort-Object -Property PSIsContainer -Descending |
        ForEach-Object {
            Write-Output ("$prefix" + $_.Name)
            if ($_.PSIsContainer) {
                Show-Tree -Path $_.FullName -Indent ($Indent + 4)
            }
        }
}

# ----------------------------------------
# Run tree and write to file
# ----------------------------------------
$sitePath = Join-Path $PSScriptRoot "..\site"
$outFile  = Join-Path $PSScriptRoot "..\tree-site.txt"

"Folder structure for: $sitePath" | Out-File $outFile -Encoding utf8
"Excluded: $($excludeList -join ', ')" | Out-File $outFile -Append -Encoding utf8
"" | Out-File $outFile -Append -Encoding utf8

Show-Tree -Path $sitePath | Out-File $outFile -Append -Encoding utf8

Write-Host "✅ Clean site tree written to: $outFile"

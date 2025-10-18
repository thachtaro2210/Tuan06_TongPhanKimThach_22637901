# Auto-commit script for each .tsx file in app/
# Commit từng file .tsx trong thư mục app/ với message riêng biệt

$tsxFiles = Get-ChildItem -Path "app" -Filter *.tsx -File | Sort-Object Name

foreach ($tsx in $tsxFiles) {
    git add $tsx.FullName
    git commit -m "Auto commit: $($tsx.Name)"
}

git push

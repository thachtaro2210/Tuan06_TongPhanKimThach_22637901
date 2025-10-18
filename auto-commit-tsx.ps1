# Auto-commit script for TodoList App - Commit theo tung lop
# Commit cac thay doi theo tung layer mot cach co to chuc

Write-Host "Bat dau auto-commit cho TodoList App..." -ForegroundColor Green

# Layer 1: Service Layer (API)
Write-Host "Layer 1: Service Layer (API)" -ForegroundColor Yellow
if (Test-Path "services/api.ts") {
    git add services/api.ts
    git commit -m "feat: Tao service API de ket noi voi MockAPI

- Them TodoService class voi cac method CRUD
- Ho tro getAllTodos, createTodo, updateTodo, deleteTodo
- Xu ly error handling va type safety
- Ket noi voi MockAPI endpoint"
    Write-Host "Da commit: services/api.ts" -ForegroundColor Green
}

# Layer 2: Core Screens (Man hinh chinh)
Write-Host "Layer 2: Core Screens" -ForegroundColor Yellow

# Welcome Screen
if (Test-Path "app/welcome.tsx") {
    git add app/welcome.tsx
    git commit -m "feat: Cai thien man hinh Welcome

- Giao dien hien dai voi logo va subtitle
- Form validation cho ten nguoi dung
- Layout responsive voi header, form va footer
- Su dung emoji icons va shadow effects"
    Write-Host "Da commit: app/welcome.tsx" -ForegroundColor Green
}

# Tasks Screen
if (Test-Path "app/tasks.tsx") {
    git add app/tasks.tsx
    git commit -m "feat: Cap nhat man hinh Tasks voi CRUD operations

- Tich hop TodoService de load du lieu tu API
- Them chuc nang tim kiem va refresh
- Loading states va error handling
- Giao dien card-based voi action buttons
- Pull-to-refresh va empty state
- Nut About de truy cap thong tin ung dung"
    Write-Host "Da commit: app/tasks.tsx" -ForegroundColor Green
}

# Add/Edit Job Screen
if (Test-Path "app/add-job.tsx") {
    git add app/add-job.tsx
    git commit -m "feat: Cap nhat man hinh Add/Edit Job

- Ho tro ca them moi va chinh sua cong viec
- Form validation va loading states
- TextArea cho mo ta cong viec
- Dynamic title va button text
- Error handling va success messages"
    Write-Host "Da commit: app/add-job.tsx" -ForegroundColor Green
}

# Layer 3: About Screen
Write-Host "Layer 3: About Screen" -ForegroundColor Yellow
if (Test-Path "app/about.tsx") {
    git add app/about.tsx
    git commit -m "feat: Cai thien man hinh About

- Giao dien thong tin chi tiet ve ung dung
- Danh sach tinh nang va thong tin phien ban
- Layout card-based voi scroll view
- Thong tin tac gia va MSSV"
    Write-Host "Da commit: app/about.tsx" -ForegroundColor Green
}

# Layer 4: Configuration Files
Write-Host "Layer 4: Configuration Files" -ForegroundColor Yellow

# TypeScript Config
if (Test-Path "tsconfig.json") {
    git add tsconfig.json
    git commit -m "config: Cap nhat TypeScript configuration

- Them ES2015, ES2017 support
- Cau hinh JSX va module resolution
- Ho tro async/await va modern JavaScript features"
    Write-Host "Da commit: tsconfig.json" -ForegroundColor Green
}

# README
if (Test-Path "README.md") {
    git add README.md
    git commit -m "docs: Cap nhat README voi huong dan chi tiet

- Mo ta tinh nang va cau truc du an
- Huong dan cai dat va su dung
- Thong tin API endpoints va cong nghe su dung
- Thong tin tac gia va phien ban"
    Write-Host "Da commit: README.md" -ForegroundColor Green
}

# Layer 5: Final Push
Write-Host "Layer 5: Push to Remote" -ForegroundColor Yellow
git push
Write-Host "Da push tat ca commits len remote repository" -ForegroundColor Green

Write-Host "Hoan thanh auto-commit cho TodoList App!" -ForegroundColor Green
Write-Host "Tong ket:" -ForegroundColor Cyan
Write-Host "  - Service Layer: API integration" -ForegroundColor White
Write-Host "  - Core Screens: Welcome, Tasks, Add/Edit" -ForegroundColor White
Write-Host "  - About Screen: App information" -ForegroundColor White
Write-Host "  - Configuration: TypeScript, README" -ForegroundColor White
Write-Host "  - Remote Push: All changes pushed" -ForegroundColor White

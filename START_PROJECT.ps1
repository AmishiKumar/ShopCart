Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting E-Commerce Platform" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "WARNING: .env file not found in backend folder!" -ForegroundColor Yellow
    Write-Host "Please create backend\.env file with MongoDB connection string" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Step 1: Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"
Start-Sleep -Seconds 3

Write-Host "Step 2: Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm start"

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Both servers are starting!" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "The application will open automatically in your browser." -ForegroundColor Green
Write-Host ""


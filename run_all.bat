start cmd /k "cd backend && python -m uvicorn main:app --reload --port 8001"
start cmd /k "cd frontend && python -m http.server 8000" 
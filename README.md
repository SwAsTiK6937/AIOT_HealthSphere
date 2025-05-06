# AIOT HealthSphere - Wellness Risk Monitor

A real-time health monitoring system that tracks vital health metrics and provides risk assessments using AI/ML predictions.

## Features

- Real-time health metrics monitoring (Heart Rate, Steps, Calories)
- AI-powered risk assessment
- Personalized health recommendations
- Interactive dashboard with visualizations
- Automatic data updates every 20 seconds

## Tech Stack

- Frontend: React with TypeScript
- Backend: Python FastAPI
- Database: SQLite
- AI/ML: Google Gemini API
- Authentication: Firebase

## Project Structure

```
AIOT_HealthSphere/
├── backend/           # FastAPI backend
├── wellness-risk-monitor/  # React frontend
└── run_all.bat       # Script to run both frontend and backend
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AIOT_HealthSphere.git
cd AIOT_HealthSphere
```

2. Backend Setup:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

3. Frontend Setup:
```bash
cd wellness-risk-monitor
npm install
npm run dev
```

4. Run both services:
```bash
./run_all.bat
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
FIREBASE_API_KEY=your_firebase_api_key
GEMINI_API_KEY=your_gemini_api_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
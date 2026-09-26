# Project Overview (In Depth) — AIOT HealthSphere — Wellness Risk Monitor

| Field | Value |
|---|---|
| Document ID | AIOTHS-PROJECT |
| Project | AIOT HealthSphere — Wellness Risk Monitor |
| Repository | [`SwAsTiK6937/AIOT_HealthSphere`](https://github.com/SwAsTiK6937/AIOT_HealthSphere) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** The complete, plain-English explanation of this project: why it exists, what it does, how every part works, how it evolved, its quality, security, risks and vocabulary.


## 1. The project in one paragraph

**AIOT HealthSphere** is a wellness monitor. Wearable data (Google Fit types for heart rate, step count and calories)
lands in a **Firebase Realtime Database**; a **FastAPI** backend reads it (`GET /data`), scores risk with a
**Random Forest** trained on public heart-failure and sleep-health datasets (`POST /predict`), asks **Google Gemini** for a
short recommendation, and logs each result to SQLite. Two frontends exist: a plain HTML/JS page (`frontend/`) and a
React + shadcn/ui dashboard (`wellness-risk-monitor/`, generated with Lovable) that refreshes every 20 seconds with
metric cards, a risk gauge and recommendations. `analysis/` holds the EDA notebook and model-comparison charts.

It is a learning project, **not a medical device**.


## 2. Background and why it exists

People collect wearable data but rarely get simple, timely signals about their overall wellness risk.


## 3. Fact sheet

|  |  |
|---|---|
| Repository | Public — `SwAsTiK6937/AIOT_HealthSphere` |
| Status | Academic IoT/AI project (2025) |
| Live URL | — |
| Hosting | Not deployed — runs locally |
| Primary language | Python (FastAPI) + TypeScript (React) |
| Default branch | `main` |
| History | 10 commits from 2025-04-01 to 2025-11-03 |
| Contributors | SwAsTiK6937 (6 commits), JAYESH JAIN (2 commits), LeVo011 (1 commits), VanshRajput-dev (1 commits) |
| Upstream / related | Team project by SwAsTiK6937, Jayesh Jain, LeVo011, VanshRajput-dev; Hirav Kadikar is a collaborator. |


## 4. Features explained


### Vitals ingestion

Reads users/<uid>/vitals from Firebase Realtime Database via firebase-admin


### Risk model

RandomForest (100 trees) on Age, RestingBP, Cholesterol, MaxHR, Steps, SleepHours; returns probability 0–1


### AI recommendation

Gemini generates a short fitness/wellness tip from the vitals and score


### History log

Each prediction saved to SQLite fitness_data.db


### Dashboards

Static HTML page and React dashboard (gauge, metric cards, recommendation card, 20 s refresh)


### Analysis

EDA notebook and charts comparing models


## 5. How it works end to end

FastAPI (`backend/main.py`) wires three services: `firebase_service.fetch_health_data(uid)`, `ml_model.model`
(RandomForest trained at import from CSVs in backend/data), and `gemini_api.gemini`. `POST /predict` → score → Gemini tip →
SQLite insert → JSON. The React dashboard polls the API; the static frontend does the same with fetch.


### Live check

1. Wearable data syncs into Firebase
1. Dashboard calls GET /data then POST /predict
1. Backend scores risk, asks Gemini, logs to SQLite
1. Dashboard shows vitals, gauge and tip; repeats every 20 s

Diagrams and component detail: [ARCHITECTURE.md](ARCHITECTURE.md).


## 6. Technology choices

| Layer | Technology | Why it is used |
|---|---|---|
| API | FastAPI, Uvicorn | Backend |
| ML | scikit-learn RandomForest, pandas, numpy | Risk score |
| AI | google-generativeai (gemini-2.0-flash) | Tips |
| Data | Firebase Admin, SQLite | Source and log |
| UI | React 18, Vite, shadcn/ui, Recharts | Dashboard |


## 7. Codebase tour

```text
AIOT_HealthSphere/
├── backend/               # FastAPI, model, Firebase, Gemini, SQLite
├── wellness-risk-monitor/ # React dashboard (Lovable)
├── frontend/              # static HTML version
├── analysis/              # EDA notebook + charts
├── node_modules/          # committed by mistake (~4,900 files)
└── run_all.bat
```

| Component | Location | What it does |
|---|---|---|
| API | `backend/main.py` | /data and /predict, CORS |
| Firebase | `backend/firebase_service.py` | Read vitals for a user |
| Model | `backend/ml_model.py, health_model.pkl, data/*.csv` | Train and predict |
| Gemini | `backend/gemini_api.py` | Recommendation text |
| Storage | `backend/database.py` | SQLite log |
| React dashboard | `wellness-risk-monitor/src` | Gauge, cards, polling |
| Static UI | `frontend/` | Login/signup/index pages |
| Analysis | `analysis/` | Notebook and charts |


## 8. Project timeline

| Phase | Scope | Status |
|---|---|---|
| v1 (Apr–May 2025) | Backend, model, both frontends, analysis | Done |
| Sep–Nov 2025 | Graphs, pickled model | Done |
| Next | Secrets to env, per-user auth, fix sleep/calories mismatch, clean repo | Proposed |

Recent commits:

```text
2025-11-03  pickel file
2025-09-02  graphs
2025-09-02  graphs
2025-05-06  Remove serviceAccount.json containing secrets and add to .gitignore
2025-05-06  Convert wellness-risk-monitor from submodule to regular directory and add its code to the repository
2025-05-06  Add all project files including node_modules and wellness-risk-monitor
2025-05-06  Add .gitignore and README.md
2025-04-20  Analysis
2025-04-01  changed frontend
2025-04-01  Everything about project
```


## 9. Team and ownership

| Person / group | Role | Interest |
|---|---|---|
| SwAsTiK6937 | Owner | Project delivery |
| Jayesh Jain, LeVo011, VanshRajput-dev | Contributors (analysis, frontend, model file) | Coursework |
| Hirav Kadikar | Collaborator | Review |


## Quality and testing

No automated tests; model accuracy printed at training.

Acceptance checks to run before every release:

| # | Area | Check | Expected result |
|---|---|---|---|
| 1 | API | POST /predict with sample vitals | risk_score 0–1 and a tip |
| 2 | Data | GET /data with Firebase configured | Latest vitals |


## Security and privacy

| Area | Current state |
|---|---|
| Authentication | None on the API; Firebase login pages exist in the static frontend. |
| Authorisation | Not applicable. |
| Data handled | Heart rate, steps, calories — health data. |
| Secrets | Gemini key hard-coded (must be revoked); Firebase service account read from a local file (a copy exists in history). |
| Transport | HTTPS via the hosting provider. |

Findings from this review:

| Finding | Severity | Recommendation |
|---|---|---|
| Hard-coded Gemini API key in public repo | High | Revoke + env var |
| Service-account key in Git history | High | Revoke key |
| Unauthenticated health-data API | Medium | Add auth |

Health data is sensitive (India DPDP Act 2023 / GDPR). Use only test data until auth, consent and encryption are in place.


## Risks and technical debt

| ID | Category | Risk | Score (L×I) | Mitigation |
|---|---|---|---|---|
| R-01 | Security | Leaked keys abused | 16 (High) | Revoke keys |
| R-02 | Safety | Score read as medical advice | 12 (Medium) | Disclaimer |


## Glossary

| Term | Meaning |
|---|---|
| **Firebase Realtime Database** | Google-hosted JSON database |
| **Gemini** | Google's LLM API |
| **Random Forest** | Ensemble of decision trees |
| **Vitals** | Heart rate, steps, calories from a wearable |

# Product Requirements Document (PRD) — AIOT HealthSphere — Wellness Risk Monitor

| Field | Value |
|---|---|
| Document ID | AIOTHS-PRD |
| Project | AIOT HealthSphere — Wellness Risk Monitor |
| Repository | [`SwAsTiK6937/AIOT_HealthSphere`](https://github.com/SwAsTiK6937/AIOT_HealthSphere) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Defines what the product must do, for whom, and how success is measured. It is the single source of truth for scope.


## 1. Revision history

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-09-25 | Hirav Kadikar | Full documentation suite generated from a complete review of the repository. |


## 2. Executive summary

**AIOT HealthSphere** is a wellness monitor. Wearable data (Google Fit types for heart rate, step count and calories)
lands in a **Firebase Realtime Database**; a **FastAPI** backend reads it (`GET /data`), scores risk with a
**Random Forest** trained on public heart-failure and sleep-health datasets (`POST /predict`), asks **Google Gemini** for a
short recommendation, and logs each result to SQLite. Two frontends exist: a plain HTML/JS page (`frontend/`) and a
React + shadcn/ui dashboard (`wellness-risk-monitor/`, generated with Lovable) that refreshes every 20 seconds with
metric cards, a risk gauge and recommendations. `analysis/` holds the EDA notebook and model-comparison charts.

It is a learning project, **not a medical device**.


## 3. Problem statement

People collect wearable data but rarely get simple, timely signals about their overall wellness risk.


## 4. Goals and non-goals


### 4.1 Goals

- Pull live vitals from a wearable pipeline.
- Turn them into an easy risk score plus an actionable tip.
- Show everything on a live dashboard.


### 4.2 Non-goals (explicitly out of scope)

- Medical diagnosis; multi-user production service.


## 5. Stakeholders (RACI)

| Stakeholder | Role | R/A/C/I | Interest |
|---|---|---|---|
| SwAsTiK6937 | Owner | R/A | Project delivery |
| Jayesh Jain, LeVo011, VanshRajput-dev | Contributors (analysis, frontend, model file) | R | Coursework |
| Hirav Kadikar | Collaborator | C | Review |


_R = Responsible, A = Accountable, C = Consulted, I = Informed._


## 6. Users and personas


### Fitness-tracker user

**Needs:**
- See today's vitals
- Understand risk simply
- Get one useful tip


## 7. User stories

| ID | As a… | I want to… | So that… | Priority |
|---|---|---|---|---|
| US-01 | user | my latest heart rate, steps and calories on a dashboard | I see my status at a glance | Must |
| US-02 | user | a risk score | I know if something looks off | Must |
| US-03 | user | a personalised tip | I know what to do next | Should |


## 8. Functional requirements

| ID | Area | Requirement | MoSCoW | Status |
|---|---|---|---|---|
| FR-01 | Data | Fetch latest vitals from Firebase | Must | Done (single hard-coded user ID) |
| FR-02 | Model | Predict risk from vitals | Must | Done (calories passed where the model expects sleep hours) |
| FR-03 | AI | Gemini recommendation | Should | Done (API key hard-coded) |
| FR-04 | Storage | Log predictions | Should | Done |
| FR-05 | UI | Live dashboard | Must | Done |
| FR-06 | Setup | Reproducible install and run | Must | Partly (requirements list `sqlite3`, tensorflow unused; run_all.bat ports differ) |


## 9. Non-functional requirements

| ID | Category | Requirement | Current status |
|---|---|---|---|
| NFR-01 | Freshness | Dashboard updates every 20 s | Met |
| NFR-02 | Security | No secrets in code | Not met |
| NFR-03 | Privacy | Health data protected | Partly met — CORS *, no auth on API |


## 10. User experience and key flows


### Live check

1. Wearable data syncs into Firebase
1. Dashboard calls GET /data then POST /predict
1. Backend scores risk, asks Gemini, logs to SQLite
1. Dashboard shows vitals, gauge and tip; repeats every 20 s


## 11. Success metrics (KPIs)

| Metric | Target | How it is measured |
|---|---|---|
| Model accuracy (hold-out) | Reported at training | ml_model.py prints accuracy |


## 12. Assumptions, constraints and dependencies


### Assumptions

_None recorded._


### Constraints

_None recorded._


### External dependencies

| Dependency | Used for | Risk if unavailable |
|---|---|---|
| Firebase Realtime Database | Vitals source | Service-account key required |
| Google Gemini | Recommendations | Key cost/leak |
| scikit-learn, pandas | Model | — |
| Lovable | Generated the React dashboard | — |


## 13. Release plan and roadmap

| Phase | Scope | Status |
|---|---|---|
| v1 (Apr–May 2025) | Backend, model, both frontends, analysis | Done |
| Sep–Nov 2025 | Graphs, pickled model | Done |
| Next | Secrets to env, per-user auth, fix sleep/calories mismatch, clean repo | Proposed |


## 14. Open questions

_None open._


## 15. Acceptance and sign-off

| Role | Name | Decision | Date |
|---|---|---|---|
| Product owner | Hirav Kadikar | Approved (baseline of current build) | 2026-09-25 |

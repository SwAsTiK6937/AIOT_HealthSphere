# Session Handover — AIOT HealthSphere — Wellness Risk Monitor

| Field | Value |
|---|---|
| Document ID | AIOTHS-HANDOVER |
| Project | AIOT HealthSphere — Wellness Risk Monitor |
| Repository | [`SwAsTiK6937/AIOT_HealthSphere`](https://github.com/SwAsTiK6937/AIOT_HealthSphere) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Lets the next person (or AI session) pick up the work cold: what exists, what state it is in, what is unfinished, and exactly what to do next.


## 1. Handover summary

| Item | Detail |
|---|---|
| Handover date | 2026-09-25 |
| Handed over by | Hirav Kadikar |
| Repository state | `main` @ `b1ec94d` — 10 commits, last change 2025-11-03 |
| Overall status | Academic IoT/AI project (2025) |
| Live URL | — |
| Health | Amber — demo works; security and hygiene fixes needed |


## 2. Current state (plain English)

A finished team project (last change Nov 2025). Works locally with the owner's Firebase and Gemini keys.


## 3. What is done

- Backend, model, AI tips, dashboards, analysis


## 4. In progress / partially done

- Nothing.


## 5. Known issues and bugs

| # | Issue | Impact | Suggested fix |
|---|---|---|---|
| 1 | Gemini API key hard-coded in backend/gemini_api.py (public repo) | Anyone can use the key | Revoke it in Google AI Studio; read from env |
| 2 | Firebase service-account JSON was committed then deleted (May 2025) | Key still in Git history | Revoke that key in Firebase console |
| 3 | Firebase user ID hard-coded in /data | Single-user only | Take uid from auth |
| 4 | Calories passed as sleep_hours | Wrong model input | Map fields correctly |
| 5 | API has no auth and CORS * | Health data exposed on network | Add auth, restrict CORS |
| 6 | node_modules, __pycache__, .db and .pkl committed | Huge repo | Remove + .gitignore |


## 6. Next steps (prioritised)

1. Revoke exposed keys; move to env vars.
1. Fix field mapping; add auth.
1. Clean the repository.


## 7. How to resume work in 10 minutes

```bash
git clone https://github.com/SwAsTiK6937/AIOT_HealthSphere.git
cd AIOT_HealthSphere/backend
pip install fastapi uvicorn pandas numpy scikit-learn firebase-admin google-generativeai
python main.py                     # http://localhost:8000
cd ../wellness-risk-monitor && npm install && npm run dev
```


## 8. Access, accounts and secrets

Secrets are **never** stored in this repository. The table lists where each credential lives, not its value.

| System | What you need | Where it lives |
|---|---|---|
| GitHub SwAsTiK6937/AIOT_HealthSphere | Owner | GitHub |
| Firebase project fithealthfirebase | Console access | console.firebase.google.com |
| Gemini | API key | aistudio.google.com |


## 9. Gotchas and tribal knowledge

_None recorded._


## 10. Key files to read first

| File | Why |
|---|---|
| `backend/main.py` | API |
| `backend/ml_model.py` | Model |


## 11. Recent history

```text
2025-11-03  b1ec94d  pickel file
2025-09-02  fbe344b  graphs
2025-09-02  e48c866  graphs
2025-05-06  79dc305  Remove serviceAccount.json containing secrets and add to .gitignore
2025-05-06  7a87741  Convert wellness-risk-monitor from submodule to regular directory and add its code to the repository
2025-05-06  7a61a10  Add all project files including node_modules and wellness-risk-monitor
2025-05-06  1800df4  Add .gitignore and README.md
2025-04-20  42e1314  Analysis
2025-04-01  a30ca48  changed frontend
2025-04-01  984debd  Everything about project
```


## 12. Handover checklist

- [ ] Repository builds from a clean clone using the README steps
- [ ] Environment variables documented in the README / runbook
- [ ] Open risks recorded in the risk register
- [ ] Next steps above agreed with the product owner
- [ ] Access to hosting / third-party accounts transferred or shared

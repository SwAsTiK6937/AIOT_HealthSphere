# Operations Runbook — AIOT HealthSphere — Wellness Risk Monitor

| Field | Value |
|---|---|
| Document ID | AIOTHS-RUNBOOK |
| Project | AIOT HealthSphere — Wellness Risk Monitor |
| Repository | [`SwAsTiK6937/AIOT_HealthSphere`](https://github.com/SwAsTiK6937/AIOT_HealthSphere) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Step-by-step instructions to set up, deploy, operate, monitor, recover and support the system.


## 1. Service overview

| Item | Detail |
|---|---|
| Service | AIOT HealthSphere — Wellness Risk Monitor |
| Hosting | Not deployed — runs locally |
| Live URL | — |
| Owner / on-call | Hirav Kadikar |
| Criticality | Low — non-revenue critical |
| Target availability | Best effort (no contractual SLA) |


## 2. Environments

| Environment | Where | Notes |
|---|---|---|
| Local | API :8000 (main.py) or :8001 (run_all.bat); React via `npm run dev` | Needs serviceAccountKey.json |


## 3. Local setup


### Prerequisites

- Python 3.10, Node 18
- Firebase service-account key (backend/serviceAccountKey.json)
- Gemini API key


### Steps

```bash
git clone https://github.com/SwAsTiK6937/AIOT_HealthSphere.git
cd AIOT_HealthSphere/backend
pip install fastapi uvicorn pandas numpy scikit-learn firebase-admin google-generativeai
python main.py                     # http://localhost:8000
cd ../wellness-risk-monitor && npm install && npm run dev
```


## 4. Configuration and secrets

No configuration required.


## 5. Build and release

_Not deployed._


## 6. Rollback

1. Revert the offending commit on the default branch (`git revert <sha>`) and push; the host redeploys the previous good state.
1. If the host keeps previous deployments (e.g. Vercel/Netlify), promote the last good deployment from the dashboard for an instant rollback.


## 7. Monitoring and logging

No monitoring is configured. Minimum recommendation: an uptime check on the live URL and error alerts from the host.


## 8. Backup and disaster recovery

Source code is the only asset and is backed up by GitHub. Re-deploying from the default branch fully restores the service.

| Metric | Target |
|---|---|
| RPO (max data loss) | 0 — code is in Git |
| RTO (max downtime) | < 1 hour — redeploy from Git |


## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Firebase error on start | serviceAccountKey.json missing | Add key (never commit it) |
| pip fails on sqlite3 | Not a pip package | Remove from requirements |
| Dashboard empty | API on 8001 vs 8000 mismatch | Use one port |


## 10. Incident response

1. **Detect** — alert, user report or failed check.
1. **Triage** — confirm impact; classify: SEV1 (site down / data exposed), SEV2 (major feature broken), SEV3 (minor).
1. **Mitigate** — roll back (section 6) before debugging if users are affected.
1. **Fix** — reproduce locally, patch on a branch, test, deploy.
1. **Review** — write a short blameless post-mortem: timeline, root cause, actions; add new risks to the risk register.


## 11. Routine maintenance

- Monthly: update dependencies and re-run the test plan.
- Quarterly: rotate secrets and review access.
- Per release: update CHANGELOG.md and the session handover.

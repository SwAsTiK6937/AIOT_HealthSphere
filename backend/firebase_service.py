import os
import firebase_admin
from firebase_admin import credentials, db

# Get absolute path to the service account key
service_key_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")
if not firebase_admin._apps:
    cred = credentials.Certificate(service_key_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://fithealthfirebase-default-rtdb.asia-southeast1.firebasedatabase.app'
    })

def fetch_health_data(user_id):
    """
    Fetch the latest heart_rate, step_count, and calories from the user's vitals entries in Firebase.
    """
    ref = db.reference(f'users/{user_id}/vitals')
    vitals = ref.get()
    return vitals
    print(f"[DEBUG] Fetched vitals for user {user_id}: {vitals}")
    latest = {'heart_rate': None, 'step_count': None, 'calories': None}
    if vitals:
        # Find the latest value for each type
        for entry in vitals.values():
            vtype = entry.get('type', '')
            value = entry.get('value')
            print(f"[DEBUG] Entry: type={vtype}, value={value}")
            if vtype == 'com.google.heart_rate.bpm':
                latest['heart_rate'] = float(value)
            elif vtype == 'com.google.step_count.delta':
                latest['step_count'] = int(float(value))
            elif vtype == 'com.google.calories.expended':
                latest['calories'] = float(value)
    print(f"[DEBUG] Latest values: {latest}")
    return latest if latest['heart_rate'] is not None and latest['step_count'] is not None else None 
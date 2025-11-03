import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

class HealthModel:
    def __init__(self, train=True):
        self.model = RandomForestClassifier(n_estimators=100)
        self.scaler = StandardScaler()
        self.imputer = SimpleImputer(strategy='mean')

        if train:
            self.load_and_train()

    def load_and_train(self):
        # Load datasets
        df_heart = pd.read_csv("data/heart_failure.csv")
        df_sleep = pd.read_csv("data/sleep_health.csv")[['Heart Rate', 'Daily Steps', 'Sleep Duration']]
        df_sleep.columns = ['MaxHR', 'Steps', 'SleepHours']

        # Combine
        X = df_heart[['Age', 'RestingBP', 'Cholesterol', 'MaxHR']].copy()
        X['Steps'] = df_sleep['Steps'].iloc[:len(X)].fillna(df_sleep['Steps'].mean())
        X['SleepHours'] = df_sleep['SleepHours'].iloc[:len(X)].fillna(df_sleep['SleepHours'].mean())
        y = df_heart['HeartDisease']

        # Impute + Scale
        X = self.imputer.fit_transform(X)
        X = self.scaler.fit_transform(X)

        # Split & Train
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        accuracy = self.model.score(X_test, y_test)

        print(f"🔥 Model Trained | Accuracy: {accuracy:.2f}")

    def predict_risk(self, heart_rate, steps, sleep_hours, age=30, bp=120, cholesterol=200):
        feats = np.array([[age, bp, cholesterol, heart_rate, steps, sleep_hours]])
        feats = self.imputer.transform(feats)
        feats = self.scaler.transform(feats)
        prob = self.model.predict_proba(feats)[0][1]
        return prob


# --- Train & Save Model ---
if __name__ == "__main__":
    print("⏳ Training model...")
    model = HealthModel(train=True)

    with open("health_model.pkl", "wb") as f:
        pickle.dump(model, f)

    print("✅ Model saved as health_model.pkl")
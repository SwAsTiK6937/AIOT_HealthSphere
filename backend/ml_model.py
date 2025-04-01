import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer  # Add this for handling NaNs

class HealthModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100)
        self.scaler = StandardScaler()
        self.imputer = SimpleImputer(strategy='mean')  # Impute NaNs with mean
        self.load_and_train()

    def load_and_train(self):
        # Load heart failure dataset
        df_heart = pd.read_csv("data/heart_failure.csv")
        # Load sleep health dataset and merge relevant features
        df_sleep = pd.read_csv("data/sleep_health.csv")[['Heart Rate', 'Daily Steps', 'Sleep Duration']]
        df_sleep.columns = ['MaxHR', 'Steps', 'SleepHours']  # Rename for consistency
        
        # Combine datasets
        X = df_heart[['Age', 'RestingBP', 'Cholesterol', 'MaxHR']].copy()
        X['Steps'] = df_sleep['Steps'].iloc[:len(X)].fillna(df_sleep['Steps'].mean())
        X['SleepHours'] = df_sleep['SleepHours'].iloc[:len(X)].fillna(df_sleep['SleepHours'].mean())
        y = df_heart['HeartDisease']
        
        # Impute missing values
        X = self.imputer.fit_transform(X)  # Replace NaNs with column means
        
        # Preprocess with scaling
        X = self.scaler.fit_transform(X)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train model
        self.model.fit(X_train, y_train)
        print(f"Model Accuracy: {self.model.score(X_test, y_test):.2f}")

    def predict_risk(self, heart_rate, steps, sleep_hours, age=30, bp=120, cholesterol=200):
        features = np.array([[age, bp, cholesterol, heart_rate, steps, sleep_hours]])
        # Impute NaNs in case user input somehow introduces them (unlikely here)
        features = self.imputer.transform(features)
        scaled_features = self.scaler.transform(features)
        risk_score = self.model.predict_proba(scaled_features)[0][1]
        return risk_score

model = HealthModel()
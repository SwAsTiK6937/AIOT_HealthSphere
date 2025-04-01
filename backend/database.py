import sqlite3
from datetime import datetime

class Database:
    def __init__(self, db_name="fitness_data.db"):
        self.conn = sqlite3.connect(db_name)
        self.create_tables()

    def create_tables(self):
        with self.conn:
            self.conn.execute("""
                CREATE TABLE IF NOT EXISTS user_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT,
                    heart_rate REAL,
                    steps INTEGER,
                    sleep_hours REAL,
                    risk_score REAL
                )
            """)

    def insert_data(self, heart_rate, steps, sleep_hours, risk_score):
        timestamp = datetime.now().isoformat()
        with self.conn:
            self.conn.execute("""
                INSERT INTO user_data (timestamp, heart_rate, steps, sleep_hours, risk_score)
                VALUES (?, ?, ?, ?, ?)
            """, (timestamp, heart_rate, steps, sleep_hours, risk_score))

    def fetch_recent_data(self, limit=10):
        with self.conn:
            cursor = self.conn.execute("SELECT * FROM user_data ORDER BY timestamp DESC LIMIT ?", (limit,))
            return cursor.fetchall()

db = Database()
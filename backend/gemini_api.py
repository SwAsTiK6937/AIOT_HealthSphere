import google.generativeai as genai

class GeminiAPI:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        # Use a known valid model (e.g., gemini-1.5-pro, adjust based on availability)
        self.model = genai.GenerativeModel('gemini-1.5-pro')  # Updated model name
        
        # Optional: List available models for debugging (uncomment to run once)
        # self.list_available_models()

    def list_available_models(self):
        # Print all available models for debugging
        models = genai.list_models()
        for model in models:
            print(f"Model: {model.name}, Supported Methods: {model.supported_generation_methods}")
        return models

    def generate_recommendation(self, heart_rate, steps, calories, risk_score):
        prompt = f"""
        Given a user with heart rate {heart_rate} bpm, {steps} steps, {calories} calories, 
        and a health risk score of {risk_score:.2f}:
        Provide a concise fitness and wellness recommendation.
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating recommendation: {str(e)}"

# Replace with your actual Gemini API key
gemini = GeminiAPI(api_key="AIzaSyD_rBV_zI-DPJmvPxJGBowsAV4ylBvWBw4")
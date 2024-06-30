from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Load the model
model = joblib.load('investment_model.pkl')

from flask_cors import CORS  # Add this import
app = Flask(__name__)
CORS(app)

def get_investment_advice(model, user_inputs):
    user_data = pd.DataFrame([user_inputs])

    # Make prediction using the model
    predictions = model.predict(user_data)
    advice = predictions[0]
    return advice

@app.route('/predict/stock', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        user_inputs = {
            'Age_Group': data['Age_Group'],
            'Risk_Level': data['Risk_Level'],
            'Amount_to_Invest': data['Amount_to_Invest'],
            'Investment_Term': data['Investment_Term'],
            'Diversity_Option': data['Diversity_Option']
        }
        advice = get_investment_advice(model, user_inputs)
        return jsonify({'Investment Advice': advice})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5002)

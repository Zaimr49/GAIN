from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import os
from tensorflow.keras.models import load_model
from flask_cors import CORS  # Add this import
import pickle

app = Flask(__name__)
CORS(app) 
# Load the scaler
model_dir = 'models'
with open(os.path.join(model_dir, 'scaler.pkl'), 'rb') as f:
    scaler = pickle.load(f)

# Load the models
company_models = {}
for filename in os.listdir(model_dir):
    if filename.endswith('.h5'):
        company_name = filename[:-3]  # Remove '.h5' extension
        company_models[company_name] = load_model(os.path.join(model_dir, filename))

# Load and prepare the data
df = pd.read_csv('complete_data.csv')
df['Date'] = pd.to_datetime(df['Date'], format='mixed')
df = df.sort_values(['Company', 'Date'])

# Select features for the model
features = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', 'Sentiment']
sequence_length = 10  # Should match the value used during training

def predict_stock_movement(company, latest_data):
    if company not in company_models:
        return "Company not found in the dataset."
    
    model = company_models[company]
    
    # Ensure we're only using the specified features
    latest_data_features = latest_data[features]
    
    # Scale the data
    latest_data_scaled = scaler.transform(latest_data_features)
    
    # Reshape for LSTM input (samples, time steps, features)
    sequence = latest_data_scaled.reshape(1, sequence_length, len(features))
    
    prediction = model.predict(sequence)[0, 0]
    
    return "Up" if prediction > 0.51 else "Down"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    company_name = data.get('company')
    
    if not company_name:
        return jsonify({"error": "Company name is required"}), 400
    
    latest_data = df[df['Company'] == company_name].tail(sequence_length)
    
    if latest_data.empty:
        return jsonify({"error": "Company not found or insufficient data"}), 404
    
    prediction = predict_stock_movement(company_name, latest_data)
    return jsonify({"company": company_name, "prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)

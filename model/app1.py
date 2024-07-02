from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
import os
from flask_cors import CORS

np.seterr(invalid='ignore')  # Ignore invalid (NaN) values
app = Flask(_name_)
CORS(app)

# Load and prepare the data
df = pd.read_csv('complete_data.csv')
df['Date'] = pd.to_datetime(df['Date'], format='mixed')
df = df.sort_values(['Company', 'Date'])

# Create target variable (1 if price went up, 0 if down)
df['Target'] = (df.groupby('Company')['Close'].shift(-1) > df['Close']).astype(int)

# Select features for the model
features = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', 'Sentiment']

# Handle null values
def handle_nulls(group):
    for feature in features:
        if group[feature].notna().any():
            median = group[feature].median() if group[feature].notna().sum() > 0 else 0
            group[feature] = group[feature].fillna(median)
    return group

df = df.groupby('Company').apply(handle_nulls).reset_index(drop=True)

# Normalize the features
scaler = MinMaxScaler()
df[features] = scaler.fit_transform(df[features])

# Function to create sequences
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data.iloc[i:(i + seq_length)][features].values)
        y.append(data.iloc[i + seq_length]['Target'])
    return np.array(X), np.array(y)

# Prepare data for each company
sequence_length = 10  # You can adjust this
company_models = {}
models_dir = 'models'

if not os.path.exists(models_dir):
    os.makedirs(models_dir)

def load_company_models():
    for file in os.listdir(models_dir):
        if file.endswith('.h5'):
            company = file.split('.h5')[0]
            model_path = os.path.join(models_dir, file)
            company_models[company] = load_model(model_path)

# Load the models when the app starts
load_company_models()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    company_name = data.get('company')

    if not company_name:
        return jsonify({"error": "Company name is required"}), 400

    latest_data = df[df['Company'] == company_name].tail(sequence_length)

    if latest_data.empty:
        return jsonify({"error": "Company not found or insufficient data"}), 404

    prediction = predict_stock_movement(company_name, latest_data, scaler, company_models, sequence_length)
    return jsonify({"company": company_name, "prediction": prediction})

if _name_ == '_main_':
    app.run(debug=True)

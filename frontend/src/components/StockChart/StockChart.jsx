import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function StockChart({ symbol }) {
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);  // Set loading to true when fetching new data
      try {
        const API_KEY = '72J5266S0H2QL30G';
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        setStockData(response.data['Time Series (Daily)']);
        setLoading(false);  // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);  // Ensure loading is false even if there's an error
      }
    };

    fetchStockData();
  }, [symbol]);

  const dates = stockData ? Object.keys(stockData) : [];
  const closingPrices = dates.map(date => parseFloat(stockData[date]['4. close'] || 0));

  return (
    <center>
      {loading ? (
        <CircularProgress sx={{m:5}} />
      ) : (
        <Plot
          data={[
            {
              x: dates,
              y: closingPrices,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            }
          ]}
          layout={{ width: 800, height: 500, title: `Stock Market Prices for ${symbol}` }}
        />
      )}
    </center>
  );
}

export default StockChart;

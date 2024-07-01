import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import StockChart from '../StockChart/StockChart.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
  
    h5: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
});

const stockSymbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'GOOGL', name: 'Google Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'RELI', name: 'Reliance Industries Limited' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys Limited' },
  { symbol: 'HDB', name: 'HDFC Bank Limited' },
  { symbol: 'WIT', name: 'Wipro Limited' },
];


function News() {
  const [news, setNews] = useState([]);
  const [selectedStock, setSelectedStock] = useState(stockSymbols[0].symbol);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'OncSy3x0crrtVVUnpj6aqzdvU41QNvOp';
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?limit=15&apiKey=${apiKey}`
        );

        const articles = response.data.results;
        setNews(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
      <div className="header" style={{marginBottom:20}}>
        <h1>Latest News</h1>
      </div>
        <Grid container spacing={4} justifyContent="center">
          {news.map((article, index) => (
            <Grid item key={index} sx={{ mb: 2 }}>
              <Card sx={{ width: 345, height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardActionArea href={article.article_url} target="_blank" rel="noopener noreferrer">
                  {article.image_url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.image_url}
                      alt={article.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.summary}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <div className="header" style={{marginBottom:20}}>
        <h1>Stock Charts</h1>
      </div>

        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel>Company</InputLabel>
          <Select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            label="Company"
          >
            {stockSymbols.map((stock) => (
              <MenuItem key={stock.symbol} value={stock.symbol}>
                {stock.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <StockChart symbol={selectedStock} />
      </Container>
    </ThemeProvider>
  );
}

export default News;

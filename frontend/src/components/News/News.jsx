import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Roboto, sans-serif', // Change this to your preferred font
      fontWeight: 700, // Adjust the font weight as needed
    },
    h5: {
      fontFamily: 'Arial, sans-serif', // Change this to your preferred font
    },
  },
});

function News() {
  const [news, setNews] = useState([]);

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
        <Typography variant="h3" align="center" gutterBottom>
          Latest News
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {news.map((article, index) => (
            <Grid item key={index} sx={{ mb: 2 }}>
              <Card sx={{ 
                maxWidth: 345, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'transform 0.3s', 
                '&:hover': { transform: 'scale(1.05)' } 
              }}>
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
                    <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"20px",ml:1}}>
                      {article.title}
                    </Typography>
                    
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default News;

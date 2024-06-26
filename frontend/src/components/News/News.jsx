import React, { useState, useEffect } from 'react';
import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Function to fetch news data
    const fetchNews = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = 'OncSy3x0crrtVVUnpj6aqzdvU41QNvOp';
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?limit=15&apiKey=${apiKey}`
        );

        // Extract news articles from response data
        const articles = response.data.results;

        // Update state with news articles
        setNews(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return (
    <div>
      <h2>News</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.article_url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;

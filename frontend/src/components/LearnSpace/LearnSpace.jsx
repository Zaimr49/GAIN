import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

function LearnSpace() {
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      alert('Please Login or Create an Account.');
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container>
      
      <Box sx={{ textAlign: 'center', marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Execute as you Learn
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button
          href="https://youtu.be/PrvRhnJ30Q0"
          target="_blank"
          variant="contained"
          sx={{
            borderRadius: 2,
            width: '20%',
            fontSize: '1.5em',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Paper Trading Account
        </Button>
      </Box>
      <Box sx={{ width: '80%', margin: 'auto', marginTop: 4 }}>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Research the Stocks
          </Typography>
        </Box>
        <Typography paragraph>
          Before investing in stocks, it's essential to conduct thorough research. This involves analyzing the company's fundamentals and tracking the stock's price movements over time. Combining both fundamental and technical analysis will provide greater confidence when making investment decisions.
        </Typography>
        <ul>
          <li>
            <Typography variant="h5">Fundamental Analysis:</Typography>
            <Typography paragraph>
              Ideal for position traders and long-term investors, this approach involves evaluating a company's financial health, competitive standing, and growth prospects. Review the company's financial statements to assess profitability, debt levels, and liquidity. Look for businesses with consistent and growing earnings, as this suggests a strong business model and effective management. Additionally, understand the industry and the company's market position. Consider its market share and the growth potential of its sector. Don't forget to research the management team and their track record.
            </Typography>
          </li>
          <li>
            <Typography variant="h5">Technical Analysis:</Typography>
            <Typography paragraph>
              Commonly used by day traders and swing traders, this method involves studying past price movements and volume data to identify trends and patterns that may indicate future price changes. Look for chart patterns like head and shoulders, triangles, and wedges, which can signal potential trend reversals or continuations. Utilize moving averages to identify trends and potential support and resistance levels. Employ oscillators such as the Relative Strength Index (RSI) and stochastic oscillator to gauge momentum and determine when a stock might rise or fall. Many trading platforms offer these technical analysis tools.
            </Typography>
          </li>
          <li>
            <Typography variant="h5">News and Sentiment Analysis:</Typography>
            <Typography paragraph>
              Keep an eye on news and investor sentiment related to the stocks you are interested in. Review earnings reports and earnings call transcripts to identify investor concerns. Pay attention to management guidance, analyst ratings, and any geopolitical or macroeconomic events that could impact the company or its industry.
            </Typography>
          </li>
          <li>
            <Typography variant="h5">Diversification:</Typography>
            <Typography paragraph>
              To manage risk, diversify your stock portfolio across different sectors, market capitalizations, and geographic regions. Diversification helps mitigate the impact of any single stock or sector underperforming.
            </Typography>
          </li>
          <li>
            <Typography variant="h5">Continuous Learning:</Typography>
            <Typography paragraph>
              Expand your knowledge by reading financial articles, stock market books, and online tutorials. Watch Bloomberg TV and stay updated on market trends and economic indicators that could affect your holdings. Adapting to new information is crucial for long-term trading success.
            </Typography>
          </li>
        </ul>
        <Typography paragraph>
          Research and analysis are ongoing processes. As you gain experience and knowledge, refine your research methods and develop a more personalized approach to stock selection. Regularly review and assess your portfolio to ensure it aligns with your trading goals and risk tolerance.
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography paragraph>
          Explore Zerodha Varsity's modules and videos to understand the stock market better. It has one of the best teaching materials for finance.
        </Typography>
        <Button
          href="https://zerodha.com/varsity/"
          target="_blank"
          variant="contained"
          sx={{
            borderRadius: 2,
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '10px 20px',
          }}
        >
          <img
            src="https://zerodha.com/varsity/wp-content/themes/varsity2/images/logo.png"
            alt="Zerodha Varsity"
            style={{ height: '40px' }}
          />
        </Button>
      </Box>
    </Container>
  );
}

export default LearnSpace;

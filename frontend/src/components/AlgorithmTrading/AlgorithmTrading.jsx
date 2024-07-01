import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
 import './App.css'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';


function AlgorithmTrading() {
  const codes = {
    movingAverageCrossover: `//@version=5
strategy("Moving Average Crossover Strategy", shorttitle="MA Cross", overlay=true)

// Define fast and slow moving average lengths
fast_length = input.int(10, title="Fast MA Length")
slow_length = input.int(50, title="Slow MA Length")

// Calculate the fast and slow moving averages
fast_ma = ta.sma(close, fast_length)
slow_ma = ta.sma(close, slow_length)

// Plot the moving averages on the chart for visualization
plot(fast_ma, title="Fast MA", color=color.blue)
plot(slow_ma, title="Slow MA", color=color.red)

// Create strategy signals
buy_signal = ta.crossover(fast_ma, slow_ma)
sell_signal = ta.crossunder(fast_ma, slow_ma)

// Strategy logic
strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.close("Buy", when=sell_signal)

plotshape(buy_signal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plotshape(sell_signal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)
`,
    reversalIndicator: `//@version=5
  strategy("Reversal Indicator Strategy", overlay = true)

  // Input settings
  ccimomCross = input.string('CCI', 'Entry Signal Source', options=['CCI', 'Momentum'], tooltip='CCI or Momentum will be the final source of the Entry signal if selected.')
  ccimomLength = input.int(10, minval=1, title='CCI/Momentum Length')
  useDivergence = input.bool(true, title='Find Regular Bullish/Bearish Divergence', tooltip='If checked, it will only consider an overbought or oversold condition that has a regular bullish or bearish divergence formed inside that level.')
  rsiOverbought = input.int(65, minval=1, title='RSI Overbought Level', tooltip='Adjusting the level to extremely high may filter out some signals especially when the option to find divergence is checked.')
  rsiOversold = input.int(35, minval=1, title='RSI Oversold Level', tooltip='Adjusting this level extremely low may filter out some signals especially when the option to find divergence is checked.')
  rsiLength = input.int(14, minval=1, title='RSI Length')
  plotMeanReversion = input.bool(false, 'Plot Mean Reversion Bands on the chart', tooltip='This function doesn\'t affect the entry of signal but it suggests buying when the price is at the lower band, and then sell it on the next bounce at the higher bands.')
  emaPeriod = input(200, title='Lookback Period (EMA)')
  bandMultiplier = input.float(1.8, title='Outer Bands Multiplier', tooltip='Multiplier for both upper and lower bands')


  // CCI and Momentum calculation
  momLength = ccimomCross == 'Momentum' ? ccimomLength : 10
  mom = close - close[momLength]
  cci = ta.cci(close, ccimomLength)
  ccimomCrossUp = ccimomCross == 'Momentum' ? ta.cross(mom, 0) : ta.cross(cci, 0)
  ccimomCrossDown = ccimomCross == 'Momentum' ? ta.cross(0, mom) : ta.cross(0, cci)

  // RSI calculation
  src = close
  up = ta.rma(math.max(ta.change(src), 0), rsiLength)
  down = ta.rma(-math.min(ta.change(src), 0), rsiLength)
  rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
  oversoldAgo = rsi[0] &lt;= rsiOversold or rsi[1] &lt;= rsiOversold or rsi[2] &lt;= rsiOversold or rsi[3] &lt;= rsiOversold
  overboughtAgo = rsi[0] &gt;= rsiOverbought or rsi[1] &gt;= rsiOverbought or rsi[2] &gt;= rsiOverbought or rsi[3] &gt;= rsiOverbought

  // Regular Divergence Conditions
  bullishDivergenceCondition = rsi[0] &gt; rsi[1] and rsi[1] &lt; rsi[2]
  bearishDivergenceCondition = rsi[0] &lt; rsi[1] and rsi[1] &gt; rsi[2]

  // Entry Conditions
  longEntryCondition = ccimomCrossUp and oversoldAgo and (not useDivergence or bullishDivergenceCondition)
  shortEntryCondition = ccimomCrossDown and overboughtAgo and (not useDivergence or bearishDivergenceCondition)

  // Mean Reversion Indicator
  meanReversion = plotMeanReversion ? ta.ema(close, emaPeriod) : na
  stdDev = plotMeanReversion ? ta.stdev(close, emaPeriod) : na
  upperBand = plotMeanReversion ? meanReversion + stdDev * bandMultiplier : na
  lowerBand = plotMeanReversion ? meanReversion - stdDev * bandMultiplier : na


  // Plotting
  plotshape(longEntryCondition, title='BUY', style=shape.triangleup, text='B', location=location.belowbar, color=color.new(color.lime, 0), textcolor=color.new(color.white, 0), size=size.tiny)
  plotshape(shortEntryCondition, title='SELL', style=shape.triangledown, text='S', location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)

  plot(upperBand, title='Upper Band', color=color.new(color.fuchsia, 0), linewidth=1)
  plot(meanReversion, title='Mean', color=color.new(color.gray, 0), linewidth=1)
  plot(lowerBand, title='Lower Band', color=color.new(color.blue, 0), linewidth=1)

  // Entry signal alerts
  alertcondition(longEntryCondition, title='BUY Signal', message='Buy Entry Signal')
  alertcondition(shortEntryCondition, title='SELL Signal', message='Sell Entry Signal')
  alertcondition(longEntryCondition or shortEntryCondition, title='BUY or SELL Signal', message='Entry Signal')

  ema100 = ta.ema(close, 100)
  plot(ema100, color=color.red)

  // Define trading signals based on the original indicator's entry conditions
  // Buy if long condition is met and price has pulled back to or below the 100 EMA
  longCondition  = longEntryCondition and close &lt;= ema100
  // Sell if short condition is met and price has pulled back to or above the 100 EMA
  shortCondition = shortEntryCondition and close >= ema100

  // Strategy Entries
    if longCondition
  strategy.entry("Buy", strategy.long)
    if shortCondition
      strategy.entry("Sell", strategy.short)
`,
    rsistrategy: `//@version=5
strategy("RSI Strategy", shorttitle="RSI MA", overlay=true)

  //@version=5
  strategy("RSI Strategy", overlay=true)
  length = input( 14 )
  overSold = input( 30 )
  overBought = input( 70 )
  price = close
  vrsi = ta.rsi(price, length)
  co = ta.crossover(vrsi, overSold)
  cu = ta.crossunder(vrsi, overBought)
  if (not na(vrsi))
    if (co)
      strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    if (cu)
      strategy.entry("RsiSE", strategy.short, comment="RsiSE")
  //plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
`,
channelbreakout: `//@version=5
                strategy("ChannelBreakOutStrategy", overlay=true)
                length = input.int(title="Length", minval=1, maxval=1000, defval=5)
                upBound = ta.highest(high, length)
                downBound = ta.lowest(low, length)
                if (not na(close[length]))
                    strategy.entry("ChBrkLE", strategy.long, stop=upBound + syminfo.mintick, comment="ChBrkLE")
                strategy.entry("ChBrkSE", strategy.short, stop=downBound - syminfo.mintick, comment="ChBrkSE")
                //plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
`,
parabolicsar: `//@version=5
                strategy("Parabolic SAR Strategy", overlay=true)
                start = input(0.02)
                increment = input(0.02)
                maximum = input(0.2)
                var bool uptrend = na
                var float EP = na
                var float SAR = na
                var float AF = start
                var float nextBarSAR = na
                if bar_index &gt; 0
                    firstTrendBar = false
                    SAR := nextBarSAR
                    if bar_index == 1
                        float prevSAR = na
                        float prevEP = na
                        lowPrev = low[1]
                        highPrev = high[1]
                        closeCur = close
                        closePrev = close[1]
                        if closeCur &gt; closePrev
                            uptrend := true
                            EP := high
                            prevSAR := lowPrev
                            prevEP := high
                        else
                            uptrend := false
                            EP := low
                            prevSAR := highPrev
                            prevEP := low
                        firstTrendBar := true
                        SAR := prevSAR + start * (prevEP - prevSAR)
                    if uptrend
                        if SAR &gt; low
                            firstTrendBar := true
                            uptrend := false
                            SAR := math.max(EP, high)
                            EP := low
                            AF := start
                    else
                        if SAR &lt; high
                            firstTrendBar := true
                            uptrend := true
                            SAR := math.min(EP, low)
                            EP := high
                            AF := start
                    if not firstTrendBar
                        if uptrend
                            if high &gt; EP
                                EP := high
                                AF := math.min(AF + increment, maximum)
                        else
                            if low  &lt; EP
                                EP := low
                                AF := math.min(AF + increment, maximum)
                    if uptrend
                        SAR := math.min(SAR, low[1])
                        if bar_index > 1
                            SAR := math.min(SAR, low[2])
                    else
                        SAR := math.max(SAR, high[1])
                        if bar_index > 1
                            SAR := math.max(SAR, high[2])
                    nextBarSAR := SAR + AF * (EP - SAR)
                    if barstate.isconfirmed
                        if uptrend
                            strategy.entry("ParSE", strategy.short, stop=nextBarSAR, comment="ParSE")
                            strategy.cancel("ParLE")
                        else
                            strategy.entry("ParLE", strategy.long, stop=nextBarSAR, comment="ParLE")
                            strategy.cancel("ParSE")
                plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
                plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)
                //plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
`

  };
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      alert('Please Login or Create an Account.');
      navigate('/login');
    }
  }, [user, navigate]);

  return (
       <div>
    
 
      <div className="header">
        <h1>Algorithms for Trading</h1>
      </div>

      <div className="box">
        <h2>Moving Average Crossover Strategy</h2>
        <CopyToClipboard text={codes.movingAverageCrossover}>
          <button className="code-button" title="Copy Code">
            <svg xmlns="http://www.w3.org/2000/svg" className="gfg-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.0" stroke="#2c3b8f" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </CopyToClipboard>
        <pre>{codes.movingAverageCrossover}</pre>
      </div>

      <div className="box">
        <h2>Reversal Indicator Strategy</h2>
        <CopyToClipboard text={codes.reversalIndicator}>
          <button className="code-button" title="Copy Code">
            <svg xmlns="http://www.w3.org/2000/svg" className="gfg-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.0" stroke="#2c3b8f" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </CopyToClipboard>
        <pre>{codes.reversalIndicator}</pre>
      </div>

      <div className="box">
        <h2>Channel Break Out Strategy</h2>
        <CopyToClipboard text={codes.channelbreakout}>
          <button className="code-button" title="Copy Code">
            <svg xmlns="http://www.w3.org/2000/svg" className="gfg-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.0" stroke="#2c3b8f" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </CopyToClipboard>
        <pre>{codes.channelbreakout}</pre>
      </div>

      <div className="box">
        <h2>Parabolic SAR Strategy</h2>
        <CopyToClipboard text={codes.parabolicsar}>
          <button className="code-button" title="Copy Code">
            <svg xmlns="http://www.w3.org/2000/svg" className="gfg-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.0" stroke="#2c3b8f" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </CopyToClipboard>
        <pre>{codes.parabolicsar}</pre>
      </div>

      <div className="box">
        <h2>RSI Strategy</h2>
        <CopyToClipboard text={codes.rsistrategy}>
          <button className="code-button" title="Copy Code">
            <svg xmlns="http://www.w3.org/2000/svg" className="gfg-icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.0" stroke="#2c3b8f" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </CopyToClipboard>
        <pre>{codes.rsistrategy}</pre>
      </div>

      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography paragraph>
        You can use the Pine connector service to connect your pine editor code to your meta trading account and convert your alerts to actual orders.
        </Typography>
        <Button
          href="https://www.pineconnector.com/"
          target="_blank"          
        >
          <img
            src="https://www.pineconnector.com/cdn/shop/files/Group_999.png?v=1710845942&width=150"
            className='btn1'
          />
        </Button>
      </Box>

    </div>

    
  );
};

export default AlgorithmTrading;
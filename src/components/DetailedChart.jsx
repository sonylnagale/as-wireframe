import { Paper, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { scaleLinear } from "d3-scale";
import { line, curveMonotoneX } from "d3-shape";

// Simple moving average helper
function sma(data, period) {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

// Momentum oscillator: difference between fast and slow SMA, normalized
function momentum(closes) {
  return closes.map((_, i) => {
    if (i < 4) return 0;
    return closes[i] - closes[i - 4];
  });
}

function generateCandles(count, seed = 0) {
  const data = [];
  let price = 100 + seed;
  for (let i = 0; i < count; i++) {
    const change = (Math.sin((i + seed) * 0.4) * 2.5) + (Math.cos((i + seed) * 0.25) * 1.5) + ((((i + seed) % 7) - 3) * 0.5);
    const open = price;
    const close = parseFloat((price + change).toFixed(2));
    const high = parseFloat((Math.max(open, close) + Math.random() * 1.8).toFixed(2));
    const low  = parseFloat((Math.min(open, close) - Math.random() * 1.8).toFixed(2));
    const day = new Date(2026, 0, i + 1);
    data.push({ time: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }), open, high, low, close });
    price = close;
  }
  return data;
}

function DetailedChart({ symbol, onFullscreen, fullscreen, showAnnotations }) {
  const chartData = fullscreen ? generateCandles(60) : generateCandles(30);

  const W = fullscreen ? 1400 : 700;
  const H = fullscreen ? 800 : 380;
  const leftPad = 10;
  const rightPad = 52;
  const topPad = 12;
  const oscH = Math.round(H * 0.22);   // oscillator panel height
  const mainH = H - oscH - 24;         // main chart height (24 = separator gap)
  const mainBottom = topPad + mainH;
  const oscTop = mainBottom + 24;
  const oscBottom = H - 8;

  const closes = chartData.map((d) => d.close);
  const highs  = chartData.map((d) => d.high);
  const lows   = chartData.map((d) => d.low);

  const priceMin = Math.min(...lows)   - 1;
  const priceMax = Math.max(...highs)  + 1;
  const priceRange = priceMax - priceMin;

  const xScale = scaleLinear().domain([0, chartData.length - 1]).range([leftPad + 4, W - rightPad]);
  const yScale = scaleLinear().domain([priceMin, priceMax]).range([mainBottom, topPad]);

  // Moving averages
  const fastMA  = sma(closes, 5);
  const slowMA  = sma(closes, 13);

  const maLine = (maValues, color) => {
    const pts = maValues.map((v, i) => v !== null ? `${xScale(i)},${yScale(v)}` : null).filter(Boolean);
    const segments = [];
    let cur = [];
    maValues.forEach((v, i) => {
      if (v !== null) { cur.push(`${xScale(i)},${yScale(v)}`); }
      else if (cur.length) { segments.push(cur.join(" ")); cur = []; }
    });
    if (cur.length) segments.push(cur.join(" "));
    return segments.map((pts, si) => (
      <polyline key={`${color}-${si}`} points={pts} fill="none" stroke={color} strokeWidth={fullscreen ? 2.5 : 1.5} opacity="0.9" />
    ));
  };

  // Price zones (5 bands from bottom to top) - light day theme, subtle greys
  const zones = [
    { from: 0.00, to: 0.15, fill: "#f5f5f5", label: "KEY Support Zone #2",   opacity: 0.9 },
    { from: 0.15, to: 0.35, fill: "#fafafa", label: "KEY Intraday Support Zone", opacity: 0.6 },
    { from: 0.35, to: 0.65, fill: "#ffffff", label: "",                       opacity: 0.08 },
    { from: 0.65, to: 0.82, fill: "#fafafa", label: "KEY Intraday Resistance Zone", opacity: 0.6 },
    { from: 0.82, to: 1.00, fill: "#f5f5f5", label: "KEY Resistance Zone",   opacity: 0.9 },
  ];

  // Oscillator (momentum)
  const mom = momentum(closes);
  const momMax = Math.max(...mom.map(Math.abs), 1);
  const oscScale = scaleLinear().domain([-momMax, momMax]).range([oscBottom, oscTop]);
  const oscZero = oscScale(0);

  const candleWidth = fullscreen ? 14 : 7;
  const yLabels = Array.from({ length: 7 }, (_, i) => priceMin + (priceRange * i) / 6);

  return (
    <Paper
      sx={{
        p: 0,
        mb: fullscreen ? 0 : 2,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        border: fullscreen ? "none" : "1px solid #e0e0e0",
        width: fullscreen ? "100vw" : "auto",
        height: fullscreen ? "100vh" : "auto",
        borderRadius: fullscreen ? 0 : "4px",
        overflow: "hidden",
      }}
    >
      {onFullscreen && (
        <IconButton
          onClick={onFullscreen}
          size="small"
          sx={{
            position: "absolute", top: 8, right: 8,
            backgroundColor: "#333333", color: "#ffffff",
            "&:hover": { backgroundColor: "#555555" }, zIndex: 1,
          }}
          aria-label="Fullscreen"
        >
          <FullscreenIcon fontSize="small" />
        </IconButton>
      )}

      <svg width="100%" height={fullscreen ? "100%" : `${H}px`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect x={0} y={0} width={W} height={H} fill="#ffffff" />

        {/* Price zone bands */}
        {zones.map((z, zi) => {
          const yTop  = yScale(priceMin + priceRange * z.to);
          const yBot  = yScale(priceMin + priceRange * z.from);
          return (
            <g key={`zone-${zi}`}>
              <rect x={leftPad} y={yTop} width={W - leftPad - rightPad} height={yBot - yTop}
                fill={z.fill} opacity={z.opacity} />
              {z.label && (
                <text x={leftPad + 6} y={yTop + (fullscreen ? 18 : 11)} fill="#444444" fontSize={fullscreen ? 13 : 7.5}
                  fontWeight="700" opacity="0.95">{z.label}</text>
              )}
            </g>
          );
        })}

        {/* Horizontal grid lines */}
        {yLabels.map((price, i) => {
          const y = yScale(price);
          return (
            <g key={`grid-${i}`}>
              <line x1={leftPad} y1={y} x2={W - rightPad} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              <text x={W - rightPad + 4} y={y + 4} fill="#444444" fontSize={fullscreen ? 12 : 7} textAnchor="start">
                {price.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Moving averages (grayscale, dark-on-light) */}
        {maLine(fastMA, "#333333")}
        {maLine(slowMA, "#666666")}

        {/* Candlesticks */}
        {chartData.map((candle, index) => {
          const x = xScale(index);
          const yO = yScale(candle.open);
          const yC = yScale(candle.close);
          const yH = yScale(candle.high);
          const yL = yScale(candle.low);
          const isUp = candle.close >= candle.open;
          const color = isUp ? "#222222" : "#777777";
          const cw = candleWidth;
          return (
            <g key={`c-${index}`}>
              <line x1={x} y1={yH} x2={x} y2={yL} stroke={color} strokeWidth={fullscreen ? 1.5 : 1} opacity="0.85" />
              <rect x={x - cw / 2} y={Math.min(yO, yC)} width={cw}
                height={Math.max(Math.abs(yC - yO), 1)} fill={color} opacity="0.9" />
            </g>
          );
        })}

        {/* X-axis time labels */}
        {chartData.map((d, i) => {
          if (i % Math.ceil(chartData.length / 8) !== 0) return null;
          return (
            <text key={`xl-${i}`} x={xScale(i)} y={mainBottom + 14} fill="#666666" fontSize={fullscreen ? 11 : 6.5} textAnchor="middle">
              {d.time}
            </text>
          );
        })}

        {/* Oscillator separator */}
        <line x1={leftPad} y1={oscTop - 6} x2={W - rightPad} y2={oscTop - 6} stroke="#e0e0e0" strokeWidth="1" />
        <text x={leftPad + 4} y={oscTop + (fullscreen ? 14 : 9)} fill="#666666" fontSize={fullscreen ? 11 : 6.5}>Momentum</text>

        {/* Oscillator zero line */}
        <line x1={leftPad} y1={oscZero} x2={W - rightPad} y2={oscZero} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />

        {/* Oscillator bars */}
        {mom.map((v, i) => {
          const x = xScale(i);
          const y0 = oscZero;
          const y1 = oscScale(v);
          const color = v >= 0 ? "#222222" : "#777777";
          return (
            <rect key={`osc-${i}`} x={x - (candleWidth * 0.4)} y={Math.min(y0, y1)}
              width={candleWidth * 0.8} height={Math.max(Math.abs(y1 - y0), 1)}
              fill={color} opacity="0.75" />
          );
        })}

        {/* Annotations overlay */}
        {showAnnotations && (() => {
          const n = chartData.length;
          const allPrices = chartData.flatMap((d) => [d.high, d.low]);
          const sorted = [...allPrices].sort((a, b) => a - b);
          const supportPrice    = sorted[Math.floor(sorted.length * 0.2)];
          const resistancePrice = sorted[Math.floor(sorted.length * 0.8)];
          const trendStart = { x: xScale(2),     y: yScale(chartData[2].close) };
          const trendEnd   = { x: xScale(n - 3), y: yScale(chartData[n - 3].close) };
          return (
            <g>
              <line x1={leftPad} y1={yScale(supportPrice)} x2={W - rightPad} y2={yScale(supportPrice)}
                stroke="#666666" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.9" />
              <text x={W - rightPad + 4} y={yScale(supportPrice) + 4} fill="#666666" fontSize={fullscreen ? 12 : 7} fontWeight="700">S</text>

              <line x1={leftPad} y1={yScale(resistancePrice)} x2={W - rightPad} y2={yScale(resistancePrice)}
                stroke="#666666" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.9" />
              <text x={W - rightPad + 4} y={yScale(resistancePrice) + 4} fill="#666666" fontSize={fullscreen ? 12 : 7} fontWeight="700">R</text>

              <line x1={trendStart.x} y1={trendStart.y} x2={trendEnd.x} y2={trendEnd.y}
                stroke="#666666" strokeWidth="2" opacity="0.95" />
              <circle cx={trendStart.x} cy={trendStart.y} r={fullscreen ? 5 : 3} fill="#666666" />
              <circle cx={trendEnd.x}   cy={trendEnd.y}   r={fullscreen ? 5 : 3} fill="#666666" />

              {(() => {
                const midIdx = Math.floor(n / 2);
                const nx = xScale(midIdx);
                const ny = yScale(chartData[midIdx].high) - (fullscreen ? 22 : 13);
                const nw = fullscreen ? 150 : 88;
                const nh = fullscreen ? 26 : 15;
                return (
                  <g>
                    <rect x={nx - nw / 2} y={ny - nh} width={nw} height={nh}
                      fill="#e6e6e6" stroke="#bdbdbd" strokeWidth="1" rx="3" opacity="0.95" />
                    <text x={nx} y={ny - nh / 2 + (fullscreen ? 5 : 3)} textAnchor="middle"
                      fill="#333333" fontSize={fullscreen ? 11 : 6.5} fontWeight="600">
                      Analyst: Watch this level
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })()}
      </svg>
    </Paper>
  );
}

export default DetailedChart;

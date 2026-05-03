import { useId } from "react";
import { Paper } from "@mui/material";
import { scaleLinear } from "d3-scale";
import { area, curveMonotoneX, line } from "d3-shape";

function AssetSparkline({ values, label }) {
  const gradientId = useId().replace(/:/g, "");
  const isUptrend = values[values.length - 1] >= values[0];
  const strokeColor = isUptrend ? "#333333" : "#999999";
  const borderColor = isUptrend ? "#333333" : "#999999";

  const width = 148;
  const height = 40;
  const padding = 3;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const xScale = scaleLinear()
    .domain([0, values.length - 1])
    .range([padding, width - padding]);

  const yScale = scaleLinear()
    .domain([minValue - 1, maxValue + 1])
    .range([height - padding, padding]);

  const linePath = line()
    .x((_, index) => xScale(index))
    .y((value) => yScale(value))
    .curve(curveMonotoneX)(values);

  const areaPath = area()
    .x((_, index) => xScale(index))
    .y0(height - padding)
    .y1((value) => yScale(value))
    .curve(curveMonotoneX)(values);

  const lastX = xScale(values.length - 1);
  const lastY = yScale(values[values.length - 1]);
  const baselineY = yScale(values[0]);

  return (
    <Paper
      sx={{
        display: "inline-block",
        width: "152px",
        height: "44px",
        p: 0.5,
        backgroundColor: "#fafafa",
        border: `1px solid ${borderColor}`,
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: `0 0 8px ${borderColor}40`,
          backgroundColor: "#f0f0f0",
        },
      }}
      role="img"
      aria-label={label}
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity="0.35" />
            <stop offset="95%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={padding} y1={baselineY} x2={width - padding} y2={baselineY} stroke="rgba(0, 0, 0, 0.1)" strokeDasharray="2 2" />
        <path d={areaPath || ""} fill={`url(#${gradientId})`} />
        <path d={linePath || ""} fill="none" stroke={strokeColor} strokeWidth="1.8" />
        <circle cx={lastX} cy={lastY} r="2.7" fill={strokeColor} stroke={isUptrend ? "rgba(51, 51, 51, 0.3)" : "rgba(153, 153, 153, 0.3)"} strokeWidth="3" />
      </svg>
    </Paper>
  );
}

export default AssetSparkline;

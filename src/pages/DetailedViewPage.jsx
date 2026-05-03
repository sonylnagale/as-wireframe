import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Shell from "../components/Shell";
import DetailedChart from "../components/DetailedChart";
import ToolsDrawer from "../components/ToolsDrawer";

const assetInfo = {
  FSLR: { name: "First Solar, Inc." },
  AAPL: { name: "Apple Inc." },
  NVDA: { name: "NVIDIA Corporation" },
  SPY: { name: "SPDR S&P 500 ETF Trust" },
  QQQ: { name: "Invesco QQQ Trust" },
};

const placeholderText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dolor justo, cursus at fringilla sit amet, tincidunt sit amet nunc. Cras dolor tortor, feugiat in tempor at, ornare pulvinar nibh. Maecenas feugiat quis nunc in ultrices. Nam gravida purus accumsan molestie egestas. Cras maximus malesuada urna bibendum egestas. Morbi ac vulputate ipsum, vitae hendrerit sem. Curabitur semper convallis condimentum. Integer sollicitudin dui vel dui suscipit, sed ullamcorper enim sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et arcu condimentum diam condimentum aliquam. Duis nec velit odio. Fusce tincidunt ante dolor. Mauris maximus, lorem eu lacinia viverra, neque nisi pharetra mauris, sit amet placerat ante tellus non erat. Maecenas ut tristique tellus.";

function DetailedViewPage() {
  const [searchParams] = useSearchParams();
  const selectedSymbol = (searchParams.get("symbol") || "FSLR").toUpperCase();
  const selectedAsset = assetInfo[selectedSymbol] || assetInfo.FSLR;
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fsDrawerOpen, setFsDrawerOpen] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(false);

  return (
    <Shell title="MCM Pro Single Symbol - Detailed View">
      <ToolsDrawer
        isOpen={drawerOpen}
        onToggle={() => setDrawerOpen(!drawerOpen)}
        showAnnotations={showAnnotations}
        onToggleAnnotations={() => setShowAnnotations((v) => !v)}
      />

      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 12,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#333333" }}>
              <strong>{selectedSymbol}</strong> - {selectedAsset.name}
            </Typography>
            <IconButton
              onClick={() => setFullscreen(false)}
              sx={{
                backgroundColor: "#333333",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#555555" },
              }}
              size="small"
              aria-label="Exit fullscreen"
            >
              <FullscreenExitIcon fontSize="small" />
            </IconButton>
          </Box>
          <DetailedChart
            symbol={selectedSymbol}
            fullscreen
            showAnnotations={showAnnotations}
          />
        </Box>
        <ToolsDrawer
          isOpen={fsDrawerOpen}
          onToggle={() => setFsDrawerOpen(!fsDrawerOpen)}
          showAnnotations={showAnnotations}
          onToggleAnnotations={() => setShowAnnotations((v) => !v)}
        />
      </Dialog>

      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: "#333333" }}
        >
          <strong>{selectedSymbol}</strong> - {selectedAsset.name}
        </Typography>

        <DetailedChart
          symbol={selectedSymbol}
          onFullscreen={() => setFullscreen(true)}
          showAnnotations={showAnnotations}
        />

        <Grid container spacing={2}>
          <Grid>
            <Paper sx={{ p: 2, border: "1px solid #d0d0d0" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1, color: "#333333" }}
              >
                Analyst Note
              </Typography>
              <Typography variant="body2" sx={{ color: "#666666" }}>
                {placeholderText}
              </Typography>
            </Paper>
          </Grid>

          
        </Grid>
      </Box>
    </Shell>
  );
}

export default DetailedViewPage;

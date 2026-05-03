import { Drawer, Button, Box, Divider, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SettingsIcon from "@mui/icons-material/Settings";

function ToolsDrawer({ isOpen, onToggle, showAnnotations, onToggleAnnotations }) {
  const drawerWidth = 280;

  return (
    <>
      <IconButton
        onClick={onToggle}
        sx={{
          position: "fixed",
          right: isOpen ? drawerWidth + 8 : 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1300,
          backgroundColor: "#333333",
          border: "2px solid #666666",
          color: "#ffffff",
          transition: "all 0.3s ease",
          "&:hover": { backgroundColor: "#555555", borderColor: "#999999" },
          width: 44,
          height: 44,
        }}
        aria-label="Toggle tools drawer"
      >
        {isOpen ? (
          <ChevronRightIcon sx={{ fontSize: 28 }} />
        ) : (
          <SettingsIcon sx={{ fontSize: 24 }} />
        )}
      </IconButton>

      <Drawer
        anchor="right"
        variant="persistent"
        open={isOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#ffffff",
            borderLeft: "3px solid #333333",
            boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            p: 0,
            background: "linear-gradient(135deg, #333333 0%, #555555 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 56,
            px: 2,
            borderBottom: "2px solid #222222",
          }}
        >
          <Box
            sx={{
              fontSize: 16,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
            Tools & Options
          </Box>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              color: "#ffffff",
              position: "relative",
              zIndex: 1,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box>
            <Button
              fullWidth
              variant={showAnnotations ? "contained" : "outlined"}
              size="small"
              onClick={onToggleAnnotations}
              sx={{
                justifyContent: "flex-start",
                mb: 0.8,
                color: showAnnotations ? "#ffffff" : "#333333",
                backgroundColor: showAnnotations ? "#333333" : undefined,
                borderColor: showAnnotations ? "#333333" : "#d0d0d0",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#666666",
                  backgroundColor: showAnnotations ? "#555555" : "#f5f5f5",
                },
              }}
            >
              {showAnnotations ? "Remove Analyst Annotations" : "Show Analyst Annotations"}
            </Button>
          </Box>

          <Box>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                justifyContent: "flex-start",
                mb: 0.8,
                color: "#333333",
                borderColor: "#d0d0d0",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#666666",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Add to Watchlist
            </Button>
            
          </Box>

          <Box>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                justifyContent: "flex-start",
                mb: 0.8,
                color: "#333333",
                borderColor: "#d0d0d0",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#666666",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Export Chart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                justifyContent: "flex-start",
                color: "#333333",
                borderColor: "#d0d0d0",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#666666",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Settings
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ToolsDrawer;

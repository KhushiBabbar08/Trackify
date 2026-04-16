import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useStatus } from "../hooks/useStatus";
import StatusGrid from "../components/StatusGrid";

const StatusPage = () => {
  const { data, loading, addStatus, removeStatus } = useStatus();

  // 🔥 Create row trigger
  const handleCreateRow = () => {
    window.dispatchEvent(new Event("create-status-row"));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Status Master
      </Typography>

      {/* 🔥 Ribbon */}
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Actions</Typography>

          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={handleCreateRow}
          >
            Create
          </Button>
        </Toolbar>
      </AppBar>

      {/* 🔥 Grid */}
      <StatusGrid
        data={data}
        loading={loading}
        onDelete={removeStatus}
        onCreate={addStatus}
      />
    </Box>
  );
};

export default StatusPage;
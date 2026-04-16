import { Typography, Box } from "@mui/material";
import { useStatus } from "../hooks/useStatus";
import StatusGrid from "../components/StatusGrid";
import StatusForm from "../components/StatusForm";

const StatusPage = () => {
  const { data, loading, addStatus, removeStatus } = useStatus();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Status Master</Typography>

      <StatusForm onAdd={addStatus} />

      <StatusGrid
        data={data}
        loading={loading}
        onDelete={removeStatus}
      />
    </Box>
  );
};

export default StatusPage;
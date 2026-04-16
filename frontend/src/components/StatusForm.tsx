import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const StatusForm = ({ onAdd }: any) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;

    onAdd({
      id: null,
      statusCode: value.toUpperCase(),
      description: value,
      statusValue: 1,
      recordVersion: null,
    });

    setValue("");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Status"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Box>
  );
};

export default StatusForm;
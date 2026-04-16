// components/common/AppToolbar.tsx

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

interface AppToolbarProps {
  title: string;
  onCreate?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
  onSearch?: (value: string) => void;
  hasSelection?: boolean;
}

const AppToolbar = ({
  title,
  onCreate,
  onRefresh,
  onDelete,
  onSearch,
  hasSelection,
}: AppToolbarProps) => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left */}
        <Typography variant="h6">{title}</Typography>

        {/* Right */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          
          {/* 🔍 Search */}
          <TextField
            size="small"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
          />

          {/* 🔄 Refresh */}
          <Button
            color="inherit"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
          >
            Refresh
          </Button>

          {/* ➕ Create */}
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={onCreate}
          >
            Create
          </Button>

          {/* 🗑️ Delete */}
          <Button
            color="inherit"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={!hasSelection}
          >
            Delete
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
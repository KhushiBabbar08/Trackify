import { Snackbar, Alert } from "@mui/material";

const AppToast = ({ open, message, type, onClose }: any) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};

export default AppToast;
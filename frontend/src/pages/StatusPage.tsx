import { Box } from "@mui/material";
import { useState } from "react";
import { useStatus } from "../hooks/useStatus";
import StatusGrid from "../components/status/StatusGrid";
import AppToolbar from "../components/common/AppToolbar";
import ConfirmDialog from "../components/ConfirmDialog";

const StatusPage = () => {
  const { data, loading, addStatus, removeStatus } = useStatus();

  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // 🔍 Filter
  const filteredData = data.filter((s) =>
    s.statusCode.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Create (trigger grid)
  const handleCreate = () => {
    window.dispatchEvent(new Event("create-row"));
  };

  // 🔄 Refresh (quick version)
  const handleRefresh = () => {
    window.location.reload();
  };

  // 🗑️ Delete click
  const handleDeleteClick = () => {
    if (!selectedIds.length) return;
    setOpenDialog(true);
  };

  // ✅ Confirm delete
  const confirmDelete = async () => {
    for (const id of selectedIds) {
      const item = data.find((x) => x.id === id);
      if (item) {
        await removeStatus(id, item.recordVersion);
      }
    }

    setOpenDialog(false);
    setSelectedIds([]); // clear selection
  };

  return (
    <Box>
      {/* 🔥 Toolbar */}
      <AppToolbar
        title="Status Master"
        onCreate={handleCreate}
        onRefresh={handleRefresh}
        onSearch={(value) => setSearch(value)}
        onDelete={handleDeleteClick}
        hasSelection={selectedIds.length > 0} // optional improvement
      />

      {/* 📊 Grid */}
      <StatusGrid
        data={filteredData}
        loading={loading}
        onCreate={addStatus}
        onDelete={removeStatus}
        onSelectionChange={setSelectedIds}
      />

      {/* ❗ Confirm Dialog */}
      <ConfirmDialog
        open={openDialog}
        title="Delete Confirmation"
        content="Are you sure you want to delete selected records?"
        onConfirm={confirmDelete}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

export default StatusPage;
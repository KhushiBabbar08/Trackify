import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import type { Status } from "../types/Status";
import { useEffect, useState } from "react";


const StatusGrid = ({ data, loading, onDelete, onCreate }: any) => {
  const [rows, setRows] = useState<Status[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // Sync API data
  useEffect(() => {
    setRows(data);
  }, [data]);

  // 🔥 Listen to ribbon create click
  useEffect(() => {
    const handler = () => handleCreateRow();
    window.addEventListener("create-status-row", handler);
    return () => window.removeEventListener("create-status-row", handler);
  }, []);

  // 🔥 Create new row
  const handleCreateRow = () => {
    const id = "temp-" + Date.now();

    const newRow: Status = {
      id,
      statusCode: "",
      description: "",
      statusValue: 1,
      recordVersion: 0,
    };

    setRows((prev) => [newRow, ...prev]);

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  // 🔥 Save (Enter key)
  const processRowUpdate = async (newRow: any) => {
    const isNew = String(newRow.id).startsWith("temp");

    if (isNew) {
      await onCreate({
        id: null,
        statusCode: newRow.statusCode.toUpperCase(),
        description: newRow.description,
        statusValue: newRow.statusValue,
        recordVersion: null,
      });
    }

    return newRow;
  };

  // 📊 Columns
  const columns: GridColDef[] = [
    { field: "statusCode", headerName: "Code", flex: 1, editable: true },
    { field: "description", headerName: "Description", flex: 1, editable: true },
    { field: "statusValue", headerName: "Value", flex: 0.5, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() =>
            onDelete(params.row.id, params.row.recordVersion)
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 450 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(err) => console.error(err)}
      />
    </div>
  );
};

export default StatusGrid;

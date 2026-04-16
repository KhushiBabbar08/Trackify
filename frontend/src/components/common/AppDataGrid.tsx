// components/common/AppDataGrid.tsx

import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface Props<T> {
  data: T[];
  columns: GridColDef[];
  loading: boolean;
  onCreate: (row: any) => Promise<void>;
  onSelectionChange?: (ids: string[]) => void;
}

function AppDataGrid<T extends { id: string; recordVersion?: number }>({
  data,
  columns,
  loading,
  onCreate,
  onSelectionChange,
}: Props<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set<GridRowId>(),
  });

  // 🔄 Sync API data
  useEffect(() => {
    setRows(data);
  }, [data]);

  // 🔥 Listen to toolbar create event
  useEffect(() => {
    const handler = () => handleCreateRow();

    window.addEventListener("create-row", handler);
    return () => window.removeEventListener("create-row", handler);
  }, []);

  // ➕ Create row
  const handleCreateRow = () => {
    const id = "temp-" + Date.now();

    const newRow: any = {
      id,
      recordVersion: 0,
      isNew: true,
    };

    setRows((prev) => [newRow, ...prev]);

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  // 💾 Save (Create / Update)
  const processRowUpdate = async (newRow: any) => {
    try {
      const isNew = String(newRow.id).startsWith("temp");

      if (isNew) {
        await onCreate(newRow);
      } else {
        await onCreate(newRow); // same CU API
      }

      return { ...newRow, isNew: false };
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };

  return (
    <div style={{ height: 500 }}>
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

        // 🔥 Selection (for toolbar delete)
        checkboxSelection
        rowSelectionModel={selectionModel}
        
        onRowSelectionModelChange={(model) => {
          setSelectionModel(model);
          onSelectionChange?.(Array.from(model.ids).map((id) => String(id)));
        }}
        // 🎨 UI polish
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#fafafa",
            fontWeight: "bold",
          },
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export default AppDataGrid;

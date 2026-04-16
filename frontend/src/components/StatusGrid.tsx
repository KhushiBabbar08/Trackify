import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import type { Status } from "../types/Status";

interface Props {
  data: Status[];
  loading: boolean;
  onDelete: (id: string, version: number) => void;
}

const StatusGrid = ({ data, loading, onDelete }: Props) => {
  const columns: GridColDef[] = [
    { field: "statusCode", headerName: "Code", flex: 1, editable: true },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    { field: "statusValue", headerName: "Value", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="contained" // 🔥 important
          color="error"
          size="small"
          onClick={() => onDelete(params.row.id, params.row.recordVersion)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
      />
    </div>
  );
};

export default StatusGrid;

import { GridColDef } from "@mui/x-data-grid";
import AppDataGrid from "../common/AppDataGrid";
import type { Status } from "../../types/Status";
import { Button } from "@mui/material";

interface StatusGridProps {
  data: Status[];
  loading: boolean;
  onCreate: (row: Omit<Status, "id" | "recordVersion"> & { id: null; recordVersion: null }) => Promise<void>;
  onDelete: (id: string, recordVersion: number) => Promise<void>;
  onSelectionChange?: (ids: string[]) => void;
}

const StatusGrid = ({ data, loading, onCreate, onDelete, onSelectionChange }: StatusGridProps) => {
  const columns: GridColDef[] = [
    { field: "statusCode", headerName: "Code", flex: 1, editable: true },
    { field: "description", headerName: "Description", flex: 1, editable: true },
    { field: "statusValue", headerName: "Value", flex: 0.5, editable: true },
  ];

  return (
    <AppDataGrid<Status>
      data={data}
      columns={columns}
      loading={loading}
      onCreate={(row) =>
        onCreate({
          id: null,
          statusCode: row.statusCode?.toUpperCase(),
          description: row.description,
          statusValue: row.statusValue,
          recordVersion: null,
        })
      }
      onSelectionChange={onSelectionChange}
    />
  );
};

export default StatusGrid;

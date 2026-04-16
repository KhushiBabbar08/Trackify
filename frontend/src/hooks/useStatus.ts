import { useEffect, useState } from "react";
import { getStatuses, createStatus, deleteStatus } from "../api/statusApi";
import type { Status } from "../types/Status";

export const useStatus = () => {
  const [data, setData] = useState<Status[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getStatuses();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addStatus = async (payload: any) => {
    await createStatus(payload);
    fetchData();
  };

  const removeStatus = async (id: string, version: number) => {
    await deleteStatus(id, version);
    fetchData();
  };

  return { data, loading, addStatus, removeStatus };
};
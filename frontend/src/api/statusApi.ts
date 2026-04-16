const BASE_URL = "http://localhost:5037/api/Status";

export const getStatuses = async () => {
  const res = await fetch(`${BASE_URL}/SearchStatusMaster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}) // empty object
  });

  if (!res.ok) {
    throw new Error("Failed to fetch statuses");
  }

  return res.json();
};

// ➕ CREATE / UPDATE
export const createStatus = async (data: any) => {
  const res = await fetch(`${BASE_URL}/CreateUpdateStatusMaster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create/update status");
  }

  return res.json();
};

// 🗑️ DELETE (with version)
export const deleteStatus = async (id: string, recordVersion: number) => {
  const res = await fetch(
    `${BASE_URL}/${id}?recordVersion=${recordVersion}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete status");
  }

  return res;
};
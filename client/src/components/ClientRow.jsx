import React from "react";
import { FaTrash } from "react-icons/fa";
import { DeleteClient } from "../mutation/clientMutation";
import { GetClient } from "../Queries/clientQueries";
import { useMutation } from "@apollo/client";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DeleteClient);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteClient({
      variables: { id: client.id },
      update: (cache) => {
        const existingData = cache.readQuery({ query: GetClient });
        const newData = existingData.clients.filter((c) => c.id !== client.id);
        cache.writeQuery({
          query: GetClient,
          data: { clients: newData },
        });
      },
    });
    console.log("Deleting client:", client.name);
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => handleDelete(e)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

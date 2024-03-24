import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GetClient } from "../Queries/clientQueries";
import Spinner from "./spinner"; // Capitalized component name

export default function Client() {
  const { loading, error, data } = useQuery(GetClient);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data &&
        data.clients && ( // Check if data and data.clients are not null or undefined
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
}

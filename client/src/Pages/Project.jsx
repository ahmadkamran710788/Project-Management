import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import { useQuery } from "@apollo/client";
import { Get_Project } from "../Queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(Get_Project, { variables: { id } });
  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {!loading && !error && (
        <div className="position-relative mx-auto w-100 card p-5 border rounded">
          <button
            className="btn btn-light position-absolute top-0 end-0 m-2"
            onClick={() => navigate("/")}
          >
            Back
          </button>

          <div className="mx-auto">
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <h5 className="mt-3">Project Status</h5>
            <p className="lead">{data.project.status}</p>
            <ClientInfo client={data.project.clientId} />
            <EditProjectForm project={data.project} />
          </div>
        </div>
      )}
    </>
  );
}

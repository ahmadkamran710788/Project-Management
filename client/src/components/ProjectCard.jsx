import React from "react";
import { Get_Projects } from "../Queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DeleteProject } from "../mutation/projectMutation";

export default function ProjectCard({ project }) {
  const [deleteProject] = useMutation(DeleteProject);
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log(project.id);
    deleteProject({
      variables: { id: project.id },
      update: (cache) => {
        const existingData = cache.readQuery({ query: Get_Projects });
        const newData = existingData.projects.filter(
          (p) => p.id !== project.id
        );
        cache.writeQuery({
          query: Get_Projects,
          data: { projects: newData },
        });
      },
    });
    console.log("Deleting client:", project.name);
  };
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <div>
              <a
                className="btn btn-light me-2"
                href={`/projects/${project.id}`}
              >
                View
              </a>
              <a className="btn btn-danger" onClick={(e) => handleDelete(e)}>
                Delete
              </a>
            </div>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

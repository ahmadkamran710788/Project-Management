import React from "react";
import Spinner from "./spinner";
import { useQuery } from "@apollo/client";
import { Get_Projects } from "../Queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(Get_Projects);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row  mt-5">
          {data.projects.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}

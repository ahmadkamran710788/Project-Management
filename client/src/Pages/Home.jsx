import React from "react";
import Addclientmodal from "../components/Addclientmodal";
import AddProjectModal from "../components/Addprojectmodal";
import Project from "../components/projects";
import Client from "../components/Client";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <Addclientmodal />
        <AddProjectModal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
}

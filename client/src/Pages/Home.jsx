import React from "react";
import Addclientmodal from "../components/Addclientmodal";
import Project from "../components/projects";
import Client from "../components/Client";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <Addclientmodal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
}

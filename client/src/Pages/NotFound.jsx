import { FaExclamationTriangle } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";

export default function NotFound() {
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  setTimeout(() => {
    setShowPage(true);
  }, 1000);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      {showPage ? (
        <>
          <FaExclamationTriangle className="text-danger" size="5em" />
          <h1>404</h1>
          <p className="lead">Sorry, This page does not exist</p>
          <button className="btn btn-primary" onClick={handleGoBack}>
            Go Back
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

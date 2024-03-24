import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GetClient } from "../Queries/clientQueries";
import { ADD_CLIENT_MUTATION } from "../mutation/clientMutation";

export default function Addclientmodal() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT_MUTATION);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    if (name === "" || email === "" || phone === "") {
      return alert("please fill in all fields");
    }

    addClient({
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const { clients } = cache.readQuery({ query: GetClient });
        cache.writeQuery({
          query: GetClient,
          data: { clients: [...clients, addClient] },
        });
      },
    });
    SetName("");
    SetEmail("");
    SetPhone("");
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModel"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModel"
        aria-labelledby="addClientModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModelLabel">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => {
                      SetPhone(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

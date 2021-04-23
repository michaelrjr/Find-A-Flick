import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../context/Context";

export default function SignInModal(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        history.push("/");
        // setLoading(true);
      } catch (error) {
        setError(error.response.data);
      }
      //setLoading(false);
    },
  });

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <strong className="mr-3">
            <h3>Loading..</h3>
          </strong>
          <div className="spinner-border" role="status" aria-hidden="true"></div>
        </div>
      </div>
    );
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <Modal.Title>Sign in</Modal.Title>
          <div onClick={props.handleClose} style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>

        <div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              className={`${formik.touched.email && formik.errors.email && "form-control is-invalid"} ${
                formik.touched.email && !formik.errors.email ? "form-control is-valid" : "form-control"
              }`}
              type="email"
              placeholder="Enter email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              className={`${formik.touched.password && formik.errors.password && "form-control is-invalid"} ${
                formik.touched.password && !formik.errors.password ? "form-control is-valid" : "form-control"
              }`}
              type="password"
              placeholder="Enter password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {console.log(formik.values.password)}
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

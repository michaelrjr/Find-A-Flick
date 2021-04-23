import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../context/Context";

export default function SignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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
  } else {
    return (
      <div className="container-fluid d-flex justify-content-center" style={{ minHeight: "100%" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="card mb-3 mt-1">
            <div className="card-body">
              <h4 className="card-title text-center">Sign In</h4>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignUp() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // get current date and time
  const today = new Date();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .when("password", {
          is: (password) => (password && password.length > 0 ? true : false),
          then: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),
        }),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/sign-up", {
          username: values.username,
          email: values.email,
          password: values.password,
          createdOn: dateTime,
        });
        setLoading(true);
        setMessage("Account created successfully, redirecting to sign in.");
        setTimeout(() => {
          history.push("/sign-in");
        }, 3000);
      } catch (error) {
        if (error.response.status === 500) setError("Internal Server Error.");
        else setError("Failed to create account, please try again.");
      }
      setLoading(false);
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
              <h4 className="card-title text-center">Sign Up</h4>
              <div>
                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input
                    className={`${formik.touched.username && formik.errors.username && "form-control is-invalid"} ${
                      formik.touched.username && !formik.errors.username ? "form-control is-valid" : "form-control"
                    }`}
                    type="text"
                    placeholder="Enter first name"
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="invalid-feedback">{formik.errors.username}</div>
                  ) : null}
                </div>

                <div className="mb-2">
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
                <div className="mb-2">
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
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className={`${
                      formik.touched.confirmPassword && formik.errors.confirmPassword && "form-control is-invalid"
                    } ${
                      formik.touched.confirmPassword && !formik.errors.confirmPassword
                        ? "form-control is-valid"
                        : "form-control"
                    }`}
                    type="password"
                    placeholder="Enter password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <button className="btn btn-success w-100" type="submit">
                    Sign up
                  </button>
                </div>
              </form>
              <div className="text-center">
                Already have an account? <Link to="/sign-in">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

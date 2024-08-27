import React, { useState } from "react";
import notesImg from "../../src/Assets/Imges/images/notes1.png";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function SignUp() {
  const navigat = useNavigate();
  const [isloding, setisloding] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const valid1 = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "min lenght must be 3 chracters")
      .max(20, "max lenght must be 20 Chracters"),
    email: yup
      .string()
      .required("Email is valid")
      .matches(
        /[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,
        "not valid enter valid Email"
      ),
    password: yup
      .string()
      .required("password is valid")
      .matches(/^[A-Z]{2}[0-9]{1,6}$/gi, "not valid enter valid password"),
    phone: yup
      .string()
      .required("phone is valid")
      .matches(
        /^01[0125][0-9]{8}$/gi,
        "Please Enter  valid Egyptian Number phone"
      ),
    age: yup
      .number()
      .min(18, "Enter Under Age")
      .max(55, "Enter Old Age")
      .required("age is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      setisloding(true);
      try {
        let { data } = await axios.post(
          "https://note-sigma-black.vercel.app/api/v1/users/signUp",
          values
        );
        console.log(data);
        setErrorMsg("");
        // eslint-disable-next-line eqeqeq
        if (data.msg == "done") {
          navigat("/Login");
        }
      } catch (err) {
        setisloding(false);
        console.log(err);
        setErrorMsg(err.response.data.msg);
      }
    },
    validationSchema: valid1,
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your name"
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <p className=" alert alert-danger fs-6 ">
                        {formik.errors.name}
                      </p>
                    ) : (
                      ""
                    )}
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className=" alert alert-danger fs-6">
                        {formik.errors.email}
                      </p>
                    ) : (
                      ""
                    )}

                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />

                    {formik.errors.password && formik.touched.password ? (
                      <p className=" alert alert-danger fs-6">
                        {formik.errors.password}
                      </p>
                    ) : (
                      ""
                    )}

                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />

                    {formik.errors.age && formik.touched.age ? (
                      <p className=" alert alert-danger fs-6">
                        {formik.errors.age}
                      </p>
                    ) : (
                      ""
                    )}
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                      <p className=" alert alert-danger fs-6">
                        {formik.errors.phone}
                      </p>
                    ) : (
                      ""
                    )}

                    {errorMsg ? (
                      <p className=" fs-6 alert alert-danger"> {errorMsg}</p>
                    ) : (
                      ""
                    )}

                    {isloding ? (
                      <button className="px-3 text-white bg-info w-100 d-block rounded-2 py-1 ">
                        {" "}
                        <i className="fa fa-spin fa-spinner px-3"></i>
                      </button>
                    ) : (
                      <button
                        disabled={
                          !(formik.isValid || formik.dirty || formik.isloding)
                        }
                        type="submit"
                        className="btn btn-info text-white mt-3  w-100 text-center rounded-2"
                      >
                        Sign Up
                      </button>
                    )}
                  </form>
                  <Link to={"/Login"}>
                    <p>Already Have Account ? Login...</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

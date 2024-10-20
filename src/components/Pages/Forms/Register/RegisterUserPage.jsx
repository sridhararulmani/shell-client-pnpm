import "./RegisterUserPage.min.css";
import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../../Util/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../Util/LoadingContext";

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  const profileImageInputBox = useRef(null);

  const activateProfileImageInputBoxFunction = () => {
    profileImageInputBox.current.click();
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setFilePreview(null);
  };

  const initialValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "User Name must be between 3 to 2o characters")
      .max(20, "User Name must be between 3 to 2o characters")
      .required("User Name is Mandatory"),
    userEmail: Yup.string()
      .required("Email is Mandatory")
      .email("Email should be valid"),
    userPassword: Yup.string()
      .matches(/.*[a-zA-Z].*/, "Pasword should contain 1 character.")
      .matches(/.*\d.*/, "Pasword should contain 1 Digit.")
      .matches(/.*[@#$%^&+=].*/, "Pasword should contain 1 special character.")
      .min(6, "User Password should have minimum 6 letters")
      .required("User Password is Mandatory"),
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    startLoading();
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("userEmail", values.userEmail);
    formData.append("userPassword", values.userPassword);
    if (profileImage) {
      console.log("Image file is present");
      formData.append("userProfile", profileImage);
    } else {
      console.log("Image File is not present");
    }
    try {
      const response = await api.post("/user/registerUser", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        navigate("/");
        alert("User Registered Successfully...");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const serverErrors = {};
        error.response.data.forEach((err) => {
          serverErrors[err.field] = err.defaultMessage;
        });
        setErrors(serverErrors);
      }
    } finally {
      setSubmitting(false);
      stopLoading();
    }
  };

  return (
    <div className="container p-3" data-aos="fade">
      <div className="row">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="card register-form border-0 bg-light shadow rounded-4 py-5 px-4 d-flex flex-column gap-4">
              {isSubmitting && (
                <div className="alert bg-primary text-white p-4 opacity-75">
                  <span>Please wait Registation is Processing...</span>
                </div>
              )}
              <h2 className="card-title text-center">Register New User</h2>
              <div className="card-body d-flex flex-column gap-4">
                <div className="image-uploader d-felx flex-column align-items-center justify-content-center">
                  <div
                    className="img shadow rounded-circle d-flex align-items-center justify-content-center"
                    onClick={activateProfileImageInputBoxFunction}
                  >
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Set Profile Image"
                        className="profile-img"
                      />
                    ) : (
                      <span className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <i className="fa-solid fa-plus fs-4"></i>
                      </span>
                    )}
                  </div>
                  <input
                    placeholder="Set the User Profile"
                    name="userProfile"
                    type="file"
                    className="form-control profileImageInputBox"
                    id="profileImageInputBox"
                    onChange={(event) => {
                      handleFileChange(event);
                      setProfileImage(event.currentTarget.files[0]);
                      setFieldValue(
                        "userProfile",
                        event.currentTarget.files[0]
                      );
                    }}
                    ref={profileImageInputBox}
                    hidden
                  />
                  <ErrorMessage
                    name="userProfile"
                    className="text-danger"
                    component={"div"}
                  />
                  <div className="img-upload-btns d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary rounded-circle shadow"
                      onClick={activateProfileImageInputBoxFunction}
                    >
                      <i
                        className={
                          filePreview
                            ? "fa-solid fa-rotate"
                            : "fa-solid fa-arrow-up-from-bracket"
                        }
                      ></i>
                    </button>
                    {filePreview && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger rounded-circle shadow"
                        onClick={removeProfileImage}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="" className="form-label">
                    Enter the User Name
                  </label>
                  <Field
                    name="userName"
                    type="text"
                    className="form-control"
                    placeholder="Set the User Name"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="userName"
                    component={"div"}
                  />
                </div>
                <div>
                  <label htmlFor="" className="form-label">
                    Enter the User Email
                  </label>
                  <Field
                    name="userEmail"
                    type="text"
                    className="form-control"
                    placeholder="Set the User Email"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="userEmail"
                    component={"div"}
                  />
                </div>
                <div>
                  <label htmlFor="" className="form-label">
                    Enter your User Password
                  </label>
                  <Field
                    placeholder="Set the User Password"
                    name="userPassword"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="userPassword"
                    className="text-danger"
                    component={"div"}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex gap-5">
                  <a
                    href="/"
                    className="btn btn-danger"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

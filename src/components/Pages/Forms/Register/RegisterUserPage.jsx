import "./RegisterUserPage.min.css";
import React, { useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../../util/config/AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../../../../util/context/LoadingContext";
import {
  showErrorToast,
  showWarningToast,
} from "../../../../util/constant/ToastUtil";

const Register = () => {
  const { startLoading, stopLoading } = useLoading();

  const [profileImage, setProfileImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleImageFileChange = (event) => {
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
    profileImage != null && formData.append("userProfileImage", profileImage);

    try {
      const response = await api.post("/user/registerUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { status, message } = response?.data;
      if (status === 201) {
        navigate("/");
      } else {
        showWarningToast(message);
      }
    } catch (error) {
      showErrorToast(error?.response?.message);
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
          key={location.pathname}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form
              encType="multipart/form-data"
              autoComplete="false"
              className="card register-form border-0 bg-light shadow rounded-4 py-5 px-4 d-flex flex-column gap-4"
            >
              <h2 className="card-title text-center">Sign up New User</h2>
              <div className="card-body d-flex flex-column gap-4">
                <div className="image-uploader d-felx flex-column align-items-center justify-content-center">
                  <div
                    className="img shadow bg-white rounded-4 d-flex align-items-center justify-content-center position-relative"
                    onClick={activateProfileImageInputBoxFunction}
                  >
                    {filePreview != null && (
                      <img
                        src={filePreview}
                        alt="Set Profile Image"
                        className="profile-img"
                      />
                    )}
                    <div className="img-upload-top-content w-100">
                      <input
                        placeholder="Set the User Profile"
                        name="userProfileImage"
                        type="file"
                        className="form-control profileImageInputBox"
                        id="profileImageInputBox"
                        onChange={(event) => {
                          handleImageFileChange(event);
                          setProfileImage(event.currentTarget.files[0]);
                          setFieldValue(
                            "userProfileImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        ref={profileImageInputBox}
                        hidden
                      />
                      <ErrorMessage
                        name="userProfileImage"
                        className="text-danger"
                        component={"div"}
                      />
                      <div className="img-upload-btns d-flex flex-column align-items-center justify-content-center w-100">
                        <div
                          className="d-flex align-items-center justify-content-center w-100"
                          onClick={activateProfileImageInputBoxFunction}
                        >
                          <span className="text-center text-white fw-bold">
                            {filePreview == null
                              ? "Set Profile"
                              : "Change Profile"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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

                <div>
                  <label htmlFor="userName" className="form-label">
                    Enter the User Name
                  </label>
                  <Field
                    id="userName"
                    name="userName"
                    type="text"
                    className="form-control"
                    placeholder="Set the User Name"
                    auto
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="userName"
                    component={"div"}
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="form-label">
                    Enter the User Email
                  </label>
                  <Field
                    id="userEmail"
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
                  <label htmlFor="userPassword" className="form-label">
                    Enter your User Password
                  </label>
                  <Field
                    id="userPassword"
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
                <div className="mt-4 d-flex align-items-center justify-content-center">
                  <div className="d-flex gap-3 w-100">
                    <a
                      href="/"
                      className="btn custom-btn w-100 rounded-5"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </a>
                    <button
                      type="submit"
                      className="btn custom-btn w-100 rounded-5"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </div>
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

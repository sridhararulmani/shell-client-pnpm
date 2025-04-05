import "./RegisterUserPage.min.css";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../util/config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../util/context/LoadingContext";
import { showWarningToast } from "../../../../util/constant/ToastUtil";
import AppConstant from "../../../../util/constant/AppConstant";
import { Box, TextField, IconButton, Avatar } from "@mui/material";
import {
  APP_MUI_INPUT_FIELD_SIZE,
  APP_MUI_INPUT_FIELD_VARIENT,
} from "../../../../util/constant/AppUtils";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Register = () => {
  const { startLoading, stopLoading } = useLoading();
  const { CancelButton, SubmitButton, AppCardTitle } = AppConstant();

  const [profileImage, setProfileImage] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const navigate = useNavigate();

  const removeProfileImage = () => {
    setProfileImage(null);
    setFilePreview(null);
  };

  const initialValues = {
    userName: "",
    mobileNumber: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  };

  const serverErrors = {};

  const feileRef = {
    userName: useRef(),
    userEmail: useRef(),
    userPassword: useRef(),
    confirmPassword: useRef(),
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "User Name must be between 3 to 20 characters")
      .max(20, "User Name must be between 3 to 20 characters")
      .required("User Name is Required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please Provaid Valid Mobile Number")
      .nullable(),
    userEmail: Yup.string()
      .required("Email is Required")
      .email("Email should be valid"),
    userPassword: Yup.string()
      .matches(
        /.*[A-Z].*/,
        "Password must contain at least 1 upper case letter"
      )
      .matches(
        /.*[a-z].*/,
        "Password must contain at least 1 lower case letter"
      )
      .matches(
        /.*[A-Za-z].*[a-zA-Z].*[A-Za-z].*/,
        "Password must contain at least 3 letters"
      )
      .matches(/.*\d.*/, "Password must contain at least 1 digit")
      .matches(/.*[@#$%^&+=].*/, "Pasword should contain 1 special character")
      .min(8, "User Password should be between 8 to 16 characters")
      .max(16, "User Password should be between 8 to 16 characters")
      .required("User Password is Required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("userPassword"), null], "Entered Password is Not Matched")
      .required("Confirm the enterd Password"),
  });

  const handleUserRegister = async (values, setSubmitting, setFieldError) => {
    startLoading();
    try {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("userEmail", values.userEmail);
      formData.append("userPassword", values.userPassword);
      profileImage != null &&
        formData.append("userProfileImage", profileImage ?? null);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:${value}`);
      }
      const response = await api.post("/user/registerUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { status, message } = response?.data;
      if (status === 201) {
        // showSuccessToast(message);
        navigate("/");
      } else {
        showWarningToast(message);
      }
    } catch (error) {
      // showErrorToast(error?.response?.message);
      if (error?.response && error?.status === 400) {
        const serverErrors = error?.response?.data;
        Object.keys(serverErrors).forEach((field) => {
          console.log(`${field}:${serverErrors[field]}`);
          setFieldError(field, serverErrors[field]);
        });
      }
    } finally {
      setSubmitting(false);
      stopLoading();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      handleUserRegister(values, setSubmitting, setFieldError);
    },
  });

  const handleValidateFields = () => {
    const firstInValidField = Object.keys(formik.errors)[0];
    if (firstInValidField) {
      feileRef[firstInValidField].current.focus();
    }
  };

  const profileImageInputBox = useRef();

  const activateProfileImageInputBoxFunction = () => {
    profileImageInputBox.current.click();
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(file);
      setFilePreview(objectUrl);
      formik.setFieldValue("userProfileImage", file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="p-3" data-aos="fade">
      <div className="row">
        <div className="card register-form border-0 bg-light shadow-sm rounded-4 gap-4 py-4 d-flex flex-column gap-4">
          <AppCardTitle text={"Sign up New User"} />
          {/* <h2 className="card-title text-center">Sign up New User</h2> */}
          <div className="card-body d-flex flex-column gap-4 w-100 overflow-hidden">
            <div className="image-uploader d-felx flex-column align-items-center justify-content-center">
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  position: "relative",
                  borderRadius: "100%",
                  backgroundColor: "transparent",
                  transition: "all 0.5s ease-in-out",
                  boxShadow: 1,
                }}
              >
                <Avatar
                  alt="Profile image"
                  src={filePreview}
                  sx={{
                    width: "100%",
                    height: "100%",
                    transition: "all 0.5s ease-in-out",
                  }}
                ></Avatar>
                <input
                  id="profileImageInputBox"
                  name="userProfileImage"
                  type="file"
                  accept="image/jpeg ,image/png, image/gif"
                  className="form-control profileImageInputBox"
                  placeholder="Set the User Profile"
                  onChange={handleImageFileChange}
                  ref={profileImageInputBox}
                  hidden
                />
                {filePreview && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      // size: "medium",
                      top: 0,
                      right: 0,
                      backgroundColor: "ButtonFace",
                      color: "red",
                      boxShadow: 2,
                      "&:hover": {
                        backgroundColor: "ButtonHighlight",
                      },
                    }}
                    onClick={removeProfileImage}
                  >
                    <CloseRoundedIcon sx={{ fontSize: "medium" }} />
                  </IconButton>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    size: "small",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "ButtonFace",
                    color: "blue",
                    boxShadow: 2,
                    "&:hover": {
                      backgroundColor: "ButtonHighlight",
                    },
                  }}
                  onClick={activateProfileImageInputBoxFunction}
                >
                  <AddRoundedIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Box>
            </div>
            <Box
              component="form"
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                handleValidateFields();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "100%",
              }}
            >
              <TextField
                label="Enter the User Name"
                variant={APP_MUI_INPUT_FIELD_VARIENT}
                type="text"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                inputRef={feileRef.userName}
                size={APP_MUI_INPUT_FIELD_SIZE}
                fullWidth
              />
              <TextField
                label="Enter the your Mobile Number"
                variant={APP_MUI_INPUT_FIELD_VARIENT}
                type="number"
                InputProps={{ inputMode: "numeric" }}
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.mobileNumber &&
                  Boolean(formik.errors.mobileNumber)
                }
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
                inputRef={feileRef.mobileNumber}
                size={APP_MUI_INPUT_FIELD_SIZE}
                fullWidth
              />
              <TextField
                label="Enter the User Email"
                variant={APP_MUI_INPUT_FIELD_VARIENT}
                type="email"
                name="userEmail"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userEmail && Boolean(formik.errors.userEmail)
                }
                helperText={formik.touched.userEmail && formik.errors.userEmail}
                inputRef={feileRef.userEmail}
                size={APP_MUI_INPUT_FIELD_SIZE}
                fullWidth
              />
              <TextField
                label="Set User Password"
                variant={APP_MUI_INPUT_FIELD_VARIENT}
                type="password"
                name="userPassword"
                value={formik.values.userPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userPassword &&
                  Boolean(formik.errors.userPassword)
                }
                helperText={
                  formik.touched.userPassword && formik.errors.userPassword
                }
                inputRef={feileRef.userPassword}
                size={APP_MUI_INPUT_FIELD_SIZE}
                fullWidth
              />
              <TextField
                label="Confirm User Password"
                variant={APP_MUI_INPUT_FIELD_VARIENT}
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                inputRef={feileRef.confirmPassword}
                size={APP_MUI_INPUT_FIELD_SIZE}
                fullWidth
              />
              <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
                <SubmitButton
                  type="submit"
                  buttonText="Sign Up"
                  isDisable={!formik.isValid}
                />
                <CancelButton buttonText={"Back"} />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

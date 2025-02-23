import "./LoginUserPage.min.css";
import "react-toastify/dist/ReactToastify.css";

import api, { storeTokens } from "../../../../util/config/AxiosConfig";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useLoading } from "../../../../util/context/LoadingContext";
import { showSuccessToast } from "../../../../util/constant/ToastUtil";
import { useDispatch } from "react-redux";
import { authUserDetails, loadUser } from "../../../../util/config/AuthSetGet";
import { setUser } from "../../../../util/redux/userSlice";
import { Box, TextField } from "@mui/material";
import AppConstant from "../../../../util/constant/AppConstant";
import { useSelector } from "react-redux";
import {
  APP_MUI_INPUT_FIELD_SIZE,
  APP_MUI_INPUT_FIELD_VARIENT,
} from "../../../../util/constant/AppUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.user);

  const { startLoading, stopLoading } = useLoading();

  const { CancelButton, SubmitButton } = AppConstant();

  const [error, setError] = useState(null);

  if (error) {
    setTimeout(() => {
      setError("");
    }, 6000);
  }

  const dispatch = useDispatch();

  const fetchAuthUser = async () => {
    const userRes = await loadUser();
    const userObj = authUserDetails(userRes);
    dispatch(setUser(userObj));
  };

  const initialValues = {
    userName: "",
    userPassword: "",
  };

  const feileRef = {
    userName: useRef(),
    userPassword: useRef(),
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("User name or Email is required"),
    userPassword: Yup.string().required("User password is required"),
  });

  const login = async (values, setSubmitting, setFieldError) => {
    startLoading();
    try {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("userPassword", values.userPassword);
      const response = await api.post("/auth/login", formData);
      if (response) {
        const { accessToken, refreshToken } = response?.data;
        storeTokens(accessToken, refreshToken);
        await fetchAuthUser();
        if (user) {
          showSuccessToast("Sign In Success");
          navigate("/");
        }
      } else {
        setError("Invalid Email or userPassword");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
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
      login(values, setSubmitting, setFieldError);
    },
  });

  const handleValidateFields = () => {
    const firstInValidField = Object.keys(formik.errors)[0];
    if (firstInValidField) {
      feileRef[firstInValidField].current.focus();
    }
  };

  return (
    <div>
      <div className="container p-3" data-aos="fade">
        <div className="row">
          <div className="login-form border-0 card rounded-4 bg-light px-4 py-5 shadow-sm d-flex flex-column gap-4">
            <Box
              component="form"
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
              <h4 className="card-title text-center">Sign in User</h4>
              <div className="card-body d-flex flex-column gap-4 w-100 overflow-hidden">
                {error && (
                  <span
                    className="card border-danger bg-danger p-4 text-white text-center"
                    data-aos="zoom-in"
                    data-aos-delay="10"
                  >
                    {error}
                  </span>
                )}
                <div>
                  <TextField
                    label="Email or User Name"
                    variant={APP_MUI_INPUT_FIELD_VARIENT}
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                    inputRef={feileRef.userName}
                    // value={userCridentials.userName}
                    // onChange={handleChange}
                    size={APP_MUI_INPUT_FIELD_SIZE}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    label="Password"
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
                    // value={userCridentials.userPassword}
                    // onChange={handleChange}
                    size={APP_MUI_INPUT_FIELD_SIZE}
                    fullWidth
                  />
                </div>
                <div className="btn-grp d-flex flex-column gap-3 mt-3 align-items-center justify-content-center">
                  <SubmitButton
                    buttonText={"Sign In"}
                    isDisable={!formik.isValid}
                  />
                  <CancelButton buttonText={"Back"} />
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

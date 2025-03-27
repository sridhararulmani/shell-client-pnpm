import "./AppConstant.min.css";

import { useNavigationHistory } from "../context/NavigationContext";
import { APP_MUI_BUTTON_VARIENT } from "./AppUtils";
import { Button as MUIButton } from "@mui/material";
import { NavLink } from "react-router-dom";

const AppConstant = () => {
  const { navPrevPath } = useNavigationHistory();

  const CancelButton = ({
    buttonText = "Cancel",
    className = "custom-btn w-100 text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type="button"
        onClick={() => navPrevPath()}
        fullWidth={true}
        sx={{ color: "ButtonText", textAlign: "center" }}
      >
        {buttonText}
      </MUIButton>
    );
  };

  const Button = ({
    buttonText = "Ok",
    onClick,
    type = "button",
    className = "custom-btn w-100 text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type={type}
        onClick={onClick}
        fullWidth={true}
        sx={{ color: "ButtonText", textAlign: "center" }}
      >
        {buttonText}
      </MUIButton>
    );
  };

  const SubmitButton = ({
    buttonText = "Submit",
    type = "submit",
    isDisable = false,
    className = "custom-btn w-100 text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type={type}
        disabled={isDisable}
        fullWidth={true}
        sx={{ color: "ButtonText", textAlign: "center" }}
      >
        {buttonText}
      </MUIButton>
    );
  };

  const AppButton = ({
    type = APP_MUI_BUTTON_VARIENT,
    icon,
    text,
    path,
    className = "custom-btn w-100 text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        className={className}
        LinkComponent={NavLink}
        varient={type}
        startIcon={icon}
        to={path}
        fullWidth={true}
        sx={{ color: "ButtonText", textAlign: "center" }}
      >
        {text}
      </MUIButton>
    );
  };

  const AppLogoSvg = ({}) => {
    return (
      <i>
        <img src="./shopify-brands-solid.svg" alt="icon" />
      </i>
    );
  };

  const AppName = ({}) => {
    return "Shell";
  };

  return {
    CancelButton,
    Button,
    SubmitButton,
    AppLogoSvg,
    AppName,
    AppButton,
  };
};

export default AppConstant;

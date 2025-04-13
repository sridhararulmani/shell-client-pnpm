import "./AppConstant.min.css";
import "../../App.min.css";

import { useNavigationHistory } from "../context/NavigationContext";
import { APP_MUI_BUTTON_VARIENT } from "./AppUtils";
import { Avatar, ListItemAvatar, Button as MUIButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { muiFontStyle } from "../mui/MUIUtils";

const AppConstant = () => {
  const { navPrevPath } = useNavigationHistory();

  const CancelButton = ({
    buttonText = "Cancel",
    icon,
    className = "text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type="button"
        startIcon={icon}
        onClick={() => navPrevPath()}
        fullWidth={true}
        sx={{ ...muiFontStyle }}
      >
        {buttonText}
      </MUIButton>
    );
  };

  const Button = ({
    buttonText = "Ok",
    onClick = () => {},
    icon,
    type = "button",
    className = "text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type={type}
        startIcon={icon}
        onClick={onClick}
        fullWidth={true}
        sx={{ ...muiFontStyle }}
      >
        {buttonText}
      </MUIButton>
    );
  };

  const SubmitButton = ({
    buttonText = "Submit",
    type = "submit",
    icon,
    isDisable = false,
    className = "text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        LinkComponent={NavLink}
        className={className}
        type={type}
        startIcon={icon}
        disabled={isDisable}
        fullWidth={true}
        sx={{ ...muiFontStyle }}
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
    className = "text-center rounded-5 px-3",
  }) => {
    return (
      <MUIButton
        className={className}
        LinkComponent={NavLink}
        varient={type}
        startIcon={icon}
        to={path}
        fullWidth={true}
        sx={{ ...muiFontStyle }}
      >
        {text}
      </MUIButton>
    );
  };

  const AppUserProfileAvatar = ({
    userProfile,
    altText,
    dataAos = "flip-right",
    dataAosDelay = "300",
    onClickFn = () => {},
  }) => {
    return (
      <ListItemAvatar
        className="flex flex-row-reverse"
        data-aos={dataAos}
        data-aos-delay={dataAosDelay}
        onClick={() => onClickFn()}
      >
        <span className="absolute flex size-2 z-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
        </span>
        <Avatar
          alt={altText}
          src={userProfile}
          sx={{
            transition: "all 0.5s ease-in-out",
            cursor: "pointer",
          }}
        ></Avatar>
      </ListItemAvatar>
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
    return (
      <span className="sm:text-lg md:text-2xl lg:text-2xl font-bold gap-2">
        <i className="fa-brands fa-shopify"></i>
        <span>
          Shell
        </span>
      </span>
    );
  };

  const AppCardTitle = ({ text }) => {
    return (
      <span className="card-title text-center fw-bold sm:text-lg md:text-xl">
        {text}
      </span>
    );
  };

  return {
    CancelButton,
    Button,
    SubmitButton,
    AppLogoSvg,
    AppName,
    AppButton,
    AppCardTitle,
    AppUserProfileAvatar,
  };
};

export default AppConstant;

import "../constant/css/AppConstant.min.css";
import "../../App.min.css";
import React from "react";

import { useNavigationHistory } from "../context/NavigationContext";
import { APP_MUI_BUTTON_VARIENT } from "../AppUtils";
import { Avatar, ListItemAvatar, Button as MUIButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AppMUISplitButton, muiFontStyle } from "../mui/MUIUtils";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { preferenceMenu } from "../classes/PreferenceMenu";
import { AppSelectData } from "../classes/AppSelectData";
import { DarkMode } from "@mui/icons-material";
import { LightMode } from "@mui/icons-material";
import { ComputerOutlined } from "@mui/icons-material";
import { Palette } from "@mui/icons-material";

const AppConstant = () => {
  const { navPrevPath } = useNavigationHistory();

  const CancelButton = useCallback(
    ({
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
    },
    []
  );

  const Button = useCallback(
    ({
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
    },
    []
  );

  const SubmitButton = useCallback(
    ({
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
          sx={{
            ...muiFontStyle,
          }}
        >
          {buttonText}
        </MUIButton>
      );
    },
    []
  );

  const AppButton = useCallback(
    ({
      type = APP_MUI_BUTTON_VARIENT,
      startIcon = null,
      endIcon = null,
      text,
      path,
      className = "text-center rounded-5 px-3 border-0",
    }) => {
      return (
        <MUIButton
          className={className}
          LinkComponent={NavLink}
          varient={type}
          startIcon={startIcon}
          endIcon={endIcon}
          to={path}
          fullWidth={true}
          sx={{
            ...muiFontStyle,
          }}
        >
          {text}
        </MUIButton>
      );
    },
    []
  );

  const AppUserProfileAvatar = useCallback(
    ({
      userProfile,
      altText,
      dataAos = "flip-right",
      dataAosDelay = "300",
      dataAosOnce = false,
      isHideDock = false,
      className = "",
      onClickFn = () => {},
    }) => {
      return (
        <ListItemAvatar
          className="flex item-center justify-center"
          data-aos={dataAos}
          data-aos-once={dataAosOnce}
          data-aos-delay={dataAosDelay}
          onClick={onClickFn}
        >
          <div className="flex flex-row-reverse">
            {!isHideDock && (
              <span className="absolute flex size-2 z-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
              </span>
            )}
            <Avatar
              alt={altText}
              src={userProfile}
              sx={{
                transition: "all 0.5s ease-in-out",
                cursor: "pointer",
              }}
              className={className}
            ></Avatar>
          </div>
        </ListItemAvatar>
      );
    },
    []
  );

  const AppLogoSvg = useCallback(({}) => {
    return (
      <i>
        <img src="./shopify-brands-solid.svg" alt="icon" />
      </i>
    );
  }, []);

  const AppName = useCallback(({}) => {
    return (
      <span className="sm:text-lg md:text-2xl lg:text-2xl font-bold gap-2">
        <i className="fa-brands fa-shopify"></i>
        <span>Shell</span>
      </span>
    );
  }, []);

  const AppCardTitle = useCallback(({ text }) => {
    return (
      <span className="card-title text-center fw-bold sm:text-lg md:text-xl">
        {text}
      </span>
    );
  }, []);

  const AppThemeChange = useCallback(() => {
    
    const getPreferedTheme = () => {
      const stored = localStorage.getItem("theme");
      if (stored && stored !== "default") {
        return stored;
      }
      const systemPreferredTheme = window.matchMedia(
        "(prefers-color-scheme:dark)"
      ).matches;
      return systemPreferredTheme ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getPreferedTheme);

    useEffect(() => {
      setTheme(getPreferedTheme);
      document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleChange = (e) => {
      localStorage.setItem(
        "theme",
        e === "dark" ? "dark" : e === "light" ? "light" : "default"
      );
      setTheme(getPreferedTheme);
    };

    const preferenceMenuList = [
      new preferenceMenu(
        "Theme",
        "Theme",
        <Palette />,
        null,
        "Customize your theme with shell",
        (
          <AppMUISplitButton
            options={[
              new AppSelectData("Dark", <DarkMode />, null, "dark", (e) =>
                handleChange(e)
              ),
              new AppSelectData("Light", <LightMode />, null, "light", (e) =>
                handleChange(e)
              ),
              new AppSelectData(
                "Default",
                <ComputerOutlined />,
                null,
                "default",
                (e) => handleChange(e)
              ),
            ]}
            selectedValue={localStorage.getItem("theme")}
          />
        )
      ),
    ];
    return preferenceMenuList;
  }, []);

  return {
    CancelButton,
    Button,
    SubmitButton,
    AppLogoSvg,
    AppName,
    AppButton,
    AppCardTitle,
    AppThemeChange,
    AppUserProfileAvatar,
  };
};

export default AppConstant;

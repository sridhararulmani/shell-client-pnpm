import "../../App.min.css";
import React from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import AppSkeleton from "../skeleton/AppSkeleton";

export const AppMUIIconButton = React.memo(
  ({ icon, clickFun = () => {}, eleRef }) => {
    return (
      <IconButton
        LinkComponent={Button}
        onClick={clickFun}
        ref={eleRef}
        sx={{ ...appIconStyle }}
      >
        {icon}
      </IconButton>
    );
  }
);

export const appIconStyle = {
  color: "var(--text-primary)",
  backgroundColor: "transparent",
  transition: "all 0.2s ease-in-out",
};

export const themeBasedStyleForMuiInputs = {
  "& .MuiOutlinedInput-root": {
    color: "var(--text-primary)",
    backgroundColor: "var(--bg-secondary)",
    borderColor: "black",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "& .MuiInputLabel-root": {
    color: "var(--text-primary)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--text-primary)",
  },
};

export const muiStylesListItem = {
  display: "flex",
  flexDirection: "column",
  padding: 0,
};

export const muiButtonStyle = {
  display: "flex",
  flexDirection: "row",
  paddingX: "15px",
  minWidth: "150px",
  maxWidth: "200px",
};

export const muiFontStyle = {
  fontSize: "0.8rem",
  textTransform: "none",
  whiteSpace: "nowrap",
  color: "var(--text-primary)",
  letterSpacing: "0.5px",
  transition: "letter-spacing 0.2s ease-in-out",
};

export const appCard =
  "col-sm-12 col-md-8 col-lg-5 card p-4 p-md-4 p-lg-5 border-0";

export const appCardStyles =
  "border-0 rounded-4 shadow-sm d-flex flex-column py-4";

export const commonNavBarStyleColors = {
  backgroundColor: "var(--bg-nav-primary)",
  color: "var(--text-primary)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export const commonNavBarWithoutBlurStyleColors = {
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

export const popoverButtonTextAlign = {
  justifyContent: "flex-start",
};

export const AppMUIListItemTextWithIcon = React.memo(
  ({ textDataList, dataAos = "slide-left" }) => {
    const { AppTextSingleLineSkeleton } = AppSkeleton();

    return (
      <ListItem sx={muiStylesListItem} data-aos={dataAos}>
        {textDataList?.map((data, index) => {
          return (
            <Button
              key={index}
              LinkComponent={ListItemText}
              sx={{
                pointerEvents: "none",
                ...muiButtonStyle,
                ...muiFontStyle,
                ...popoverButtonTextAlign,
              }}
              fullWidth
              startIcon={data.icon}
            >
              {data.text || <AppTextSingleLineSkeleton />}
            </Button>
          );
        })}
      </ListItem>
    );
  }
);

export const AppMUIListItemButtonWithIcon = React.memo(
  ({ buttonList, dataAos = "slide-left" }) => {
    const { AppTextSingleLineSkeleton } = AppSkeleton();

    return (
      <ListItem sx={muiStylesListItem} data-aos={dataAos}>
        {buttonList?.map((data, index) => {
          return (
            <Button
              key={index}
              LinkComponent={NavLink}
              sx={{
                ...muiButtonStyle,
                ...muiFontStyle,
                ...popoverButtonTextAlign,
                borderRadius: 0,
              }}
              to={data.path}
              fullWidth
              startIcon={data.icon}
            >
              {data.text || <AppTextSingleLineSkeleton />}
            </Button>
          );
        })}
      </ListItem>
    );
  }
);

export const AppMUIDivider = React.memo(({}) => {
  return (
    <Divider
      orientation="horizontal"
      variant="middle"
      flexItem
      sx={{ borderColor: "var(--text-secondary)" }}
    />
  );
});

export const AppMUIDilog = React.memo(({}) => {
  return null;
});

export const AppMUIPopover = React.memo(
  ({
    anchorEl,
    onCloseFn = () => {},
    onClickFn = () => {},
    horizontalPosition = "center",
    anchorOrigin = { vertical: "bottom", horizontal: horizontalPosition },
    transferOrigin = { vertical: "top", horizontal: horizontalPosition },
    popoverHeaderList,
    popoverFooterList,
    textList,
    buttonList,
  }) => {
    const { AppTextSingleLineSkeleton } = AppSkeleton();
    const isOpen = Boolean(anchorEl) && document.contains(anchorEl);
    
    return (
      <Popover
        disableEnforceFocus
        open={isOpen}
        anchorEl={anchorEl}
        onClick={onClickFn}
        onClose={onCloseFn}
        anchorOrigin={anchorOrigin}
        transformOrigin={transferOrigin}
        disableScrollLock={true}
        sx={{ marginTop: "15px" }}
        PaperProps={{
          sx: {
            ...commonNavBarStyleColors,
            paddingY: "0.6rem",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent",
          }}
        >
          {popoverHeaderList && (
            <Box>
              {popoverHeaderList?.topBorder && <AppMUIDivider />}
              <AppMUIListItemTextWithIcon
                textDataList={popoverHeaderList?.content}
              />
              {popoverHeaderList?.botumBorder && <AppMUIDivider />}
            </Box>
          )}
          {textList && (
            <Box>
              {textList.topBorder && <AppMUIDivider />}
              <AppMUIListItemTextWithIcon textDataList={textList?.content} />
              {textList.botumBorder && <AppMUIDivider />}
            </Box>
          )}
          {buttonList && (
            <Box>
              {buttonList.topBorder && <AppMUIDivider />}
              <AppMUIListItemButtonWithIcon buttonList={buttonList?.content} />
              {buttonList.botumBorder && <AppMUIDivider />}
            </Box>
          )}
          {popoverFooterList && (
            <Box>
              {popoverFooterList.topBorder && <AppMUIDivider />}
              <AppMUIListItemTextWithIcon
                textDataList={popoverFooterList?.content}
              />
              {popoverFooterList.botumBorder && <AppMUIDivider />}
            </Box>
          )}
        </Box>
      </Popover>
    );
  }
);

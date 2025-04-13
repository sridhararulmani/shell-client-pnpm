import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import AppSkeleton from "../skeleton/AppSkeleton";
import { NavLink } from "react-router-dom";
import "../../App.min.css";

export const AppMUIIconButton = ({ icon, clickFun = () => {}, eleRef }) => {
  const appIconStyle = {
    color: "var(--text-primary)",
    backgroundColor: "transparent",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <IconButton
      LinkComponent={Button}
      onClick={() => clickFun()}
      ref={eleRef}
      sx={appIconStyle}
    >
      {icon}
    </IconButton>
  );
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
};

  export const commonNavBarStyleColors = {
    backgroundColor: "var(--bg-nav-primary)",
    color: "var(--text-primary)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
  };

export const popoverButtonTextAlign = {
  justifyContent: "flex-start",
};

export const AppMUIListItemTextWithIcon = ({
  textDataList,
  dataAos = "slide-left",
}) => {
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
};

export const AppMUIListItemButtonWithIcon = ({
  buttonList,
  dataAos = "slide-left",
}) => {
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
};

export const AppMUIPopover = ({
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

  return (
    <Popover
      disableEnforceFocus
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClick={() => onClickFn()}
      onClose={() => onCloseFn()}
      anchorOrigin={anchorOrigin}
      transformOrigin={transferOrigin}
      sx={{ marginTop: "15px" }}
      PaperProps={{
        sx: {
          ...commonNavBarStyleColors
        },
      }}
    >
      <Box
        sx={{
          backgroundColor:"transparent",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
      >
        {popoverHeaderList && (
          <Box>
            <AppMUIListItemTextWithIcon textDataList={popoverHeaderList} />
          </Box>
        )}
        {textList && (
          <Box>
            <AppMUIListItemTextWithIcon textDataList={textList} />
          </Box>
        )}
        {buttonList && (
          <Box>
            <AppMUIListItemButtonWithIcon buttonList={buttonList} />
          </Box>
        )}
        {popoverFooterList && (
          <Box>
            <AppMUIListItemTextWithIcon textDataList={popoverFooterList} />
          </Box>
        )}
      </Box>
    </Popover>
  );
};

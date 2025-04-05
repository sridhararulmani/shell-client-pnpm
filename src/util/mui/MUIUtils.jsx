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

export const AppMUIIconButton = ({ icon, clickFun, eleRef }) => {
  const appIconStyle = {
    backgroundColor: "transparent",
    "&:hover:not(&:active)": {
      backgroundColor: "var(--dark-primary-button-hover-color)",
    },
    "&:active": {
      backgroundColor: "var(--dark-primary-button-click-color)",
      color: "var(--dark-active-btn-color)",
    },
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
  width: "120px",
};

export const muiFontStyle = {
  fontSize: "0.8rem",
  textTransform: "none",
  color: "black",
};

export const AppMUIListItemTextWithIcon = ({ textDataList ,dataAos="slide-left"}) => {
  const { AppTextSingleLineSkeleton } = AppSkeleton();

  return (
    <ListItem sx={muiStylesListItem} data-aos={dataAos}>
      {textDataList?.map((data, index) => {
        return (
          <Button
            key={index}
            LinkComponent={ListItemText}
            sx={{
              ...muiButtonStyle,
              ...muiFontStyle,
            }}
            fullWidth
            startIcon={data.icon}
          >
            {data.title || <AppTextSingleLineSkeleton />}
          </Button>
        );
      })}
    </ListItem>
  );
};

export const AppMUIListItemButtonWithIcon = ({ buttonList , dataAos="slide-left"}) => {
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
            }}
            to={data.url}
            fullWidth
            startIcon={data.icon}
          >
            {data.title}
          </Button>
        );
      })}
    </ListItem>
  );
};

export const AppMUIPopover = ({
  anchorEl,
  onCloseFn,
  onClickFn,
  horizontalPosition = "center",
  anchorOrigin = { vertival: "bottum", horizontal: horizontalPosition },
  transferOrigin = { vertical: "top", horizontal: horizontalPosition },
  popoverHeaderList,
  popoverFooterList,
  textList,
  buttonList,
}) => {
  const { AppTextSingleLineSkeleton } = AppSkeleton();

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClick={() => onClickFn()}
      onClose={() => onCloseFn()}
      anchorOrigin={anchorOrigin}
      transformOrigin={transferOrigin}
      sx={{marginTop:"50px"}}
    >
      <Box data-aos="slide-left" data-aos-delay="100">
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

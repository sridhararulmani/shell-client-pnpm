import "../../App.min.css";

import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
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

export const themeBasedButtonOppositStyle = {
  backgroundColor: "var(--opposit-bg-primary)",
  color: "var(--opposit-text-primary)",
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

export const muiFontStyleWithOutThemeColor = {
  fontSize: "0.8rem",
  textTransform: "none",
  whiteSpace: "nowrap",
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
  backdropFilter: "blur(2.5px)",
  WebkitBackdropFilter: "blur(2.5px)",
};

export const commonNavBarWithoutBlurStyleColors = {
  backgroundColor: "var(--bg-primary)",
  color: "var(--text-primary)",
  backdropFilter: "blur(2.5px)",
  WebkitBackdropFilter: "blur(2.5px)",
};

export const popoverButtonTextAlign = {
  justifyContent: "flex-start",
};

export const AppMUIListItemTextWithIcon = React.memo(({ textDataList }) => {
  const { AppTextSingleLineSkeleton } = AppSkeleton();

  return (
    <ListItem sx={muiStylesListItem}>
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
            startIcon={data.startIcon}
            endIcon={data.endIcon}
          >
            {data.text || <AppTextSingleLineSkeleton />}
          </Button>
        );
      })}
    </ListItem>
  );
});

export const AppMUIListItemButtonWithIcon = React.memo(({ buttonList }) => {
  const { AppTextSingleLineSkeleton } = AppSkeleton();

  return (
    <ListItem sx={muiStylesListItem}>
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
            startIcon={data.startIcon}
            endIcon={data.endIcon}
          >
            {data.text || <AppTextSingleLineSkeleton />}
          </Button>
        );
      })}
    </ListItem>
  );
});

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
    const isOpen = Boolean(anchorEl) && document.body.contains(anchorEl);

    return (
      <Popover
        disableEnforceFocus
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={onClickFn}
        onClose={onCloseFn}
        anchorOrigin={anchorOrigin}
        transformOrigin={transferOrigin}
        disableScrollLock={true}
        sx={{ marginTop: "15px" }}
        PaperProps={{
          sx: {
            ...specialMUIButtonColor,
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

export const specialMUIButtonColor = {
  backgroundColor: "var(--opposit-bg-primary)",
};

export const AppMUISplitButton = React.memo(
  ({ options, selectedValue = options[0]?.value }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const selectedValueIndex = options.findIndex(
      (option) => option?.value === selectedValue
    );

    const [selectedIndex, setSelectedIndex] =
      React.useState(selectedValueIndex);

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    return (
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            ...themeBasedButtonOppositStyle,
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderColor: "var(--bg-primary)",
            },
          }}
        >
          <Button
            sx={{
              ...muiButtonStyle,
              ...muiFontStyle,
              ...popoverButtonTextAlign,
              ...specialMUIButtonColor,
              gap: 1,
            }}
          >
            {options[selectedIndex]?.startIcon}
            {options[selectedIndex]?.key}
          </Button>
          <Button
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            sx={{
              ...muiButtonStyle,
              ...muiFontStyle,
              ...popoverButtonTextAlign,
              ...specialMUIButtonColor,
            }}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
          placement="bottom-start"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "left" ? "right top" : "left top",
              }}
            >
              <Paper
                sx={{
                  mt: 1,
                  ml: 0,
                  ...specialMUIButtonColor,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        type="button"
                        key={option?.key}
                        selected={index === selectedIndex}
                        onClick={(event) => {
                          handleMenuItemClick(event, index);
                          option.onClickFn(option.value);
                        }}
                        sx={{
                          ...muiFontStyle,
                          ...muiButtonStyle,
                          ...popoverButtonTextAlign,
                          gap: 1,
                        }}
                      >
                        <span>{option?.startIcon}</span>
                        <span>{option?.key}</span>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
);

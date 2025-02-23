import "./AppConstant.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigationHistory } from "../context/NavigationProvaider";

const AppConstant = () => {
  const navigate = useNavigate();

  const { navPrevPath } = useNavigationHistory();

  const CancelButton = ({ buttonText = "Cancel" }) => {
    return (
      <button
        // onClick={() => navigate("/")}
        onClick={() => navPrevPath()}
        className="btn custom-btn w-100 text-center rounded-5 px-3"
      >
        {buttonText}
      </button>
    );
  };

  const Button = ({ buttonText = "Ok", onClick, type = "button" }) => {
    return (
      <button
        className="btn custom-btn w-100 text-center rounded-5 px-3"
        type={type}
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  };

  const SubmitButton = ({
    buttonText = "Submit",
    type = "submit",
    isDisable = false,
  }) => {
    return (
      <button
        className="btn custom-btn w-100 text-center rounded-5 px-3"
        type={type}
        disabled={isDisable}
      >
        {buttonText}
      </button>
    );
  };

  return { CancelButton, Button, SubmitButton };
};

export default AppConstant;

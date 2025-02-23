import { TextField } from "@mui/material";

export const TextInputFeild = ({ lable, type, name, value, onChange }) => {
  return (
    <TextField
      label={lable}
      variant="standard"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
    />
  );
};

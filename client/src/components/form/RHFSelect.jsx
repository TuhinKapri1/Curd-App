import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function RHFSelect({
  name,
  control,
  option,
  error,
  helperText,
  label,
  children,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <>
          <FormControl fullWidth error={error}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label={label}
              onChange={onChange}
            >
              {children}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
}

export default RHFSelect;

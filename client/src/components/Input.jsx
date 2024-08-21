import { TextField } from "@mui/material";
import React from "react";
import { useController, useForm } from "react-hook-form";
function Input({ control, name, label, error, helperText, type }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <TextField
      type={type ?? "Text"}
      error={error}
      helperText={helperText}
      sx={{ width: 1 / 1, marginBottom: 2 }}
      label={label}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
    />
  );
}

export default Input;

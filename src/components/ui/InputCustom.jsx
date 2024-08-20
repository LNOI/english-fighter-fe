import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';


export default function InputCustom({
  value,
  onChange,
  placeholder,
  icon,
  position,
  disabled,
  defaultValue,
  required,
  type = "string"
}) {
  let props = {
    startAdornment: icon ? (
      <InputAdornment position="end">{icon}</InputAdornment>
    ) : null
  };
  if (position == 'end') {
    props = {
      endAdornment: icon ? (
        <InputAdornment position="end">{icon}</InputAdornment>
      ) : null
    };
  }
  return (
    <FormControl className="h-full w-full">
      <Input
        disabled={disabled}
        defaultValue = {defaultValue}
        placeholder={placeholder}
        value={value}
        type={type}
        required= {required ? true: false}
        onChange={onChange}
        {...props}
        
      />
    </FormControl>
  );
}

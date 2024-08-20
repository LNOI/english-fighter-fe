import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCustom({
  value,
  menuItem,
  onChangeSelect,
  icon
}) {
  return (
    <FormControl className="h-full w-full">
      <Select
        id="form_select_hydro"
        value={value}
        onChange={onChangeSelect}
      >
        {menuItem?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

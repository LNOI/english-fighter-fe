import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({menuItem,onChange,value}) {
  return (
    <div>        
      <FormControl >
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {menuItem?.map((item,index)=>{
            <MenuItem value={item.value}>
             {item.name}
          </MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

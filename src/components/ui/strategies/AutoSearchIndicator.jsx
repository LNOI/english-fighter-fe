import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DataIndicators } from '@/data/indicator';
export default function AutoSearchIndicator({indicator,onChange  }) {

  const defaultProps = {
    options: DataIndicators,
    getOptionLabel: (option) => option.name,
  };
  return (
    <Autocomplete
      {...defaultProps}
      className="z-10"
      isOptionEqualToValue={(option, value) => option.name === value.name}
      value={indicator}
      onChange={onChange}
      disablePortal
      id="combo-box-indicator"
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Indicator" />}
    />
  );
}

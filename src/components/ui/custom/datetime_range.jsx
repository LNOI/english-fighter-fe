import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
const DatetimePicker = ({ value ,setValue}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker  maxDate={dayjs()} onChange={(e)=>{
                setValue(e)
            }} value={value}  defaultValue={dayjs()}  />
        </LocalizationProvider>
    );
}

export default DatetimePicker;

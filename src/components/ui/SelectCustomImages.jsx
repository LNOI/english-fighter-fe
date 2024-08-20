
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import Image from 'next/image';

export default function SelectCustomImages({menuItem,value, onChange }) {
    return (
    <div>
    <FormControl sx={{ width:"100%" }}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {
            menuItem?.map((item,index)=>{
                return <MenuItem key={index} value={item.value}>
                    <div className='flex flex-row gap-2'>
                    <Image
                            src={item.icon}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt={item.name}
                        />
                        {item.name} 
                    </div>

                </MenuItem>
            })
          }          
        </Select>
      </FormControl>
    </div>
  )
}

'use client';
import * as React from 'react';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { SnackbarProvider, enqueueSnackbar,closeSnackbar } from 'notistack';




export default function StatusCallAPI() {
  const statusAPI = useAppSelector((state) => state.statusAPI);
  React.useEffect(()=>{
    const timeout = setTimeout(()=>{
      closeSnackbar()
    },3000)
    if(statusAPI.status == "SUCCESS"){
        enqueueSnackbar(statusAPI.message,{variant:"success"})

      }else if(statusAPI.status=="FAILURE"){
        //console.log(statusAPI)
        enqueueSnackbar(statusAPI.error,{variant:"error"})
    }
    clearTimeout(timeout)

  },[statusAPI])
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={statusAPI.status === 'WAITING' ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarProvider maxSnack={3}>
      </SnackbarProvider>
    </div>
  );
}

'use client'
import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';

function ComingSoon() {
  const [launchDate, setLaunchDate] = useState(new Date(2024, 7, 7)); // Adjust for your actual launch date (July 20, 2024 in this example)
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const updateTime = ()=>{
    const now = new Date();
    const timeDifference = launchDate.getTime() - now.getTime();
    setDaysLeft(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
    setHoursLeft(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutesLeft(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
    setSecondsLeft(Math.floor((timeDifference % (1000 * 60)) / 1000));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate days, hours, minutes, and seconds remaining
      updateTime()
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () =>{ clearInterval(intervalId)
    };
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-4 text-center py-10">
      <p className='text-balance text-[30px]  md:text-desktop-h1 md:font-bold lg:w-3/4 text-orange-300'>
        We are getting ready to launch new system auto trading bot!
        </p>      
      {daysLeft > 0 && (
        <div className="dark:text-white flex flex-row space-x-8 justify-center items-center ">
          <div className='flex flex-col justify-center items-center'>
              <span className="">{daysLeft}</span>
            <span className='font-bold'>DAYS</span>
          </div>
          <div className='flex flex-col justify-center items-center'>
              <span className="">{hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}</span>
            <span className='font-bold'>HOURS</span>
          </div>
          <div className='flex flex-col justify-center items-center'>
              <span className="">{minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}</span>
            <span className='font-bold'>MINUTES</span>
          </div>
          <div className='flex flex-col justify-center items-center'>
              <span className="">{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</span>
            <span className='font-bold'>SECONDS</span>
          </div>
        </div>
      )}
      {/* <div>
            <FormControl  variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="email"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <ForwardToInboxIcon></ForwardToInboxIcon>
                    </IconButton>
                  </InputAdornment>
                }
                placeholder='Enter your email'
                // label="Password"
              />
            </FormControl>
          </div> */}
    </div>
  );
}

export default  ComingSoon;
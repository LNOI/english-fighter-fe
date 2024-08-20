'use client';
import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style:["italic","normal"]
});

const theme = createTheme({
  palette: {
    // mode: 'dark',
    // background:{
    //   default: "#000"
    // }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  components:{
    MuiButton:{
      variants:[
        {
          props : {variant: 'hydro'},
          style :{
              background: "rgb(103,102,108)",
              backgroundImage: 'linear-gradient(90deg, rgba(103,102,108,1) 0%, rgba(0,0,0,1) 100%)',
              color: "white !important",
              boxShadow: '0px 0px 5px 0px rgb(103,102,108) !important',
              "&:hover":{
                  background: 'rgb(239 68 68)', // Darken the background slightly on hover
                  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)', // Add a subtle shadow on hover
              }
            }
        },
        {
          props : {variant: 'hydro_outline'},
          style :{
              border: "0.1px solid rgb(103,102,108)",  
              "&:hover":{
                background: 'rgb(239 68 68)', // Darken the background slightly on hover
                boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)', // Add a subtle shadow on hover
                
            }
          }
        },
        {
          props : {variant: 'button_banner'},
          style :{
              background: "rgb(103,102,108)",
              backgroundImage: 'linear-gradient(90deg, rgba(103,102,108,1) 0%, rgba(0,0,0,1) 100%)',
              color: "white !important",
              boxShadow: '0px 0px 5px 0px rgb(103,102,108) !important'
          }
        },
      ],
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          backgroundColor: "rgba(0,0,0,.8);",
          backdropFilter: "saturate(0) blur(5px)"
        }
      }
    }
  }

});

export default theme;
'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Image from 'next/image';
import { doLogout, doSocialLogin } from '@/app/actions';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ButtonCustom from '../ui/ButtonCustom';
// import { Link } from '@/navigation';
export default function AccountMenu() {
  const { data: session, status, update } = useSession();
  const [state, formAction] = useFormState(doLogout, undefined);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      {status === 'authenticated' ? (
        <>
          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {/* <p className='text-sm'>{session?.user?.name}</p> */}
                <Image
                  className="rounded-full"
                  alt="avatar"
                  width={40}
                  height={40}
                  src={
                    session?.user?.image
                      ? session?.user?.image
                      : '/icon/avatar.jpg'
                  }
                ></Image>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                bgcolor: '#18181b',

                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem className="" onClick={handleClose}>
              <ListItemIcon>
                <Image
                  className="rounded-full"
                  alt="avatar"
                  width={35}
                  height={35}
                  src={
                    session?.user?.image
                      ? session?.user?.image
                      : '/icon/avatar.jpg'
                  }
                ></Image>
              </ListItemIcon>
              <div className="mx-2 flex flex-col">
                <p className="text-sm">Hi, {session?.user?.name}</p>
                <p className="text-gray-300 text-xs">{session?.user?.email}</p>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SmartToyIcon fontSize="small" />
              </ListItemIcon>
              Your Bot
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ManageHistoryIcon fontSize="small" />
              </ListItemIcon>
              History Backtesting
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <form action={formAction} method="POST">
                <button type="submit">Log out</button>
              </form>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <form action={doSocialLogin}>
            <ButtonCustom
              content={'Sign In'}
              onClick={() => {}}
              type={4}
            ></ButtonCustom>
          </form>
          <form action={doSocialLogin}>
            <ButtonCustom
              content={'Sign Up'}
              onClick={() => {}}
              type={3}
            ></ButtonCustom>
          </form>
        </>
      )}
    </div>
  );
}

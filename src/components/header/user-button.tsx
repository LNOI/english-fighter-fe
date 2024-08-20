'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Icon } from '@mui/material';
import Stack from '@mui/material/Stack';
import AccountMenu from './accountmenu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import ButtonCustom from '../ui/ButtonCustom';
import { useSession } from 'next-auth/react';

const MenuHeaders = [
  { name: 'Backtesting', href: '/backtesting', icon: '#' },
  { name: 'Strategies', href: '/strategies', icon: '#' },
  { name: 'Pricing', href: '#', icon: '#' },
  { name: 'Blog', href: '#', icon: '#' }
];

const itemProfile = [
  { name: 'Dashboard', href: '#', icon: '#' },
  { name: 'Setting', href: '#', icon: '#' },
  { name: 'Earning', href: '#', icon: '#' },
  { name: 'Sign out', href: '#', icon: '#' }
];

interface MenuObject {
  name: string;
  href: string;
  icon: string;
}

function Header() {
  const session = useSession();
  // //console.log(session)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const renderMenuMobile = () => {
    return (
      <>
        <div className="top-15 absolute left-0 -z-10 mb-4 w-full">
          <div className="ml-3 mt-4 flex flex-col items-center justify-center gap-3">
            {MenuHeaders.map((item: MenuObject, index: any) => {
              return (
                <Link
                  className="hover:text-accent-green-primary"
                  key={index}
                  href={item.href}
                >
                  {item.name}
                </Link>
              );
            })}
            <Button
              className="border-defaultrounded-button w-2/4 p-3"
              variant="contained"
            >
              {' '}
              Sign In
            </Button>
            <Button className="w-2/4 rounded-button p-3" variant="outlined">
              {' '}
              Sign In
            </Button>
          </div>
        </div>
      </>
    );
  };

  const renderUserExists = () => {
    return (
      <>
        <div className="flex items-center">
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon fontSize="large"></NotificationsIcon>
          </Badge>
          <AccountMenu></AccountMenu>
        </div>
      </>
    );
  };
  return (
    <div className="static m-auto flex h-auto flex-row justify-between py-12 text-desktop-h6 md:w-5/6 md:items-center">
      <div className="w-36 flex-none">
        <div className="flex items-center md:justify-center">
          <Link href="/">
            <Image
              src="/images/Logo.svg"
              width={50}
              height={50}
              alt="Logo"
              className="ml-2"
            />
          </Link>
          <p className="inline-block">Cryptolly.</p>
        </div>
      </div>
      <nav className="hidden grow justify-center gap-12 md:flex">
        {MenuHeaders.map((item: MenuObject, index: any) => {
          return (
            <Link
              className="hover:text-accent-green-primary"
              key={index}
              href={item.href}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="hidden md:flex">
        {session?.data?.user ? (
          renderUserExists()
        ) : (
          <div className="flex gap-6">
            <Stack spacing={2} direction="row">
              <div className="w-28">
                <Link href="/login">
                  <ButtonCustom
      
                    content={'Sign In'}
                    type={1}
                    onClick={() => {}}
                  ></ButtonCustom>
                </Link>
              </div>
              <div className="w-28">
                <Link href="/register">
                  <ButtonCustom
                  
                    content={'Sign Up'}
                    type={0}
                    onClick={() => {}}
                  ></ButtonCustom>
                </Link>
              </div>
            </Stack>
          </div>
        )}
      </div>

      <div className="block md:hidden">
        <button
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          <Image src="./icon/Menu.svg" height={50} width={50} alt="Menu" />{' '}
        </button>
        {mobileMenuOpen && renderMenuMobile()}
      </div>
    </div>
  );
}

export default Header;

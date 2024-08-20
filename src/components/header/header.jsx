'use client';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import NavLink from './NavLink';
import LocaleSwitcherSelect from '../ui/SelectForeign';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AccountMenu from './accountmenu';
import { useThemeSwitch } from "@/components/Hooks/useThemeSwitch";
import { cx } from '@/utils';
import {  MoonIcon, SunIcon } from "@/components/Icons";
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import { setThemeColor } from '@/lib/features/theme/colorTheme';

const Header = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const [mobile, setMobile] = useState(false);
  const [mode, setMode] = useThemeSwitch();
  const dispatch = useAppDispatch()

  const onClick = () => {
    setMobile(!mobile);
  };

  useEffect(()=>{
    if(mode==="dark"){
      dispatch(setThemeColor({
        is_dark : true
      }))
    }else{
      dispatch(setThemeColor({
        is_dark : false
      }))
    }
  },[mode])

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full 
      flex-col items-center border-b-2 border-b-gray  justify-around 
       shadow-custom backdrop-blur-[1px] backdrop-saturate-0 bg-[rgba(255,255,255,0.8)]
      dark:border-none dark:bg-[rgba(0,0,0,0.95)]  dark:backdrop-blur-[1px] dark:backdrop-saturate-0">
        {/* sticky top-0 z-50 flex h-16 w-full flex-col items-center justify-around bg-[rgba(0,0,0,.8)] shadow-custom backdrop-blur-[1px] backdrop-saturate-0 */}
      <nav className="relative flex w-full max-w-[1400px] flex-1 items-center">
        <div className="flex w-full items-center">
          <div>
            <Link className="flex items-center" href="/">
              <Image
                src="/images/Logo.svg"
                width={48}
                height={48}
                alt="Logo"
              ></Image>
              <span className="font-extrabold dark:text-white">HYGENTRADE</span>
            </Link>
          </div>
          {/* <NavLink></NavLink> */}
          <div className="hidden w-full justify-center md:flex md:flex-row md:space-x-4">
            {/* <RenderNavLink t={t}></RenderNavLink> */}
            <NavLink></NavLink>
          </div>
        </div>
        <div className="hidden flex-row items-center space-x-4 md:flex">
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
              className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
              "bg-light text-dark" )}
              aria-label="theme-switcher"
              >
                  {
                    mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                  }
              </button>
          <LocaleSwitcherSelect defaultValue={locale}></LocaleSwitcherSelect>
          <AccountMenu></AccountMenu>
        </div>

        {/* Responsive for Mobile */}
        <div className="mx-2 md:hidden">
          <AlignHorizontalRightIcon
            onClick={onClick}
          ></AlignHorizontalRightIcon>
        </div>
        {mobile && (
          <div className="absolute top-14 flex w-full flex-col items-center justify-between space-y-2 bg-[rgba(0,0,0,.8)] py-4 shadow-custom backdrop-blur-[1px] backdrop-saturate-0 md:hidden">
            {/* <RenderNavLink></RenderNavLink> */}
            <NavLink></NavLink>
            <div className='flex flex-row w-full justify-center items-center'>
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
              className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
              "bg-light text-dark" )}
              aria-label="theme-switcher"
              >
                  {
                    mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                  }
              </button>
            <LocaleSwitcherSelect defaultValue={locale}></LocaleSwitcherSelect>
            
            </div>
            
            <AccountMenu></AccountMenu>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

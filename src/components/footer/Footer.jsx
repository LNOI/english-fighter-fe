import React from 'react';
import { Link } from '@/navigation';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useTranslations } from 'next-intl';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const navFooter = [
  {
    tag: 'quick_link',
    menu: [
      {
        name: 'config_backtesting',
        href: '/backtesting'
      },
      {
        name: 'subscribe_plan',
        href: '/pricing'
      },
      {
        name: 'tutorial',
        href: '/tutorial'
      }
    ]
  },
  {
    tag: 'company',
    menu: [
      {
        name: 'term',
        href: '/term_of_service'
      },
      {
        name: 'privacy',
        href: '/privacy_policy'
      },
      {
        name: 'disclaimer',
        href: '/disclaimer'
      },
      {
        name: 'blogs',
        href: '/blogs'
      },
      {
        name: 'contact',
        href: '/contact'
      },
      {
        name: 'about',
        href: '/about_us'
      }
    ]
  }
];

function Footer() {
  const t = useTranslations('Footer');

  return (
    <div className="w-full dark:bg-black dark:text-white">
      <div className="m-auto my-4 flex max-w-[1400px] flex-col items-center justify-center space-y-3">
        <div className="flex w-full flex-wrap px-2">
          <div className="flex basis-1/2 flex-col space-y-2 md:basis-1/4 pl-4">
            <div className="flex flex-row items-center justify-start">
              <Image
                src="/images/Logo.svg"
                width={30}
                height={30}
                alt="Logo Icon footer"
              ></Image>
              <p className="inline-block">HygenTrade.</p>
            </div>
            <p className="text-gray-500">{t('description')}</p>
            <div className="mt-2 flex flex-row space-x-3">
              <FacebookIcon className="text-grey-20"></FacebookIcon>
              <InstagramIcon className="text-grey-20"></InstagramIcon>
              <Link href="https://www.linkedin.com/company/103293036">
                <LinkedInIcon className="text-grey-20"></LinkedInIcon>
              </Link>
              <Link href={'https://x.com/LynLoiNhu'}>
                <XIcon className="text-grey-20"></XIcon>
              </Link>
            </div>
          </div>

          {navFooter.map((item, key) => {
            return (
              <div
                key={key}
                className="basis-1/2 flex-col space-x-2 md:basis-1/4 pl-4"
              >
                <p className="text-base font-medium">{t(item.tag)}</p>

                <div className="flex flex-col space-y-2">
                  {item.menu.map((n, key2) => {
                    return (
                      <p key={key2} className="text-sm text-grey-40">
                        {t(n.name)}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="basis-1/2 flex-col space-y-2 md:basis-1/4 pl-4">
            <div className="">
              <p className="text-base font-medium">{t('email_box')}</p>
            </div>
            <div className="flex flex-col space-y-2 text-grey-40">
              <p className="text-sm">{t('email_desc')}</p>
            </div>

            <div>
              <FormControl className="w-5/6" variant="outlined">
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
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <ForwardToInboxIcon></ForwardToInboxIcon>
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          </div>
        </div>
        <Divider className="my-5 w-full bg-gray-600"></Divider>

        <div className="mb-4 flex w-full flex-row justify-between text-sm text-gray-600">
          <div className="">HygenTrade ©. All rights reserved.</div>
          <div className="flex flex-row space-x-3">
            <Link href="/terms_of_service" className="hover:text-gray-400">
              {t('term')}
            </Link>
            <p>|</p>
            <Link href="/privacy_policy" className="hover:text-gray-400">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

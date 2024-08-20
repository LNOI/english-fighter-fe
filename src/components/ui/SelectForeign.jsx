'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

const ForeignCountry = [
  {
    id: 'en',
    name: 'EN',
    icon: '/icon/english.png'
  },
  {
    id: 'vi',
    name: 'VN',
    icon: '/icon/vietnam.png'
  }
];

export default function LocaleSwitcherSelect({ defaultValue }) {
  const router = useRouter();
  const [country, setCountry] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  function onSelectChange(event) {
    const nextLocale = event.target.value;
    startTransition(() => {
      setCountry(nextLocale);
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <FormControl>
      <Select
        disabled={isPending}
        sx={{
          '& fieldset': {
            border: 'none'
          }
        }}
        value={country}
        onChange={onSelectChange}
        displayEmpty
        defaultValue={defaultValue}
        inputProps={{
          'aria-label': 'Without label',
          IconComponent: () => null
        }}
      >
        {ForeignCountry.map((item, index) => {
          return (
            <MenuItem
              // className='text-center'
              key={index}
              value={item.id}
            >
              <Image
                className="min-h-9 min-w-9"
                src={item.icon}
                width={36}
                height={36}
                alt={item.name}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

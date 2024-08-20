'use client';
import React, { useState } from 'react';
import { Chart } from '@/components/chart/Chart';
import Image from 'next/image';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ConfigTrading from '@/components/ui/backtesting/ConfigTrading';

const ItemCoin = [
  { name: 'Bitcoin', pair: 'BTC/USD', icon: '/coin/Bitcoin.png' },
  { name: 'Ether', pair: 'ETH/USD', icon: '/coin/ETH.png' },
  { name: 'BNB', pair: 'BNB/USD', icon: '/coin/BNB.png' }
];

function Page() {
  // const [coin, setCoin] = useState('Bitcoin');
  // const handleChange = (event) => {
  //   setCoin(event.target.value);
  // };

  // const renderSubChart = (title, content, subcontent) => {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-800">
  //       <p className="text-slate-500">{title}</p>
  //       <div className="flex flex-row gap-2">
  //         <p className="font-medium">$ {content}</p>
  //         <p className="text-red-600">{subcontent}</p>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="mx-auto grid w-[98%] grid-flow-row grid-cols-6 grid-rows-6 gap-4">
      <div className="col-span-2 row-span-6 h-full">
        <ConfigTrading></ConfigTrading>
      </div>
      <div className="col-span-4 row-span-5 h-full">
        {/* <Chart></Chart> */}
      </div>
    </div>
  );
}

export default Page;

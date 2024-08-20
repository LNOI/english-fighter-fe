'use client';
import React, { useState } from 'react';
import ButtonCustom from './ButtonCustom';
import SelectCustom from './SelectCustom';
import InputCustom from './InputCustom';
import { ConfigSetting } from '@/data/config';
function ConfigTrading() {
  const [strategies, setStrategies] = useState(10);
  const handleChange = (event) => {
    setStrategies(event.target.value);
  };

  const onClick = () => {};
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2 bg-component-color">
      {ConfigSetting?.map((item, index) => {
        if (item.type == 'select') {
          return (
            <div key={index} className="w-full">
              <p className="text-base text-neutral-300">{item.name}</p>
              <SelectCustom
                value={item.menuItem[0].value}
                menuItem={item.menuItem}
                onChangeSelect={onClick}
              ></SelectCustom>
            </div>
          );
        } else if (item.type == 'input') {
          return (
            <div key={index} className="w-full">
              <p className="text-base text-neutral-300">{item.name}</p>
              <InputCustom
                id={item.id}
                placeholder={item.placeholder}
                icon={item.icon}
              ></InputCustom>
            </div>
          );
        }
      })}
      {/* <div className="w-full">
        <InputCustom id="balance" placeholder="Input balance"></InputCustom>
      </div> */}
      <div className="h-16 w-36">
        <ButtonCustom
          content="Backtesting"
          type={0}
          onClick={onClick}
        ></ButtonCustom>
      </div>
    </div>
  );
}

export default ConfigTrading;

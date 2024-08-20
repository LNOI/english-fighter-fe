'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ButtonCustom from '../ButtonCustom';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import AutoSearchIndicator from '@/components/ui/strategies/AutoSearchIndicator';
import SelectCustom from '../SelectCustom';
import TextField from '@mui/material/TextField';
import IndicatorProperties from '@/components/ui/properties/Indicator'
import GroupProperties from '@/components/ui/properties/Group'

const PropertiesStrategies = ({groupNode}) => {
  const properties = useAppSelector((state) => state.properties);
  return (  
    <div className="flex flex-col">
      {
        properties.type === "node" && <IndicatorProperties></IndicatorProperties>
      }
      {
        properties.type === "group_node" && <GroupProperties groupNode={groupNode}></GroupProperties>
      }
    </div>
  );
};

export default PropertiesStrategies;

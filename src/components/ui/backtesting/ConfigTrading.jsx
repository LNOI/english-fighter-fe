import React, { useEffect, useState } from 'react';
import SelectCustom from '../SelectCustom';
import DateTimePicker from '@/components/ui/custom/datetime_range';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import {
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure,
  updateStatusIdle
} from '@/lib/features/api/statusAPISlice';

import Image from 'next/image';
import { get } from '@/lib/api';
function renderPair(pair) {
  return (
    <div className="flex flex-row">
      <Image
        src={`/coin/${pair}.png`}
        width={25}
        height={25}
        alt="Image coin"
      ></Image>
      <p>{pair}/USDT:USDT</p>
    </div>
  );
}
const list_pair = [
  { id: 'BTC/USDT:USDT', name: renderPair('BTC') },
  { id: 'ETH/USDT:USDT', name: renderPair('ETH') },
  { id: 'BNB/USDT:USDT', name: renderPair('BNB') }
];

const list_timeFrame = [
  { id: '1m', name: '1m' },
  { id: '3m', name: '3m' },
  { id: '5m', name: '5m' },
  { id: '15m', name: '15m' },
  { id: '30m', name: '30m' },
  { id: '45m', name: '45m' },
  { id: '1h', name: '1h' },
  { id: '2h', name: '2h' },
  { id: '3h', name: '3h' },
  { id: '4h', name: '4h' },
  { id: '1d', name: '1d' },
  { id: '1w', name: '1w' }
];

export default function ConfigTrading() {
  const [pair, setPair] = useState('BTC/USDT:USDT');
  const [config, setConfig] = useState([]);
  const [selectConfig, setSelectConfig] = useState(null);
  const [selectStrategies, setSelectStrategies] = useState([]);
  const [strategies, setStrategies] = useState(null);
  const [timeFrame, setTimeFrame] = useState('1h');
  const [timeRange, setTimeRange] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchInitData = async () => {
      dispatch(updateStatusRequest());
      try {
        const data_config = await get(
          '/api/user/00000000-0000-0000-0000-000000000000/config'
        );
        //console.log(data_config)
        setConfig(data_config);
        const data_strategies = await get(
          '/api/user/00000000-0000-0000-0000-000000000000/strategies'
        );
        //console.log(data_strategies)
        setStrategies(data_strategies);
        dispatch(updateStatusIdle());
      } catch (error) {
        dispatch(
          updateStatusFailure({
            error: 'Server failed'
          })
        );
      }
    };
    fetchInitData().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      <strong>Config Backtesting</strong>
      <div className="flex flex-col justify-start space-x-4">
        <p>Pair</p>
        <SelectCustom menuItem={list_pair}></SelectCustom>
      </div>

      <div className="flex flex-col justify-start space-x-4">
        <p>Select Config</p>
        <SelectCustom menuItem={config} value={selectConfig?.id}></SelectCustom>
      </div>

      <div className="flex flex-col justify-start space-x-4">
        <p>Select Strategies</p>
        <SelectCustom
          menuItem={strategies}
          value={selectStrategies?.id}
        ></SelectCustom>
      </div>

      <div className="flex flex-col justify-start space-x-4">
        <p>Time Frame</p>
        <SelectCustom menuItem={list_timeFrame}></SelectCustom>
      </div>
      <div className="flex flex-col justify-start space-x-4">
        <p>Time Range</p>
        <div className="flex flex-row items-center justify-center space-x-2">
          <DateTimePicker
            value={startTime}
            setValue={setStartTime}
          ></DateTimePicker>
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
          <DateTimePicker
            value={endTime}
            setValue={setEndTime}
          ></DateTimePicker>
        </div>
      </div>
    </div>
  );
}

import React, { Suspense } from 'react';
import InputCustom from './InputCustom';
import ButtonCustom from './ButtonCustom';
import SelectCustom from './SelectCustom';
import SelectCustomGroup from './strategies/SelectGroupIndicator';
import EditStrategies from './strategies/EditStrategies';
// import {strategiesData} from '@/data/config'
import { list_strategies, list_indicators } from '@/utils/get-strategies';

// async function StrategiesList(){
//
// }
//

export default async function Strategies() {
  const res = await list_strategies();
  // const [strategies, setStrategies] = useState([])
  const res_indicators = await list_indicators();
  const onClickIndicator = (index) => {
    alert(index);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="text-2xl font-bold">Strategies</p>
      <div className="w-2/5">
        {/* <Suspense fallback={<div>Loading....</div>}>
          <SelectCustom menuItem={res.data}></SelectCustom>
        </Suspense> */}
        {/* <p>Config Strategies</p> */}
        <Suspense fallback={<div>Loading....</div>}>
          {/* <SelectCustomGroup menuItem={res_indicators.data}></SelectCustomGroup> */}
          <EditStrategies></EditStrategies>
        </Suspense>
      </div>
    </div>
  );
}

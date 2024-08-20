'use client';
import React, { useEffect, useState } from 'react';
import ButtonCustom from '../ButtonCustom';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import { setCookie } from '@/lib/handleCookie';
import SelectCustom from '../SelectCustom';
import TextField from '@mui/material/TextField';
import { setCurrentGroupData } from '@/lib/features/group/groupStrategies';

const GroupProperties = ({ groupNode }) => {
  const [value, setValue] = useState(null);
  const properties = useAppSelector((state) => state.properties);
  const dispatch = useAppDispatch();

  const onChangeSelect = (e) => {
    //console.log(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    if (properties.data.id) {
      //console.log(properties);
      setValue(properties.data.id);
    }
  }, [properties]);

  const onCreateNew = () => {
    const new_strategies = {
      id: null,
      name: 'New Group',
      user_id: '00000000-0000-0000-0000-000000000000',
      data: [],
      type: 'GROUP'
    };
    dispatch(setCurrentGroupData(new_strategies));
  };

  const onSaveGroupToNode = () => {
    const selectedGroup = groupNode.find((obj) => obj.id == value);
    selectedGroup.data = JSON.parse(selectedGroup.data);
    //console.log(selectedGroup);
    setCookie(
      properties.key,
      JSON.stringify({
        data: selectedGroup
      }),
      1
    );
    const ele = document.getElementById(properties.key);
    ele.click();
  };

  return (
    <div className="flex flex-col">
      <p className="font-medium">Group </p>
      <SelectCustom
        menuItem={groupNode}
        key={value}
        onChangeSelect={onChangeSelect}
      ></SelectCustom>
      <ButtonCustom
        content={'Create new'}
        onClick={onCreateNew}
        type={4}
      ></ButtonCustom>
      <ButtonCustom
        content={'Save'}
        onClick={onSaveGroupToNode}
        type={3}
      ></ButtonCustom>
    </div>
  );
};

export default GroupProperties;

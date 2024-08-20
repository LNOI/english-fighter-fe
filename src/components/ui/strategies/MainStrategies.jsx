'use client';
import React, { useEffect, useState } from 'react';
import GroupStrategies from './GroupStrategies';
import PropertiesStrategies from './PropertiesStrategies';
import InputCustom from '../InputCustom';
import { setCurrentGroupData } from '@/lib/features/group/groupStrategies';
import EditIcon from '@mui/icons-material/Edit';
import ButtonCustom from '../ButtonCustom';
import { useAppSelector, useAppDispatch } from '@/lib/hook';
import {
  updateStatusRequest,
  updateStatusFailure,
  updateStatusIdle,
  updateStatusSuccess
} from '@/lib/features/api/statusAPISlice';
import { get, post, del, put } from '@/lib/api';
import { useSession } from 'next-auth/react';

const MainStrategies = () => {
  const {data : session, status,update}= useSession()
  const [name, setName] = useState('');
  const [groupNode, setGroupNode] = useState([]);
  const currentGroup = useAppSelector((state) => state.currentGroup);

  const dispatch = useAppDispatch();
  const onChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(currentGroup.name);
  }, [currentGroup.id]);

  useEffect(() => {
    const fetchGroup = async () => {
      if(status=="authenticated"){
        try {
          dispatch(updateStatusRequest());
          const data = await get(
            `/strategy/group/${session.user.id}` 
          );
          //console.log(data);
          setGroupNode(data);
          dispatch(updateStatusIdle());
          // dispatch(updateStatusSuccess())
        } catch (error) {
          dispatch(
            updateStatusFailure({ error: 'Failed when loading the group' })
          );
        }
      }
      
    };
    fetchGroup().catch(console.error);
  }, []);

  const onDeleteGroup = async () => {
    if (currentGroup.id) {
      dispatch(updateStatusRequest());
      try {
        const endpoint =currentGroup.type == 'STRATEGIES' ? "/strategy": '/strategy/group';
         
        await del(
          `${endpoint}/${session.user.id}`+
          currentGroup.id
        );
        dispatch(
          setCurrentGroupData({
            id: null,
            name: '',
            user_name: session.user.id,
            data: [],
            type: currentGroup.type
          })
        );
        dispatch(
          updateStatusSuccess({
            message: `Deleted ${name} successfully!`
          })
        );
      } catch (error) {
        //console.log(error);
        dispatch(
          updateStatusFailure({
            error: `Deleted ${name} failure!`
          })
        );
      }
    }
  };

  const onSaveGroup = async () => {
    if (!currentGroup.id) {
      try {
        dispatch(updateStatusRequest());
        const endpoint =currentGroup.type == 'STRATEGIES' ? "/strategy": '/strategy/group';
        
        const data = await post(
          `${endpoint}/${session.user.id}`,
          {
            name: name,
            data: currentGroup.data
          }
        );
        //console.log(data);
        dispatch(
          setCurrentGroupData({
            id: data.id,
            name: name,
            data: data.data,
            type: currentGroup.type
          })
        );
        dispatch(
          updateStatusSuccess({
            message: `Saved the ${name} successfully!`
          })
        );
      } catch (error) {
        console.log(error)
        dispatch(
          updateStatusFailure({
            error: `Failed when saving ${name}!`
          })
        );
      }
    } else {
    
      dispatch(updateStatusRequest());
      try {
        console.log(currentGroup)
        const endpoint =currentGroup.type == 'STRATEGIES' ? "/strategy": '/strategy/group';
        const data = await put(
          `${endpoint}/${session.user.id}/`+
          currentGroup.id,
          {
            name: name,
            data: currentGroup.data
          }
        );
        dispatch(
          setCurrentGroupData({
            name: name,
            data: data.data,
            type: currentGroup.type
          })
        );
        dispatch(
          updateStatusSuccess({
            message: `Updated the ${name} successfully!`
          })
        );
      } catch (error) {
        dispatch(
          updateStatusFailure({
            error: `Failed when updating ${name}!`
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-row md:w-5/6">
      <div className="flex flex-col md:w-10/12">
        <div className="flex w-full flex-row px-4">
          <div className="flex w-2/4 flex-row items-center justify-center space-x-2">
            <p>{currentGroup.type}</p>
            <InputCustom
              disabled={false}
              placeholder={'Your strategies name here...'}
              value={name}
              onChange={onChange}
              icon={<EditIcon></EditIcon>}
              position={'end'}
            ></InputCustom>
          </div>
          <div className="flex w-full flex-row justify-end">
            <div className="flex w-40 flex-row space-x-2">
              <ButtonCustom
                content={'Delete'}
                onClick={onDeleteGroup}
                type={4}
              ></ButtonCustom>
              <ButtonCustom
                content={'Save'}
                onClick={onSaveGroup}
                type={3}
              ></ButtonCustom>
            </div>
          </div>
        </div>
        <div className="w-full px-4">
          <GroupStrategies></GroupStrategies>
        </div>
      </div>
      <div className="flex-1">
        <PropertiesStrategies groupNode={groupNode}></PropertiesStrategies>
      </div>
    </div>
  );
};

export default MainStrategies;

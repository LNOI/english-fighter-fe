'use client'
import React, { useEffect, useState } from 'react';
import SelectCustom from '../SelectCustom';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import ButtonCustom from '../ButtonCustom';
import {
  setCurrentGroupData,
  setGroupData
} from '@/lib/features/group/groupStrategies';
import {
  updateStatusSuccess,
  updateStatusIdle,
  updateStatusRequest,
  updateStatusFailure
} from '@/lib/features/api/statusAPISlice';
import { get, post } from '@/lib/api';
import { useSession } from 'next-auth/react';

const MenuStrategies = () => {
  const {data:session,  status, update} = useSession()
  
  const [strategies, setStrategies] = useState([]);
  const [group, setGroup] = useState([]);
  const [groupNode, setGroupNode] = useState([]);
  const [currentGroupNode, setCurrentGroupNode] = useState(null);
  const [currentStrategies, setCurrentStrategies] = useState(null);
  const dispatch = useAppDispatch();
  const currentGroup = useAppSelector((state) => state.currentGroup);


  useEffect(() => {
    if (
      currentGroup.id &&
      currentGroup.type == 'STRATEGIES' &&
      !strategies.find((obj) => obj.id == currentGroup.id)
    ) {
      setStrategies([...strategies, currentGroup]);
      setCurrentStrategies(currentGroup.id);
    }

    if (
      currentGroup.id &&
      currentGroup.type === 'GROUP' &&
      !groupNode.find((obj) => obj.id == currentGroup.id)
    ) {
      setGroupNode([...groupNode, currentGroup]);
      setCurrentGroupNode(currentGroup.id);
    }
  }, [currentGroup]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(session)
      if(status==="authenticated"){
        try {
          if(session.user.id){
            const data = await get(
              `/strategy/${session.user.id}`
            );
            if (data.length > 0) {
              setStrategies(data);
              setCurrentStrategies(data[0].id);
              dispatch(
                setCurrentGroupData({
                  ...data[0],
                  type: 'STRATEGIES'
                })
              );
            }
            
            const data_group_node = await get(
              `/strategy/group/${session.user.id}`
            );
            
            if (data_group_node.length > 0) {
              setGroupNode(data_group_node);
            }
          }
         
        } catch (error) {
          dispatch(
            updateStatusFailure({
              error: 'An error occurred from the server.Please try again!'
            })
          );
        }
      }
      
    };
    fetchData().catch(console.error);
  }, [session]);

  const onChangeSelectStrategies = async (event) => {
    setCurrentStrategies(event.target.value);
    try {
      dispatch(updateStatusRequest());
      const data = await get(
        `/strategy/${session.user.id}/` +
          event.target.value
      );
      dispatch(
        setCurrentGroupData({
          ...data,
          type: 'STRATEGIES'
        })
      );
      dispatch(updateStatusIdle());
    } catch (error) {
      //console.log(error);
      dispatch(
        updateStatusFailure({ error: 'Failed when loading the strategy' })
      );
    }
  };

  const onChangeSelectGroup = async (event) => {
    setCurrentGroupNode(event.target.value);
    try {
      dispatch(updateStatusRequest());
      const data = await get(
        `/strategy/group/${session.user.id}/` +
          event.target.value
      );
      dispatch(
        setCurrentGroupData({
          ...data,
          type: 'GROUP'
        })
      );
      dispatch(updateStatusIdle());
    } catch (error) {
      //console.log(error);
      dispatch(
        updateStatusFailure({ error: 'Failed when loading the strategy' })
      );
    }
  };

  const createNewStrategies = () => {
    const new_strategies = {
      id: null,
      name: 'New strategies',
      user_id: session.user.id,
      data: [],
      type: 'STRATEGIES'
    };
    dispatch(setCurrentGroupData(new_strategies));
  };

  const createNewGroup = () => {
    const new_group = {
      id: null,
      name: 'New Group',
      user_id:  session.user.id,
      data: [],
      type: 'GROUP'
    };
    dispatch(setCurrentGroupData(new_group));
  };

  return (
    <div className="h-full md:w-1/6">
      <div className="">
        <p className="">Strategy</p>
        <SelectCustom
          menuItem={strategies}
          value={currentStrategies}
          onChangeSelect={onChangeSelectStrategies}
        ></SelectCustom>
        <ButtonCustom
          onClick={createNewStrategies}
          type={4}
          content={'New strategy'}
        ></ButtonCustom>
      </div>

      <div className="">
        <p className="">Group</p>
        <SelectCustom
          menuItem={groupNode}
          value={currentGroupNode}
          onChangeSelect={onChangeSelectGroup}
        ></SelectCustom>
        <ButtonCustom
          onClick={createNewGroup}
          type={4}
          content={'New group'}
        ></ButtonCustom>
      </div>
    </div>
  );
};

export default MenuStrategies;

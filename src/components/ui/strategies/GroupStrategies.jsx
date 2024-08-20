'use client';
import React, { useState, useRef, useEffect } from 'react';
import Add from './Add';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
// import { setStrategiesData } from '@/lib/features/strategies/currentStrategies';
import { setGroupData } from '@/lib/features/group/groupStrategies';
import { applyProperties } from '@/lib/features/properties/propertiesSlice';
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from '@/lib/handleCookie';

function AddChipComponent({ node, updateNodeData, handleDelete }) {
  const dispatch = useAppDispatch();
  const onClick = () => {
    const d = JSON.parse(getCookie(node.key));
    //console.log(d.data)
    node.label = d.data.name;
    node.data = d.data;
    updateNodeData();
  };
  return (
    <button
      onClick={() => {
        if (node.type === 'operator') {
          node.label = node.label === 'OR' ? 'AND' : 'OR';
          updateNodeData();
        } else {
          // //console.log(node)
          // //console.log(node)
          dispatch(applyProperties(node));
        }
      }}
    >
      <p hidden id={node.key} onClick={onClick}></p>
      <Chip
        color={node.type === 'operator' ? 'secondary' : 'info'}
        variant="outlined"
        label={node.label}
        onDelete={node.type !== 'operator' ? handleDelete(node) : null}
        avatar={node.icon ? <Avatar src={node.icon} /> : null}
      />
    </button>
  );
}

const configIndicatorDefault = {
  group: null,
  display_name: null,
  function_flag: {},
  output_flag: {},
  output_names: [],
  parameter: {},
  id: null
};

const GroupStrategies = () => {
  const [nodeData, setNodeData] = useState([]);
  const currentGroup = useAppSelector((state) => state.currentGroup);
  const dispatch = useAppDispatch();
  const handleDelete = (nodeToDelete) => () => {
    let new_nodes = [];
    if (nodeToDelete.key === nodeData[0].key && nodeData.length > 2) {
      new_nodes = nodeData.slice(2);
      setNodeData(new_nodes);
      return;
    }
    new_nodes = nodeData.filter((node) => node.key !== nodeToDelete.key);
    if (nodeToDelete.prevNode) {
      new_nodes = new_nodes.filter(
        (node) => node.key !== nodeToDelete.prevNode
      );
    }
    setNodeData(new_nodes);
  };

  useEffect(() => {
    try {
      setNodeData(JSON.parse(JSON.stringify(currentGroup.data)));
    } catch (error) {
      //console.log(error)
    }
  }, [currentGroup.id]);

  useEffect(() => {
    if (nodeData.length > 0) {
      dispatch(setGroupData({ data: JSON.parse(JSON.stringify(nodeData)) }));
    }
  }, [nodeData]);

  const handClick = (data) => {
    // alert(data.label);
  };

  const updateNodeData = () => {
    setNodeData((prevItem) => {
      const newNodeData = [...nodeData];
      return newNodeData;
    });
  };

  const appendNewTye = (type) => {
    let type_view = '/icon/indicator.png';
    if (type === 'group_node') {
      type_view = '/icon/group.png';
    }
    const add_node = [];
    if (nodeData.length > 0) {
      const prevNode = uuidv4();
      add_node.push({
        key: prevNode,
        data: {},
        icon: '',
        label: 'OR',
        type: 'operator',
        prevNode: null,
        nextNode: null
      });
      add_node.push({
        key: uuidv4(),
        data: configIndicatorDefault,
        icon: type_view,
        label: 'No Select',
        type: type,
        prevNode: prevNode,
        nextNode: null
      });
    } else {
      add_node.push({
        key: uuidv4(),
        data: configIndicatorDefault,
        icon: type_view,
        label: 'No Select',
        type: type,
        prevNode: null,
        nextNode: null
      });
    }
    setNodeData((prevItem) => [...prevItem, ...add_node]);
  };

  return (
    <div className="mt-8 flex w-full flex-wrap items-center">
      {nodeData?.map((item, index) => {
        return (
          <AddChipComponent
            key={index}
            node={item}
            handleDelete={handleDelete}
            updateNodeData={updateNodeData}
          ></AddChipComponent>
        );
      })}
      <div className="relative">
        <Add onSelect={appendNewTye}></Add>
      </div>
    </div>
  );
};

export default GroupStrategies;

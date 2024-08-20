'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Image from 'next/image';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(-4),
    left: theme.spacing(2),
  }
}));

const actions = [
  {
    icon: (
      <Image
        src="/icon/indicator.png"
        height={50}
        width={50}
        alt="Image Indicator"
      />
    ),
    name: 'Indicator',
    id: 'node'
  },
  {
    icon: (
      <Image
        src="/icon/group.png"
        height={50}
        width={50}
        alt="Image Group Indicator"
      />
    ),
    name: 'Group Indicator',
    id: 'group_node'
  }
];

export default function Add({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction={'down'}
          onClose={handleClose}
          onOpen={handleOpen}   
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => {
                onSelect(action.id);
                handleClose();
              }}
            />
          ))}
        </StyledSpeedDial>
  );
}

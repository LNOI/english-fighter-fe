'use client';
import React from 'react';
import Button from '@mui/material/Button';

const variant = ['contained', 'outlined', 'text', 'hydro', 'hydro_outline'];

export default function ButtonCustom({ content, type, onClick }) {
  return (
    <Button
      className="text-nowrap rounded-[12px] dark:text-white normal-case not-italic"
      variant={variant[type]}
      onClick={onClick}
      aria-atomic
      type='submit'
    >
      {content}
    </Button>
  );
}

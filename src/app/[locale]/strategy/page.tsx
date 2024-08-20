'use client';
import React, { useState } from 'react';
import MainStrategies from '@/components/ui/strategies/MainStrategies';
import MenuStrategies from '@/components/ui/strategies/MenuStrategies';

export default function PageStrategies() {
  return (
    <div className="flex min-h-full w-full flex-row divide-x divide-gray-500">
      {/* {
        status=="unauthenticated" ?  <NeedAuthenticaton></NeedAuthenticaton> : <Strategies></Strategies>
      } */}
      <MenuStrategies></MenuStrategies>
      <MainStrategies></MainStrategies>
    </div>
  );
}

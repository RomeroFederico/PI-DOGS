import React from 'react';
import Menu from './components/Menu/Menu';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}
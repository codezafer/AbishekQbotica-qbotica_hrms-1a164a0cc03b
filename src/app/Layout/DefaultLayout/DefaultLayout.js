import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { hasSession } from '../../../utils/sessionUtils';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const DefaultLayout = ({ getMasterData }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!hasSession()) {
      navigate('/auth/login');
    } else {
      getMasterData()
    }
  }, []);

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar/>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );

}

export default DefaultLayout;
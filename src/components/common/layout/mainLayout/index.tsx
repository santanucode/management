import React, { useState } from 'react';
import Header from '../header';
import SideNav from '../sidebar/index';
import '../style.scss';
import { useSelector } from 'react-redux';

interface Props {
  children: React.ReactNode
}

function MainLayout(props: Props) {

  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value: any) => {
      setToggled(value);
  };
  const functions = useSelector((state: any) => state.userLogin.role_function)

  return (
    <div>
      <div className="main-layout" style={{ display: 'flex' }}>
        <SideNav toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
        <div className="w-100 osl-main-body">
          <Header toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
          <div className="body-container" style={{ position: 'relative' }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

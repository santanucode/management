import React, { useEffect, useState } from 'react'
import '../style.scss'
import mainLOGO from '../../../../assets/images/OSL-Logo.svg'
import { Link, useLocation } from 'react-router-dom'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { TextalignLeft, TextalignRight } from 'iconsax-react'
import { MenuItsmsList } from './menuList'
import { HomeSideBarProps } from './container/menuListContainer'
import { useSelector } from 'react-redux'

const SideNav = ({ toggled, handleToggleSidebar, children, type }: any, props: HomeSideBarProps) => {
  
  const {
    // getRoleFuncn,
    role_function
  } = props
  
 
  

  const [url, setUrl] = useState<string>('')
  const location = useLocation()
  const [menuCollapse, setMenuCollapse] = useState(false)
  // const { toggleSidebar } = useProSidebar();
  
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }
  const functions = useSelector((state: any) => state.userLogin.role_function)
  
  useEffect(() => {
    setUrl(location.pathname)
  }, [location])

  // useEffect(() => {
  //   getRoleFuncn()
  // }, [])

  console.log("role_functionooooooooo", role_function)
  

  // const handleClickScroll = () => {
  //   const element = document.getElementById('section-1');
  //   if (element) {
  //     // 👇 Will scroll smoothly to the top of the next section
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   // alert("hii")

  // };

  const MenuItemComponent = (item: any, index: number) => {
    
    const hasSubItems = item?.sublist?.filter((subItem: { keyname: keyof SideBarMainDTO}) => {
      const showSubMenu = sidebarMain.hasOwnProperty(subItem.keyname) ? sidebarMain[`${subItem.keyname}`] : true;
      return showSubMenu && subItem;
    })
      
    return item.sublist ? (
      // <span onClick={handleClickScroll}>
      hasSubItems.length ? <SubMenu title={item.name} icon={item.icon} key={index} >
        {item.sublist.map((subItem: { keyname: keyof SideBarMainDTO, id: string, icon: any, route: string, name: string }) => {
          const showSubMenu = sidebarMain.hasOwnProperty(subItem.keyname) ? sidebarMain[`${subItem.keyname}`] : true
          return showSubMenu ? <MenuItem
              key={subItem.id}
              icon={subItem.icon}
              className={
                'underline' +
                (url === subItem.route
                  ? ' custom-nav-active-sub'
                  : '')
              }
              // style={{ color: '#535961' }}
            >
              <Link
                 
                to={{ pathname: subItem.route }}
                className={
                  'underline' +
                  (url === subItem.route
                    ? ' custom-nav-active-sub'
                    : '')
                }
                style={{ color: '#535961' }}
              >
                {subItem.name}
              </Link>
            </MenuItem> : null
        })}
        </SubMenu>  : null   
    ) : (
        <MenuItem
        key={item.id}
          icon={url !== item.route ? item.icon : item.iconActive}
          
        className={
          'underline' +
          (url === item.route ? ' custom-nav-activer' : '')
        }
      >
          <Link
            to={{ pathname: item.route }}
            
          className={
            'underline' +
            (url === item.route ? ' custom-nav-active' : '')
          }
          style={{ color: '#535961' }}
        >
          {item.name}
        </Link>
        </MenuItem>
        
    )
  }
  interface SideBarMainDTO {
    bank: boolean;
    group: boolean;
    operation: boolean;
    operationcategory: boolean;
    staff: boolean;
    material: boolean;
    incentive: boolean;
    holiday: boolean;
    shift: boolean;
    holidayconfig: boolean;
    attendance: boolean;
    worklog: boolean
    revisepf: boolean,
    revisesi: boolean,
    wage: boolean,
    attendancereport: boolean,
    epfreport: boolean,
    esireport: boolean,
    bankstatement: boolean,
    wageslip: boolean,
    mustorrole: boolean,
    users: boolean,
    role: boolean,
    rolefunctionmap:boolean
  }
  const sidebarMain:SideBarMainDTO = {
    bank: functions?.Bank?.Get_All_Bank_Details? true :false,
    group: functions?.Group.Get_All_Group_Details ? true : false,
    operation: functions?.Operation.Get_All_Operation ? true : false,
    operationcategory: functions?.OperationCatagory.Get_All_Operation_Catagory ? true : false,
    staff: functions?.Staff.Update_Staff_Detail ? true : false,
    material: functions?.Material.Get_All_Material_Details ? true : false,
    incentive:functions?.Incentive.Get_All_Incentive_Details ? true : false,
    holiday: functions?.Holiday.Get_All_Holiday_Details ? true : false,
    shift: functions?.Shift.Get_All_Shift_Details ? true : false,
    holidayconfig:functions?.HolidayConfig.Get_All_Holiday_Configuration_Details ? true:false,
    attendance: functions?.Attendance.Get_All_Attendance_Details ? true : false,
    worklog: functions?.Worklog.Get_All_Worklog_Details ? true : false,
    wage:functions?.WageComponent.Get_All_Wage_Component_Details ? true:false,
    revisepf:functions?.WageEPF.Get_All_Wage_EPF_Details ? true : false,
    revisesi: functions?.WageESI.Get_All_Wage_ESI_Details ? true : false,

    attendancereport: functions?.Report.GetAllAttendanceReport ? true : false,
    epfreport: functions?.Report.getAllEpfReports ? true : false,
    esireport: functions?.Report.getAllEsiReports ? true : false,
    bankstatement: functions?.Report.GetAllBankReport ? true : false,
    wageslip: functions?.Report.GetAllSalarySlipReport ? true : false,
    mustorrole: functions?.Report.GetAllMusterReport ? true : false,

    users:functions?.User.Get_All_Users_Detail ? true:false,
    role: functions?.Role.Get_All_Role_Details ? true : false,
    rolefunctionmap: functions?.User.MapUserRole ? true : false
    
  }

  return (
    <div>
      <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        collapsed={menuCollapse}
        className="prosidebar-custom"
      >
        <SidebarHeader>
          <div className="logotext text-center" style={{ padding: '35px 0' }}>
            {menuCollapse ? (
              <img src={mainLOGO} style={{ width: '50px' }} alt="" />
            ) : (
              <img src={mainLOGO} alt="" />
            )}
          </div>
          <div className="collapse_toggle">
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <TextalignLeft
                  style={{ cursor: 'pointer' }}
                  size="22"
                  color="#000"
                  variant="Bold"
                />
              ) : (
                <TextalignRight
                  style={{ cursor: 'pointer' }}
                  size="22"
                  color="#000"
                  variant="Bold"
                />
              )}
            </div>

      
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <>
              {MenuItsmsList.map((item: { keyname: keyof SideBarMainDTO }, index: number) => {
                return sidebarMain.hasOwnProperty(item.keyname) ? (sidebarMain[`${item.keyname}`] ? MenuItemComponent(item, Math.random()+1) : null) : MenuItemComponent(item, Math.random()+2)
              })}

              {/* {MenuItsmsList.map((e: any) =>e.sublist ?  e.sublist.map((item: { keyname: keyof SideBarMainDTO }, index: number) => {
                console.log("item",sidebarMain[`${item.keyname}`])
                return sidebarMain.hasOwnProperty(item.keyname) ? (sidebarMain[`${item.keyname}`] ? MenuItemComponent(item, Math.random()+3) : null) : MenuItemComponent(item, Math.random()+4)
              }):null)} */}
              
            </>
          </Menu>

          
        </SidebarContent>
      </ProSidebar>

      


    </div>

    
  )
}

export default SideNav

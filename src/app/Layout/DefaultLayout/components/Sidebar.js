import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';

const Sidebar = () => {


  const [isSideMenu, setSideMenu] = useState("")
  const [level2Menu, setLevel2Menu] = useState("")
  const [level3Menu, setLevel3Menu] = useState("")

  const toggleSidebar = (value) => {
    // console.log (value);
    setSideMenu(value);

  }

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value)
  }
  const toggleLevelThree = (value) => {
    setLevel3Menu(value)
  }

  return (
    <div className="sidebar" id="sidebar">
      <Scrollbar
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Administration</span>
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "jobs" ? "subdrop" : ""} onClick={() => toggleSidebar(isSideMenu == "jobs" ? "" : "jobs")}><i className="la la-briefcase" /> <span> Jobs </span> <span className="menu-arrow" /></a>
                {isSideMenu == "jobs" ?
                  <ul>
                    <li><Link 
                    // className={'/manage-jobs' ? "active" : ""} 
                    to="jobs"
                    > Manage Jobs </Link></li>
                    <li><Link 
                    // className={'/candidates' ? "active" : ""} 
                    to="candidates"
                    > Candidates List </Link></li>
                    <li><Link 
                    // className={'/manage-resumes' ? "active" : ""} 
                    to="manage-resumes"
                    > Manage Resumes </Link></li>
                    {/* <li><Link className={pathname.includes('shortlist-candidates') ? "active" : ""} to="/app/administrator/shortlist-candidates"> Shortlist Candidates </Link></li> */}
                  </ul>
                  : ""
                }
              </li>
              <li>
                {/* <Link to="/settings/companysetting"><i className="la la-cog" /> <span>Settings</span></Link> */}
              </li>
            </ul>
          </div>
        </div>
      </Scrollbar>
    </div>

  );

}

export default Sidebar;

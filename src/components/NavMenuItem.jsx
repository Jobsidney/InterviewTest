import React from 'react'
import {  MenuItem} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
function NavMenuItem({title,link,cssIcon,primaryText}) {
  return (
    <MenuItem component={<Link to={link} />}> 
    <a href="" className={primaryText? `text-primary fw-bold`:'waves-effect'}>
                    {cssIcon?<i className={`bx ${cssIcon}`}></i>:""}
                    <span key="t-utility">{title}</span>
                </a>
    </MenuItem>
  )
}

export default NavMenuItem

import React from "react";
import { Link } from "react-router-dom";
import {
  FaRegUserCircle,
  FaHeart,
  FaMapMarkedAlt,
  FaPencilAlt,
  FaUsersCog,
} from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsCalendarFill, BsGearFill } from "react-icons/bs";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "../styles/components/Aside.scss";

function Aside() {
  return (
    <div className="Aside">
      <ProSidebar collapsed={true}>
        <SidebarHeader>
          <Menu iconShape="circle" className="Logo">
            <MenuItem icon={<FcCalendar />}>
              <Link to="/Landing" />
            </MenuItem>
            <div className="SepMenu"></div>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu>
            <MenuItem icon={<FaRegUserCircle />}>
              <Link to="/Login" />
            </MenuItem>

            <MenuItem icon={<FaMapMarkedAlt />}>
              <Link to="/" />
            </MenuItem>

            <MenuItem icon={<FaHeart />}>
              <Link to="/Favorites" />
            </MenuItem>

            <MenuItem icon={<FaPencilAlt />}>
              <Link to="/Rating" />
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu>
            <MenuItem icon={<FaUsersCog />}>
              <Link to="/Users" />
            </MenuItem>

            <MenuItem icon={<BsCalendarFill />}>
              <Link to="/Events" />
            </MenuItem>

            <MenuItem icon={<BsGearFill />}>
              <Link to="/preferences" />
            </MenuItem>

            <MenuItem icon={<RiLogoutBoxLine />}>
              <Link to="/" />
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Aside;

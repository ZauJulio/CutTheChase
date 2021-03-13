import React from "react";
import Link from "next/link";
import {
  FaHeart,
  FaMapMarkedAlt,
  FaPencilAlt,
  FaUsersCog,
  FaUserAlt,
} from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsCalendarFill, BsGearFill } from "react-icons/bs";

import styles from "../styles/components/Aside.module.scss";

function Aside() {
  return (
    <aside className={styles.asideContainer}>
      <header className={styles.sideBarHeader}>
        <div className={styles.logo}>
          <Link href="/Landing">
            <FcCalendar/>
          </Link>
        </div>
        <div className={styles.sepMenu} />
      </header>
      <div className={styles.sidebarContent}>
        <main className={styles.sideBarMain}>
          <Link href="/Login">
            <FaUserAlt />
          </Link>
          <Link href="/">
            <FaMapMarkedAlt />
          </Link>
          <Link href="/Favorites">
            <FaHeart />
          </Link>
          <Link href="/Rating">
            <FaPencilAlt />
          </Link>
        </main>
        <footer className={styles.sideBarFooter}>
          <Link href="/Users">
            <FaUsersCog />
          </Link>
          <Link href="/Events">
            <BsCalendarFill />
          </Link>
          <Link href="/preferences">
            <BsGearFill />
          </Link>
          <div className={styles.sideBarlogOut}>
            <Link href="/">
              <RiLogoutBoxLine />
            </Link>
          </div>
        </footer>
      </div>
    </aside>
  );
}

export default Aside;

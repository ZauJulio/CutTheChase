import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import { FaMapMarkedAlt, FaUsersCog, FaUserAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsCalendarFill, BsGearFill } from "react-icons/bs";

import styles from "../styles/components/Aside.module.scss";

function Aside({ router }) {
  const logged = true;
  let role = "admin";

  return (
    <aside className={styles.asideContainer}>
      <header className={styles.sideBarHeader}>
        <div className={styles.logo}>
          <Link href="/Landing">
            <FcCalendar />
          </Link>
        </div>
        <div className={styles.sepMenu} />
      </header>

      <div className={styles.sidebarContent}>
        <Link href="/api/auth/signin">
          <FaUserAlt />
        </Link>

        {router.pathname !== "/" && (
          <Link href="/">
            <FaMapMarkedAlt />
          </Link>
        )}

        {role === "admin" && (
          <Link href="/Users">
            <FaUsersCog />
          </Link>
        )}

        {(role === "promotor" || role === "admin") && (
          <Link href="/Events">
            <BsCalendarFill />
          </Link>
        )}

        <Link href="/preferences">
          <BsGearFill />
        </Link>

        {logged === true && (
          <Link href="/">
            <RiLogoutCircleLine />
          </Link>
        )}
      </div>
    </aside>
  );
}

export default withRouter(Aside);

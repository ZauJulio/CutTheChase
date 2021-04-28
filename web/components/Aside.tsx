import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

import { FaMapMarkedAlt, FaUsersCog, FaUserAlt } from "react-icons/fa";
import { FcCalendar } from "react-icons/fc";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsCalendarFill, BsGearFill } from "react-icons/bs";

import styles from "../styles/components/Aside.module.scss";

function Aside({ router }) {
  const [session] = useSession();
  let role = "admin";

  function selected(path: string) {
    if (router.pathname == path) return styles.selected;
    else return "";
  }

  return (
    <aside className={styles.asideContainer}>
      <header className={styles.sideBarHeader}>
        <div className={styles.logo}>
          <Link href="/Landing">
            <div>
              <FcCalendar />
            </div>
          </Link>
        </div>
        <div className={styles.sepMenu} />
      </header>

      <div className={styles.sidebarContent}>
        <div onClick={() => signIn()}>
          {session && session.user.image ? (
            <img
              className={styles.userImage}
              src={session.user.image}
              alt="user"
            />
          ) : (
            <FaUserAlt />
          )}
        </div>

        <Link href="/">
          <div className={selected("/")}>
            <FaMapMarkedAlt />
          </div>
        </Link>

        {role === "admin" && (
          <Link href="/Users">
            <div className={selected("/users")}>
              <FaUsersCog />
            </div>
          </Link>
        )}

        {(role === "promotor" || role === "admin") && (
          <Link href="/events">
            <div className={selected("/events")}>
              <BsCalendarFill />
            </div>
          </Link>
        )}

        <Link href="/preferences">
          <div className={selected("/preferences")}>
            <BsGearFill />
          </div>
        </Link>

        {session && (
          <Link href="/">
            <div onClick={() => signOut()}>
              <RiLogoutCircleLine />
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}

export default withRouter(Aside);

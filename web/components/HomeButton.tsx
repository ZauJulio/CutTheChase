import React from "react";
import Link from "next/link";
import { FcCalendar } from "react-icons/fc";

export default function HomeButton() {
  return (
    <Link href="/Landing">
      <>
        <FcCalendar />
      </>
    </Link>
  );
}

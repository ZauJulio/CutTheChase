import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeButton() {
  return (
    <Link href="/Landing">
      <>
        <Image
          src="/favicon.svg"
          alt="Picture of the author"
          width={70}
          height={70}
        />
      </>
    </Link>
  );
}

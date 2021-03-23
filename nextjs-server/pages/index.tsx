import Head from "next/head";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Cut The Chase - API</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cut The Chase - API</h1>
      </main>
    </div>
  );
}

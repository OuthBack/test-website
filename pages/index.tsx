import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("./admin");
    }, [router]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}></main>
        </div>
    );
}

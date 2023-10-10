import { Header } from "src/components/Header";
import styles from "src/styles/Home.module.css";
import { Top } from "src/components/Top";
import { useEffect } from "react";
import { useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { authCheck } from "src/util/authCheck";
import { GetServerSidePropsContext, NextPage } from "next";



const Home: NextPage = () => {
    const { isLoggedIn, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoading, isLoggedIn, router]);

    return (
        <div className={styles.container}>
            <Header />
            <Top />
        </div>
    );
}

export default Home

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await authCheck(context);
}

import { Header } from "src/components/Header";
import styles from "src/styles/Home.module.css";
import { GetServerSidePropsContext } from "next";
import { Top } from "src/components/Top";
import { authCheck } from "src/util/authCheck";


export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Top />
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await authCheck(context);
}

import { Header } from "src/components/Header";
import styles from "src/styles/Home.module.css";
import { useEffect } from "react";
import { MediaRenderer, useAddress, useContract, useOwnedNFTs, useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next";
import { authCheck } from "src/util/authCheck";
import { contractAddress } from "const/yourDetails";



const Profile: NextPage = () => {
    const { isLoggedIn, isLoading } = useUser();
    const router = useRouter();
    const { contract } = useContract(contractAddress);
    const address = useAddress()
    const { data: nfts } = useOwnedNFTs(contract, address);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoading, isLoggedIn, router]);

    return (
        <div className={styles.container}>
            <Header />
            <h1>My NFT</h1>
            <div className={styles.nft}>

                {/* <MediaRenderer
                            src={contractMetadata.image}
                            alt={contractMetadata.name}
                            width="70px"
                            height="70px"
                        />
                        <div className={styles.nftDetails}> */}

                <div>{nfts?.map((nft) => (

                    <div key={nft.owner}>
                        <MediaRenderer
                            src={nft.metadata.image}
                            width="280px"
                            height="280px"
                        />
                    </div>
                )

                )}</div>
            </div>
        </div>

    );
}

export default Profile

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await authCheck(context);
}

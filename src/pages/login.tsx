import {
    ConnectWallet,
    MediaRenderer,
    useContract,
    useContractMetadata,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "auth.config";
import { contractAddress } from "const/yourDetails";
import { Header } from "src/components/Header";
import styles from "src/styles/Home.module.css";
import checkBalance from "src/util/checkBalance";
import { GetServerSidePropsContext, NextPage } from "next";
import sdk from 'src/util/initializeSdk';

type LoginProps = {
    address: string
};

const Login: NextPage<LoginProps> = ({ address }) => {
    const { contract } = useContract(contractAddress);
    const { data: contractMetadata, isLoading: contractLoading } =
        useContractMetadata(contract);
    const { data: nfts } = useOwnedNFTs(contract, address);
    const router = useRouter();

    useEffect(() => {
        if (nfts?.length) {
            router.push("/");
        }
    }, [nfts, router]);

    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.heading}>NFT Gated Content </h2>
            <h1 className={styles.h1}>Auth</h1>

            <p className={styles.explain}>
                Serve exclusive content to users who own an NFT from <br />
                your collection, using{" "}
                <a
                    className={styles.link}
                    href="https://portal.thirdweb.com/auth"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Auth
                </a>
                .{" "}
            </p>

            <div className={styles.card}>
                <h3>Holder exclusive</h3>
                <p>To unlock this product, you need:</p>

                {contractMetadata && (
                    <div className={styles.nft}>
                        <MediaRenderer
                            src={contractMetadata.image}
                            alt={contractMetadata.name}
                            width="70px"
                            height="70px"
                        />
                        <div className={styles.nftDetails}>
                            <h4>{contractMetadata.name}</h4>
                            <p>{contractMetadata.description?.substring(0, 100)}...</p>
                        </div>
                    </div>
                )}
                {contractLoading && <p>Loading...</p>}

                <ConnectWallet theme="dark" className={styles.connect} />
            </div>
        </div>
    );
}

export default Login

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = await getUser(context.req);

    if (!user) {
        return {
            props: {},
        };
    }

    // Check to see if the user has an NFT
    const hasNft = await checkBalance(sdk, user.address);

    // If they have an NFT, redirect them to the home page
    if (hasNft) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // Finally, return the props
    return {
        props: { address: user.address },
    };
}

import {
    ConnectWallet,
    MediaRenderer,
    useContract,
    useContractMetadata,
    useUser,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { contractAddress } from "const/yourDetails";
import styles from "src/styles/Home.module.css";


export const Top = () => {
    const { contract } = useContract(contractAddress);
    const { data: contractMetadata, isLoading: contractLoading } =
        useContractMetadata(contract);

    return (<div>
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
            <h3>Exclusive unlocked</h3>
            <p>Your NFT unlocked access to this product.</p>

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
                        <p>{contractMetadata.description}</p>
                    </div>
                </div>
            )}
            {contractLoading && <p>Loading...</p>}

            <ConnectWallet theme="dark" className={styles.connect} />
        </div>
    </div>);
}


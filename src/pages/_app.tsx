import { ThirdwebProvider, metamaskWallet, rainbowWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import { domainName } from "../../const/yourDetails";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { AppProps } from "next/app";

// This is the chain your dApp will work on.
const activeChain = Sepolia

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
    >
      <Head>
        <title>diagonal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn how to use the thirdweb Auth SDK to create an NFT Gated Website"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

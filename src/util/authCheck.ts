import { GetServerSidePropsContext } from "next";
import { getUser } from "auth.config";
import checkBalance from "./checkBalance";
import sdk from './initializeSdk';

export async function authCheck(context: GetServerSidePropsContext) {
    const user = await getUser(context.req);
    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const secretKey = process.env.TW_SECRET_KEY;
    if (!secretKey) {
        console.error("Missing env var: TW_SECRET_KEY");
        throw new Error("Missing env var: TW_SECRET_KEY");
    }

    const PRIVATE_KEY = process.env.THIRDWEB_AUTH_PRIVATE_KEY;
    if (!PRIVATE_KEY) {
        throw new Error("You need to add an PRIVATE_KEY environment variable.");
    }

    const hasNft = await checkBalance(sdk, user.address);
    if (!hasNft) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},  // or return user info or other necessary data
    };
}

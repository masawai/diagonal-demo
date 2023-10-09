import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { getDefaultProvider, Wallet } from 'ethers';

// 環境変数が取得できてとれているか確認
if (!process.env.THIRDWEB_AUTH_PRIVATE_KEY || process.env.THIRDWEB_AUTH_PRIVATE_KEY === '') {
    console.log('Private key not found.');
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === '') {
    console.log('Alchemy API URL not found.');
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === '') {
    console.log('Wallet Address not found.');
}

const wallet = new Wallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY!, getDefaultProvider(process.env.ALCHEMY_API_URL))

const sdk = new ThirdwebSDK(
    wallet,
    {
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
        secretKey: process.env.TW_SECRET_KEY,
    },
);

// ここでスクリプトを実行
(async () => {
    try {
        if (!sdk || !('getSigner' in sdk)) return;
        const address = await sdk.getSigner()?.getAddress();
        console.log('SDK initialized by address:', address);
    } catch (err) {
        console.error('Failed to get apps from the sdk', err);
        process.exit(1);
    }
})();

// 初期化した sdk を他のスクリプトで再利用できるように export
export default sdk;

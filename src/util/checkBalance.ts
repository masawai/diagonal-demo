import { ThirdwebSDK, detectFeatures } from "@thirdweb-dev/sdk";
import {
  contractAddress,
  minimumBalance,
} from "const/yourDetails";

export default async function checkBalance(sdk: ThirdwebSDK, address: string) {
  const contract = await sdk.getContract(
    contractAddress,
    'nft-collection'
  );

  let balance;

  const features = detectFeatures(contract.abi);
  if (features?.ERC721?.enabled) {
    balance = await contract.erc721.balanceOf(address);
  }

  // gte = greater than or equal to
  return balance?.gte(minimumBalance);
}

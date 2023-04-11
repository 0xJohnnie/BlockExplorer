import { Network, Alchemy, Utils } from 'alchemy-sdk';
import { getAddress } from 'viem';

const config = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(config);

export const getValidAddress = (address: string) => {
  return address.endsWith(`.eth`) ? address : getAddress(address);
};

export const toEther = (value: any, decimalPoint?: number) => {
  return value > 0
    ? Number(parseFloat(Utils.formatEther(value)).toFixed(decimalPoint || 3))
    : 0;
};

export const getBlockNumber = () => alchemy.core.getBlockNumber();
export const getNativeBalance = async (address: string, blockTag?: string) => {
  try {
    const add = getValidAddress(address);
    return toEther(await alchemy.core.getBalance(add, blockTag));
  } catch (e) {
    switch (true) {
      case /ENS/.test(e):
        console.log(`• ENS name not configured`);

      case /InvalidAddressError/.test(e):
        console.log(`• Address is invalid`);

      default:
        console.error('err', e);
    }
    return -1;
  }
};

export const getTokenBalance = async (address: string) => {
  try {
    const add = getValidAddress(address);
    return (await alchemy.core.getTokenBalances(add)).tokenBalances;
  } catch (e) {
    console.error('err', e);
    return null;
  }
};

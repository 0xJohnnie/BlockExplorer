import { TokenMetadataResponse } from 'alchemy-sdk';

export interface TokenBal {
  [x: string]: any;
  token?: {
    tokenValue: string;
    tokenDetails: TokenMetadataResponse;
  };
}

export interface TokenBalMap {
  [key: string]: TokenBal;
}

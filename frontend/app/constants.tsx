
export const ARBTRUM_SEPOLIA_USDC_CONTRACT_ADDRESS = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
export const EHT_SEPOLIA_USDC_CONTRACT_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
export const BASE_SEPOLIA_USDC_CONTRACT_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
export const BASE_SEPOLIA_CCTP_TOKEN_MESSENGER = '0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA'
export const ETH_SEPOLIA_TRANSFER_HOOK = '0x8E56E6208F6b5C9F0a81Be2528CE786932947b89'
export const ETH_SEPOLIA_TOKEN_MESSENGER = '0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa'
export const ANY_CALLER = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const MAX_CCTP_TRASFER_FEE = BigInt(500);
export const MIN_CCTP_FINALITY_THRESHOLD = 1000;

// Domain IDs
export const ETH_SEPOLIA_DOMAIN_ID = 0;
export const BASE_SEPOLIA_DOMAIN_ID = 6;

export const USDC_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const


export const SMART_WALLET_CREDENTIAL = 'smart-wallet-credential'

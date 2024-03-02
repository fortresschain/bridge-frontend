'use client';

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export namespace LocationContextType {
  export interface Input {
    children: ReactNode;
  }
  export interface Output {
    tokensChainList: {
      chainId: number;
      chainName: string;
      chainSymbol: string;
      chainLogo: string;
      addressRecieveBridge: string;
      tokens: {
        id: number;
        name: string;
        symbol: string;
        logo: string;
        address: string;
        formatedBalance: string;
        balance: string;
      }[];
    }[];
    selectedToken: {
      id: number;
      name: string;
      symbol: string;
      logo: string;
      address: string;
      formatedBalance: string;
      balance: string;
    } | null;
    setSelectedToken: Dispatch<
      SetStateAction<{
        id: number;
        name: string;
        symbol: string;
        logo: string;
        address: string;
        formatedBalance: string;
        balance: string;
      } | null>
    >;
    setTokensChainList: Dispatch<
      SetStateAction<
        {
          chainId: number;
          chainName: string;
          chainSymbol: string;
          chainLogo: string;
          addressRecieveBridge: string;
          tokens: {
            id: number;
            name: string;
            symbol: string;
            logo: string;
            address: string;
            formatedBalance: string;
            balance: string;
          }[];
        }[]
      >
    >;
    netWorkFrom: number | null;
    setNetWorkFrom: Dispatch<SetStateAction<number | null>>;
    netWorkTo: number | null;
    setNetWorkTo: Dispatch<SetStateAction<number | null>>;
  }
}

export const TokenChainListContext = createContext(
  {} as LocationContextType.Output
);

export const TokenChainListProvider: FC<LocationContextType.Input> = ({
  children,
}) => {
  const tokensChainListDefault = [
    {
      chainId: 56,
      chainName: 'Binance Smart Chain',
      chainSymbol: 'BNB',
      chainLogo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
      addressRecieveBridge: '0xD18Ea8DB279ea3FEF7821134Bd6538901Ba510E0',
      tokens: [
        {
          id: 1,
          name: 'BNB',
          symbol: 'BNB',
          logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '',
        },
        {
          id: 2,
          name: 'USDT',
          symbol: 'USDT',
          logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
          address: '0x55d398326f99059fF775485246999027B3197955',
          formatedBalance: '0',
          balance: '',
        },
      ],
    },
    {
      chainId: 97,
      chainName: 'Binance Smart Chain Testnet',
      chainSymbol: 'TBNB',
      chainLogo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
      addressRecieveBridge: '0xD18Ea8DB279ea3FEF7821134Bd6538901Ba510E0',
      tokens: [
        {
          id: 1,
          name: 'TBNB',
          symbol: 'TBNB',
          logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '0',
        },
        {
          id: 2,
          name: 'USDT',
          symbol: 'USDT',
          logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
          address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
          formatedBalance: '0',
          balance: '0',
        },
      ],
    },
    {
      chainId: 370,
      chainName: 'WhaleChain',
      chainSymbol: 'WHALE',
      chainLogo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
      addressRecieveBridge: '0xD18Ea8DB279ea3FEF7821134Bd6538901Ba510E0',
      tokens: [
        {
          id: 1,
          name: 'WhaleChain',
          symbol: 'WHALE',
          logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '0',
        },
      ],
    },
    {
      chainId: 372,
      chainName: 'FortressChain',
      chainSymbol: 'FORT',
      chainLogo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
      addressRecieveBridge: '0xD18Ea8DB279ea3FEF7821134Bd6538901Ba510E0',
      tokens: [
        {
          id: 1,
          name: 'FortressChain',
          symbol: 'FORT',
          logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '0',
        },
      ],
    },
  ];
  const [tokensChainList, setTokensChainList] = useState(
    tokensChainListDefault
  );
  const [selectedToken, setSelectedToken] = useState<{
    id: number;
    name: string;
    symbol: string;
    logo: string;
    address: string;
    formatedBalance: string;
    balance: string;
  } | null>(null);
  const [netWorkFrom, setNetWorkFrom] = useState<number | null>(null);
  const [netWorkTo, setNetWorkTo] = useState<number | null>(null);
  return (
    <TokenChainListContext.Provider
      value={{
        tokensChainList,
        selectedToken,
        setSelectedToken,
        setTokensChainList,
        netWorkFrom,
        setNetWorkFrom,
        netWorkTo,
        setNetWorkTo,
      }}>
      {children}
    </TokenChainListContext.Provider>
  );
};

export const useTokenChainList = () => {
  const context = useContext(TokenChainListContext);
  if (!context) {
    throw new Error('useTokenChainList error');
  }
  return context;
};

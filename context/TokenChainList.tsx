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
      explorerURL: string;
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
          explorerURL: string;
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
      explorerURL: 'https://explorer.whalechain.live/',
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
      chainId: 370,
      chainName: 'WhaleChain',
      chainSymbol: 'WHALE',
      chainLogo: 'https://i.ibb.co/XWtRzjZ/icon-round.png',
      explorerURL: 'https://explorer.whalechain.live/',
      addressRecieveBridge: '0x63592E30fCA183e47dC180ABfdBb5564C0C9FCA0',
      tokens: [
        {
          id: 1,
          name: 'WhaleChain',
          symbol: 'WHALE',
          logo: 'https://i.ibb.co/XWtRzjZ/icon-round.png',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '0',
        },
        {
          id: 2,
          name: 'Tether USD',
          symbol: 'USDT',
          logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
          address: '0x3C77E6B1E745c76633E7EcE61E8e90d50f96BA7f',
          formatedBalance: '0',
          balance: '0',
        },
      ],
    },
    {
      chainId: 372,
      chainName: 'FortressChain',
      chainSymbol: 'FORT',
      chainLogo: 'https://i.ibb.co/yNThkbj/Blue-minimalist-whale-tail-logo.png',
      explorerURL: 'https://explorer.whalechain.live/',
      addressRecieveBridge: '0xD18Ea8DB279ea3FEF7821134Bd6538901Ba510E0',
      tokens: [
        {
          id: 1,
          name: 'FortressChain',
          symbol: 'FORT',
          logo: 'https://i.ibb.co/yNThkbj/Blue-minimalist-whale-tail-logo.png',
          address: '0x0000000000000000000000000000000000000000',
          formatedBalance: '0',
          balance: '0',
        },
        {
          id: 2,
          name: 'Tether USD',
          symbol: 'USDT',
          logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
          address: '0x9213D475A4e3d402659b39F39f09D130bA64AFE0',
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

import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import Image from 'next/image';
import { formatCaps } from '../../../utils/strings';

const SelectToken = ({
  tokensChain,
  balanceNative,
  selectedToken,
  setSelectedToken,
  status,
}: {
  tokensChain:
    | {
        chainId: number;
        chainName: string;
        chainSymbol: string;
        chainLogo: string;
        tokens: {
          id: number;
          name: string;
          symbol: string;
          logo: string;
          address: string;
          formatedBalance: string;
          balance: string;
        }[];
      }
    | undefined;
  balanceNative:
    | {
        decimals: number;
        formatted: string;
        symbol: string;
        value: bigint;
      }
    | undefined;
  selectedToken: {
    id: number;
    name: string;
    symbol: string;
    logo: string;
    address: string;
    formatedBalance: string;
    balance: string;
  } | null;
  setSelectedToken: (
    value: React.SetStateAction<{
      id: number;
      name: string;
      symbol: string;
      logo: string;
      address: string;
      formatedBalance: string;
      balance: string;
    } | null>
  ) => void;
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting';
}) => {
  return (
    <>
      {status && tokensChain && status === 'connected' && (
        <div className="w-64 mr-4">
          <Menu>
            <MenuHandler>
              <Button
                className="w-full"
                color="amber"
                placeholder={''}>
                {balanceNative && selectedToken
                  ? `${formatCaps(balanceNative.formatted)} - ${
                      selectedToken.name
                    }`
                  : 'Select a token'}
              </Button>
            </MenuHandler>
            <MenuList placeholder={''}>
              {tokensChain.tokens.map((tokenChain, index) => (
                <MenuItem
                  onClick={() => {
                    setSelectedToken(tokenChain);
                  }}
                  key={index}
                  placeholder={''}>
                  <div className="flex items-center">
                    <Image
                      className="mr-2"
                      src={tokenChain.logo}
                      width={20}
                      height={20}
                      alt={''}
                    />
                    {tokenChain.name}
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      )}
    </>
  );
};

export default SelectToken;

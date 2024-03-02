import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { middleEllipsis } from '../../../utils/strings';
import { DisconnectErrorType } from 'wagmi/actions';
import { Connector } from 'wagmi';

const Connect = ({
  status,
  address,
  selectedNetworkName,
  disconnect,
}: {
  status: 'disconnected' | 'connected' | 'reconnecting' | 'connecting';
  address: `0x${string}` | undefined;
  selectedNetworkName: string | undefined;
  disconnect: (
    variables?:
      | {
          connector?: Connector | undefined;
        }
      | undefined,
    options?:
      | {
          onSuccess?:
            | ((
                data: void,
                variables:
                  | {
                      connector?: Connector | undefined;
                    }
                  | undefined,
                context: unknown
              ) => void)
            | undefined;
          onError?:
            | ((
                error: DisconnectErrorType,
                variables:
                  | {
                      connector?: Connector | undefined;
                    }
                  | undefined,
                context: unknown
              ) => void)
            | undefined;
          onSettled?:
            | ((
                data: void | undefined,
                error: DisconnectErrorType | null,
                variables:
                  | {
                      connector?: Connector | undefined;
                    }
                  | undefined,
                context: unknown
              ) => void)
            | undefined;
        }
      | undefined
  ) => void;
}) => {
  return (
    <>
      {status === 'connected' && (
        <Menu>
          <MenuHandler>
            <Button
              className="w-max text-xs text-black leading-3"
              size="sm"
              variant="filled"
              color="amber"
              placeholder={''}>
              <div>
                <div>
                  {address ? middleEllipsis(address as string) : ''} {'\r\n'}
                </div>
                <span className="text-3xs">{selectedNetworkName}</span>
              </div>
            </Button>
          </MenuHandler>
          <MenuList placeholder={''}>
            <MenuItem
              placeholder={''}
              onClick={() => {
                disconnect();
              }}>
              Disconnect Wallet
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default Connect;

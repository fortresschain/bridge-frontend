import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useReadContracts } from 'wagmi' 
import { useTokenChainList } from "../../context/TokenChainList";
import { useEffect, useState } from "react";
import { config } from "../../config";

export const usePage = () => {
    const { open } = useWeb3Modal();
    const { tokensChainList, selectedToken, setSelectedToken } = useTokenChainList();
    const { disconnect } = useDisconnect();
    const { address, isConnecting, isDisconnected, status, isReconnecting } =
      useAccount();
    const { data: balanceNative } = useBalance({
      address,
      token: selectedToken && selectedToken.address !== '0x0000000000000000000000000000000000000000' ? selectedToken.address as any : undefined,
    });
  
    const { selectedNetworkId } = useWeb3ModalState();
    const selectedNetworkName = config.chains.find((chain) => chain.id === selectedNetworkId as any)?.name;
    
    const [tokensChain, setTokensChain] = useState(selectedNetworkId ? tokensChainList?.find((chain) => chain.chainId === selectedNetworkId as any) : undefined);

    useEffect(() => {
        if (selectedNetworkId) {
            setTokensChain(tokensChainList?.find((chain) => chain.chainId === selectedNetworkId as any));
            setSelectedToken(null);
        }

    }, [selectedNetworkId, setSelectedToken, tokensChainList]);

    return {
        open,
        disconnect,
        address,
        isConnecting,
        isDisconnected,
        isReconnecting,
        selectedNetworkId,
        selectedNetworkName,
        tokensChain,
        balanceNative,
        status,
        selectedToken,
        setSelectedToken
    };
};

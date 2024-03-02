'use client'
import { useAccount, useBalance, useSendTransaction, useSwitchChain } from "wagmi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTokenChainList } from "../../context/TokenChainList";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { sendTransaction } from "wagmi/actions";
import { parseEther } from "viem";

type Inputs = {
  networkFrom: string;
  networkTo: string;
  amount: string;
}

export const usePage = () => {
  const formSchema = z.object({
    networkFrom: z.string({
      required_error: "Please select the network"
    }),
    networkTo: z.string({
      required_error: "Please select the network"
    }),
    amount: z.string({
      required_error: "Please enter the amount"
    })
  }).refine(data => {
    return data.networkFrom !== data.networkTo;
  } , {
    message: "The source and target networks must be different",
    path: ["amount"]
  });
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });
  const { open } = useWeb3Modal();
  const { data: hash, sendTransaction } = useSendTransaction() 
  const { switchChain } = useSwitchChain();
  const { selectedToken, tokensChainList } = useTokenChainList();
    const { address, isConnecting, isDisconnected, status, isReconnecting } =
      useAccount();
    const handleSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
      const to = tokensChainList.find (token => token.chainId === parseInt(data.networkTo));
      if(to?.addressRecieveBridge)
        sendTransaction({ to: to?.addressRecieveBridge as any, value: parseEther(data.amount) }, {
          onError: (error) => {
            alert(error);
          },
          onSuccess: (hash) => {
            alert(`Transaction sent with hash: ${hash}`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    const handleError = (error: any) => console.log(error);
    const { data: balanceNative } = useBalance({
      address,
      token: selectedToken && selectedToken.address !== '0x0000000000000000000000000000000000000000' ? selectedToken.address as any : undefined,
    });

    useEffect(() => {
      form.setValue('amount', '0');
    }, [form, selectedToken]);

    return {
      isConnecting, 
      isDisconnected, 
      status, 
      isReconnecting,
      open,
      address,
      selectedToken,
      onSubmit: form.handleSubmit(handleSubmit, handleError),
      form,
      switchChain,
      balanceNative
    };
};

'use client'
import { useAccount, useBalance, useSendTransaction, useSwitchChain, useTransaction, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTokenChainList } from "../../context/TokenChainList";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
// import { config } from "../../config";
import abi from './abi.json';
import { parseEther } from "viem";
// import { writeContract } from '@wagmi/core';
import { save } from "../../services/mongodb";

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


    const { selectedNetworkId } = useWeb3ModalState();
    const { data: hashApprove, writeContract: writeContractApprove, isPending: isLoadingApprove } = useWriteContract() 
    const { data: hashSendToken, writeContract: writeContractToken, isPending: isLoadingToken } = useWriteContract() 
    const form = useForm<Inputs>({
      resolver: zodResolver(formSchema),
      mode: 'onChange',
    });
    const { open } = useWeb3Modal();
    const { data: hash, sendTransaction } = useSendTransaction() 
    const { switchChain } = useSwitchChain();
    const { selectedToken, tokensChainList } = useTokenChainList();
    const selectedNetwork = tokensChainList.find((chain) => `${chain.chainId}` === `${selectedNetworkId}` as any);
    const { address, isConnecting, isDisconnected, status, isReconnecting } =
      useAccount();
    const handleSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
        const from = tokensChainList.find (token => token.chainId === parseInt(data.networkFrom));
        const to = tokensChainList.find (token => token.chainId === parseInt(data.networkTo));
        if(to?.addressRecieveBridge && selectedToken && selectedToken.address === '0x0000000000000000000000000000000000000000'){
          sendTransaction({ to: from?.addressRecieveBridge as any, value: parseEther(data.amount) }, {
            onError: (error) => {
              alert(error);
            },
            onSuccess: async (hash) => {
              if(hash){
                await save({
                  hash: hash,
                  from: from?.chainId,
                  to: to?.chainId,
                  amount: data.amount,
                  token: selectedToken?.address,
                  status: 'pending',
                  type: 'transfer',
                  date: new Date().toISOString()
                });
                alert(`Transaction sent with hash: ${hash}`);
              }
              
            }
          });
        } else {
          if(!hashApprove && !isLoadingApprove){
            writeContractApprove({
              functionName: 'approve',
              address: selectedToken?.address as any,
              args: [from?.addressRecieveBridge, parseEther(data.amount)],
              // contract: selectedToken?.address as any,
              value: undefined,
              abi: abi,
            });
          } else if(hashApprove && !isLoadingApprove && !hashSendToken && !isLoadingToken){
            // const result = await writeContract(configCore as any, {
            //   abi,
            //   address: selectedToken?.address as any,
            //   functionName: 'transfer',
            //   args: [from?.addressRecieveBridge, parseEther(data.amount)],
            // });
            // // save to mongodb
            // if(result){
            //   await save({
            //     hash: result,
            //     from: from?.chainId,
            //     to: to?.chainId,
            //     amount: data.amount,
            //     token: selectedToken?.address,
            //     status: 'pending',
            //     type: 'transfer',
            //     date: new Date().toISOString()
            //   });
            //   alert(`Transaction sent with hash: ${result}`);
            // }
          }
        }
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
      hashApprove,
      hashSendToken,
      isLoadingToken,
      isLoadingApprove,
      selectedNetwork,
      open,
      address,
      selectedToken,
      onSubmit: form.handleSubmit(handleSubmit, handleError),
      form,
      switchChain,
      balanceNative
    };
};

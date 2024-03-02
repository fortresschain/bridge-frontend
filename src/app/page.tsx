'use client';
import Navbar from '../../components/Navbar';
import { usePage } from './index.hook';
import {
  Select,
  Option,
  IconButton,
  Input,
  Button,
} from '@material-tailwind/react';
import { IoIosSwap } from 'react-icons/io';
import Image from 'next/image';
import { MdOutlineSwapVert } from 'react-icons/md';
import { config } from '../../config';
import Connect from '../../components/Navbar/partial/Connect';
import { Controller } from 'react-hook-form';
import { formatCaps } from '../../utils/strings';

export default function Home() {
  const {
    open,
    address,
    selectedToken,
    status,
    form,
    onSubmit,
    switchChain,
    balanceNative,
  } = usePage();
  return (
    <>
      <Navbar />

      <div className="p-4 h-full w-full flex justify-center items-center">
        <div className="text-center w-full lg:max-w-[70%]">
          <form onSubmit={onSubmit}>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              Select the network to bridge your tokens. Please choose both the
              source network and the target network.
            </h1>
            <p className="!text-white">
              This swap will occur on your same address
            </p>
            <span className=" bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              {address && <p>{address}</p>}
            </span>
            <div className="mt-10 w-full lg:flex justify-center items-center">
              <div className="w-[100%] md:w-[100%] lg:w-[50%]">
                <Controller
                  control={form.control}
                  name="networkFrom"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <>
                        <Select
                          size="lg"
                          placeholder={''}
                          className="bg-black text-white font-extrabold border-b-white border-r-white border-l-white"
                          labelProps={{
                            className:
                              '!text-white !font-extrabold after:!border-white before:!border-white',
                          }}
                          value={value}
                          onChange={(value) => {
                            onChange(value);
                            switchChain({
                              chainId: Number(value),
                            });
                            form.resetField('networkTo');
                            form.clearErrors('amount');
                          }}
                          label="Network From">
                          {config.chains.map((chain) => (
                            <Option
                              value={`${chain.id}`}
                              key={chain.id}>
                              {chain.name}
                            </Option>
                          ))}
                        </Select>
                        <p className="text-red-500">{error?.message}&nbsp;</p>
                      </>
                    );
                  }}
                />
              </div>
              <div className="mr-4 ml-4 my-2 lg:my-0">
                <IconButton
                  onClick={() => {
                    const netFrom = form.getValues().networkFrom;
                    const netTo = form.getValues().networkTo;
                    if (netFrom && netTo) {
                      form.setValue('networkFrom', netTo);
                      form.setValue('networkTo', netFrom);
                      switchChain({
                        chainId: Number(netTo),
                      });
                      form.clearErrors('amount');
                    }
                  }}
                  color="amber"
                  size="lg"
                  className="inline lg:hidden"
                  placeholder={''}>
                  <MdOutlineSwapVert size={'30px'} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    const netFrom = form.getValues().networkFrom;
                    const netTo = form.getValues().networkTo;
                    if (netFrom && netTo) {
                      form.setValue('networkFrom', netTo);
                      form.setValue('networkTo', netFrom);
                      switchChain({
                        chainId: Number(netTo),
                      });
                      form.clearErrors('amount');
                    }
                  }}
                  color="amber"
                  size="lg"
                  className="hidden lg:block"
                  placeholder={''}>
                  <IoIosSwap size={'30px'} />
                </IconButton>
                <p>&nbsp;</p>
              </div>
              <div className="w-[100%] md:w-[100%] lg:w-[50%]">
                <Controller
                  control={form.control}
                  name="networkTo"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <>
                        <Select
                          size="lg"
                          className="bg-black text-white font-extrabold border-b-white border-r-white border-l-white"
                          labelProps={{
                            className:
                              '!text-white !font-extrabold after:!border-white before:!border-white',
                          }}
                          placeholder={''}
                          onChange={(value) => {
                            onChange(value);
                          }}
                          value={value}
                          label="Network To">
                          {config.chains.map((chain) => (
                            <Option
                              value={`${chain.id}`}
                              key={chain.id}>
                              {chain.name}
                            </Option>
                          ))}
                        </Select>
                        <p className="text-red-500">{error?.message}&nbsp;</p>
                      </>
                    );
                  }}
                />
              </div>
            </div>
            {selectedToken && (
              <Controller
                control={form.control}
                name="amount"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <div className="justify-center flex mt-10 items-center">
                        <>
                          <div className="relative flex w-full max-w-[44rem]">
                            <Input
                              type="text"
                              size="lg"
                              className="!bg-black !text-white font-extrabold pr-20 !border-b-white !border-r-white !border-l-white"
                              labelProps={{
                                className:
                                  '!text-white !font-extrabold after:!border-white before:!border-white',
                              }}
                              variant="standard"
                              crossOrigin={'anonymous'}
                              label={`AMOUNT ${selectedToken.symbol}`}
                              onChange={(e) => {
                                onChange(e.target.value);
                              }}
                              defaultValue={0}
                              value={value}
                              containerProps={{
                                className:
                                  'min-w-0 !bg-black !text-white !font-extrabold ',
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                if (balanceNative?.value) {
                                  form.setValue(
                                    'amount',
                                    (
                                      Number(balanceNative?.value) /
                                      10 ** Number(balanceNative?.decimals)
                                    ).toFixed(10)
                                  );
                                }
                              }}
                              color={'amber'}
                              className="!absolute right-1 top-1 rounded"
                              placeholder={undefined}>
                              MAX
                            </Button>
                          </div>
                        </>
                      </div>
                      <p className="text-red-500">{error?.message}&nbsp;</p>
                    </>
                  );
                }}
              />
            )}
            {(status === 'disconnected' || !status) && (
              <div className="mt-5">
                <Connect
                  status={status}
                  open={open}
                />
              </div>
            )}
            {status === 'connected' && (
              <div className="mt-5 flex justify-center text-center">
                <Button
                  size="lg"
                  type="submit"
                  disabled={!form.formState.isValid}
                  loading={form.formState.isSubmitting}
                  color={'amber'}
                  className="rounded w-full max-w-[44rem] text-center flex justify-center"
                  placeholder={undefined}>
                  EXCHANGE
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

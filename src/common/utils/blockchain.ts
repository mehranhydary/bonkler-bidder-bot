import {
  ethers,
  AlchemyProvider,
  formatEther,
  Interface,
  parseEther,
} from 'ethers';

export const getAlchemyProvider = (network = 'homestead') => {
  return new AlchemyProvider(network, process.env.ALCHEMY_API);
};

export const getContract = (
  address: string,
  abi: any,
  provider = getAlchemyProvider(),
) => {
  return new ethers.Contract(address, abi, provider);
};

export const getBalance = async (
  address: string,
  provider = getAlchemyProvider(),
) => {
  const balance = await provider.getBalance(address);
  return parseFloat(formatEther(balance));
};

export const getInterface = (abi: any) => {
  return new Interface(abi);
};

export const sendTransaction = async (tx: any) => {
  const wallet = new ethers.Wallet(process.env.PK, getAlchemyProvider());
  const sendTransaction = await wallet.sendTransaction(tx);
  console.log('sendTransaction', sendTransaction);
  await sendTransaction.wait(1);
  console.log('Transaction is mined');
  return sendTransaction;
};

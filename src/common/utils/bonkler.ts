import axios from 'axios';
import * as moment from 'moment';
import { getAlchemyProvider, getContract, getInterface } from './blockchain';
import { BONKLER_AUCTION_ADDRESS } from '../constants/addresses';
import { BONKLER_AUCTION_ABI } from '../constants/abis';
import { formatEther, parseEther, toNumber } from 'ethers';

export const getCurrentGenerationHash = async () => {
  try {
    const url = 'https://bonkler.remilia.org/bonkler?c=1';
    const settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const res = await axios.get(url, settings);
    const { generationHash } = res.data;
    return generationHash;
  } catch (error: any) {
    console.error(
      error,
      'Error occurred while getting generation hash from Bonkler API',
    );
    throw error;
  }
};

export const getAuctionDetails = async () => {
  try {
    const bonklerAuctionContract = getContract(
      BONKLER_AUCTION_ADDRESS,
      BONKLER_AUCTION_ABI,
    );
    const bonklerAuctionData = await bonklerAuctionContract.auctionData();
    const bidAmount = bonklerAuctionData.amount;
    const winningBidder = bonklerAuctionData.bidder;
    const startTime = moment();
    const endTime = moment(toNumber(bonklerAuctionData.endTime) * 1000);
    const duration = moment.duration(endTime.diff(startTime));
    const hours = Math.trunc(duration.asHours());
    const minutes = Math.trunc(duration.asMinutes() - hours * 60);
    const seconds = Math.trunc(
      duration.asSeconds() - hours * 60 * 60 - minutes * 60,
    );

    return {
      bidAmount: parseFloat(formatEther(bidAmount.toString())),
      winningBidder,
      endTime,
      duration: endTime.fromNow(),
      hours,
      minutes,
      seconds,
      bonklerId: bonklerAuctionData.bonklerId,
    };
  } catch (e) {
    console.error(e);
  }
};

export const createBidTransaction = async (
  bonklerId: number,
  generationHash: string,
  bidAmount: number,
) => {
  const provider = getAlchemyProvider();
  const bonklerAuctionInterface = getInterface(BONKLER_AUCTION_ABI);
  const data = bonklerAuctionInterface.encodeFunctionData('createBid', [
    '0x' + bonklerId.toString(16),
    '0x' + parseInt(generationHash).toString(16),
  ]);
  const feeData = await provider.getFeeData();

  const tx = {
    to: BONKLER_AUCTION_ADDRESS,
    data,
    value: parseEther(bidAmount.toString()),
  };

  return {
    ...tx,
    maxFeePerGas: feeData.maxFeePerGas,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    gasLimit: 200000,
  };
};

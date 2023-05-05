import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

// Constants
import { getBalance, sendTransaction } from 'src/common/utils/blockchain';
import {
  createBidTransaction,
  getAuctionDetails,
  getCurrentGenerationHash,
} from 'src/common/utils/bonkler';

@Injectable()
export class BonklerTasksService {
  // This will get the auction details of the current Bonkler that is up for auction
  @Cron(CronExpression.EVERY_SECOND)
  async runJob() {
    // const generationHash = await getCurrentGenerationHash();
    const auctionDetails = await getAuctionDetails();
    const biddingAddress = process.env.BIDDING_ADDRESS;
    const { bidAmount, winningBidder, bonklerId } = auctionDetails;
    const balance = await getBalance(biddingAddress);
    const generationHash = await getCurrentGenerationHash();

    // Create a boolean check to see if winningBidder is the same as biddingAddress
    const isWinningBidder = winningBidder === biddingAddress;

    if (isWinningBidder) {
      console.log('You are the winning bidder!');
      // So do nothing
    } else {
      if (balance > bidAmount) {
        console.log('Balance is more than bidAmount, place a bid!');
        const tx = await createBidTransaction(
          bonklerId,
          generationHash,
          bidAmount + 0.1,
        );
        await sendTransaction(tx);
      } else {
        const difference = bidAmount - balance;
        console.log(
          `The balance in your wallet is ${balance.toFixed(
            1,
          )} ETH. The current bid is ${bidAmount} ETH. You need at least ${(
            difference + 0.1
          ).toFixed(1)} ETH more to place a bid of ${bidAmount + 0.1} ETH.`,
        );
      }
    }
  }
}

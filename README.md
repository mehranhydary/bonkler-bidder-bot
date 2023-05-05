# Bonkler Bidder Bot

The goal is to use this bot to make bids on Bonkler NFTs.

## Description

While this app is running, this app will do the following every second (you can update this to other time intervals):

1. Get current auction details
2. Get the balance of your bidding address
3. Get the current generation hash for the Bonkler that is currently up for auction

Once these data points are received, the app will check if your bidding address the winning address.

- If it is then it will do nothing
- If it is not, then if you have enough balance, it will try to place a bid

## Configuration

This app requires a .env file. Create it and add the following keys":

```
# API Key from Alchemy
ALCHEMY_API=
# The private key of your bidding address
PK=
# The bidding address that has the ETH you want to bid with
BIDDING_ADDRESS=
```

After the .env file is created, run `yarn` to install all dependencies.

To run the app locally, you can run `yarn run start:dev`. Upon starting the app, you will see something like this:

```
[10:30:25 AM] Starting compilation in watch mode...

[10:30:27 AM] Found 0 errors. Watching for file changes.

The balance in your wallet is 0.7 ETH. The current bid is 9.33 ETH. You need at least 8.7 ETH more to place a bid of 9.43 ETH.
```

## Contact

Reach out to [𝖒](https://twitter.com/mehranhydary) on Twitter if you have any questions.

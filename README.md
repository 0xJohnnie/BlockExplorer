# Block Explorer

The Block Explorer allows you to view the tokens owned in a wallet on the Ethereum Blockchain.

## Search

You can search using one of two methods:

1. An Ethereum address consisting of 42 hexadecimal characters
2. A valid .eth address

To begin, enter the desired address into the search bar and press the search button.

The explorer will display all tokens associated with that address, including the token value and metadata such as name, symbol, and (if available) logo.

## Technologies

The Block Explorer is built using React, NextJs, Mantine.dev, TypeScript, Alchemy SDK and Viem.

## Getting started

To get started, simply clone the repository and run `npm install` or `yarn` to install the necessary dependencies.

Then, run `npm run dev` or `yarn dev` to launch the application in your local development environment.

## Miscellaneous

🚧 Please note that the public "demo" API key for Alchemy SDK may be rate limited based on traffic.

To avoid this, you can replace it with your own Alchemy SDK key by edting the `REACT_APP_ALCHEMY_API_KEY` environment variable in the `.env` file.

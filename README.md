
Building a Narrative Tracker: Complete Guide to Full Stack Solana Development with Remix, Anchor, Rust, and Phantom

## Intro and general overview

Nader Dabit https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291 did a really good full stack solana development guide more than 2 years ago. A lot have changed since then.

I will be as concise as possible to make it beginner friendly to show you how to build a full stack dapp in 2024. Particular attention would be done on the updates and changes of libraries and toolings.

Why create another full stack guide?
There are a lot of great guides out there that are outdated using code from old version of libraries and tools. With that being said. I will point out what is new compared to older versions so it can also works for whoever already started a project to migrate to the latest and use the latest tools.

What framework to use?
We have mainly 3: Solana, Anchor and Seahorse.
Seahorse is not maintained and Anchor is built on top of Solana making it easier and less bloated to create program. The best choise goes to Anchor for anyone starting a new projects

## Project overview

The tooling we'll be using today includes:

Solana Playground - browser based program editor. It comes with testing wallet, testnet SOL airdrop, CLI, test file. Which allow us to start right away. Export DSL which is the equivalent to EVM ABI for solana programs

Anchor JS SDK and Anchor Rust Lang - We will use Anchor for building the program and the JS library to call the contract from the frontend.

solana/web3.js - It provides utilities to help us connect wallet and format values.

React Remix - Remix is a very intuitive react framework

At the end of the guide you will be able to build a working full stack solana app from where you can continue tinkering and build your own ideas.

We will focus on setup solana playground, deploy our first program and test it.
Build the frontend, add connect wallet and call the program deployed on devnet.

## Demo

Here is a quick demo of what we are going to accomplish

## Requirements

Install a Solana wallet. Phantom Wallet is a recommended. 
[Phantom Wallet Chrome Extension](https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa)

Get some testnet SOL
[Solana Faucet](https://faucet.solana.com/)

Setup for web development: node.js, code editor.

## Getting Started

https://beta.solpg.io/

Go to "Build & Deploy" Tab and copy the Program ID and export the IDL


## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

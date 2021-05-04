# Oken Wallet as a Service (WaaS) Javascript SDK
This is a programmable interface to the Oken Wallet as a Service API. Oken is a [tokenization platform](http://oken.app) crated by OnePercet to help customers to create and manage tokens on blockchain.

TL;DR: Here's an example code

    const WaaS = require('oken-waas')

    const privateKey = 'YOUR_PRIVATE_KEY'
    const okenClientId = 'YOUR_CLIENT_ID'

    const { contracts, wallets } = WaaS.connect({
      network: WaaS.networks.DEVELOPMENT,
      okenClientId,
      privateKey
    })

    const contract = contracts.nft()
    const userId = Date.now().toString()

    ; (async () => {
      try {
        const mint = await contract.mint({
          to: '0x...',
          id: 1,
          amount: 1,
          data: 'test script'
        })
      } catch (error) {
        console.error(error?.response?.data ?? error)
      }
    })()

In order to use this SDK you need to have an Client ID. If you don't have one yet, please [contact us](http://onepercent.io).

This SDK provides operations to manage accounts and tokens lifecycle, as described ahead:

## SDK Overview

The Oken Wallet as a Service API is a Restful service created for OnePercent customers to facilitate the access to Accounts and Tokens on blockchain. It was built following some design principles:

- Every customer has a corresponding Client ID in the platform
- All requests to the API should provide an Authorization Bearer Token, signed by customers with their own private key. The API will validate customers against their public key before proceeding
- All POST, PUT and DELETE requests should also provide a signed version of the payload. The signature must be made with customer's private key. The API will validate signatures against customer's public key before proceeding

This is the reason why you need a key pair (private on customer side, public on our side) in order to use the Oken WaaS SDK.

## WaaS Installation

To add Oken WaaS to your JS project, you could run the following command on the command line:

    npm install oken-waas --save

If you are running Yarn, please do as follows:

    yarn add oken-waas --save

Now you are able to instantiate WaaS in your code.

## WaaS Initialization
The first step to access the SDK is to instantiate the SDK with your own private key, Client ID and the blockchain network you wish to connect. The private key should be a RSA 256 string in PEM format. **PLEASE BE CAREFUL WITH YOUR PRIVATE KEY. WE DO NOT HAVE ACCESS TO IT**

An initalization example is presented ahead:

    const WaaS = require('oken-waas')

    const privateKey = 'YOUR_PRIVATE_KEY'
    const okenClientId = 'YOUR_CLIENT_ID'

    const { contracts, wallets } = WaaS.connect({
      network: WaaS.networks.DEVELOPMENT,
      okenClientId,
      privateKey
    })

The parameter ``network`` should be one of the types:
- WaaS.networks.DEVELOPMENT
- WaaS.networks.STAGING
- WaaS.networks.PRODUCTION

As shown above, you could instantiate two elements: ``contracts`` and ``wallets``. Ahead we describe each of them.

## Wallets
After instantiating the WaaS SDK, you could perform wallet operations, as described ahead:

- ``create(referenceId)``: creates a new account for the provided reference ID
- ``get(referenceId)``: returns account data for the requested reference ID
- ``get()``: returns all accounts created by the connected Client ID

You could use the ``wallets`` component like this:

    const referenceId = 'ABC123'
    try {
      const account = await wallets.create(referenceId)
      const allAccounts = await wallets.get()

    } catch (error) {
      console.error(error?.response?.data ?? error)
    }

## Contracts
You could instantiate a deployed contract and call its methods using the SDK. Your provided Client ID should have a linked contract deployed to the blockchain before using it. There are two types of contract currently supported by the SDK:

- ``contracts.nft()``: a [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) Non-Fungible Token (NFT) contract
- ``constracts.erc20()``: a [ERC-20](https://eips.ethereum.org/EIPS/eip-20) standard token contract

The SDK abstracts all existing contract methods, so you need to refer to the correspoding ERC documentation in order to have access to all existing methods. Ahead, we exemplify how you could call the methods ``mint`` (a POST request to the API, as it writes to the contract) and ``balanceOf`` (a GET request to the API, as it reads from the contract):

    try {
      const mint = await contract.mint({
        to: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
        id: 1,
        amount: 1,
        data: 'test script'
      })

      console.log("🚀 ~ file: test.js ~ line 107 ~ waas.wallet.create ~ mint", mint)

      const balance = await contract.balanceOf({
        account: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
        id: 1
      })

      console.log("🚀 ~ file: test.js ~ line 114 ~ waas.wallet.create ~ balance", balance)

    } catch (error) {
      console.error(error?.response?.data ?? error)
    }

## Issues and support
If you need any support on this SDK, please visit our [issues page on Github](https://github.com/onepercentio/oken-waas-sdk-js/issues) or contact our team.

Made with 🤘🏾 by [OnePercent](http://onepercent.io)
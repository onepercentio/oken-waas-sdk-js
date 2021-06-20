# Oken Wallet as a Service (WaaS) Javascript SDK

This is a programmable interface to the Oken Wallet as a Service API. Oken is a  [tokenization platform](http://oken.app/)  crated by OnePercent to help customers create and manage tokens on blockchain.

TL;DR: Take a look at the `examples` folder

In order to use this SDK you need to have an Oken Client ID. If you don't have one yet, please  [contact us](http://onepercent.io/).

This SDK provides operations to manage accounts and tokens lifecycle, as described below:

## [](https://www.npmjs.com/package/oken-waas#sdk-overview)SDK Overview

The Oken Wallet as a Service API is a Restful service created for OnePercent customers to facilitate the access to Accounts and Tokens on blockchain. It was built following some design principles:

-   Every customer has a corresponding Client ID in the platform
-   All requests to the API should provide an Authorization Bearer Token, signed by customers with their own private key. The API will validate customers against their public key before proceeding
-   All POST, PUT and DELETE requests should also provide a signed version of the payload. The signature must be made with customer's private key. The API will validate signatures against customer's public key before proceeding

This is the reason why you need a key pair (private on customer side, public on our side) in order to use the Oken WaaS SDK.

## [](https://www.npmjs.com/package/oken-waas#waas-installation)WaaS Installation

To add Oken WaaS to your JS project, you could run the following command on the command line:

```
npm install oken-waas --save

```

If you are running Yarn, please do as follows:

```
yarn add oken-waas --save

```

Now you are able to instantiate WaaS in your code.

## [](https://www.npmjs.com/package/oken-waas#waas-initialization)WaaS Initialization

The first step to access the SDK is to instantiate the SDK with your own private key, Client ID and the blockchain network you wish to connect. The private key should be a RSA 256 string in PEM format.  **PLEASE BE CAREFUL WITH YOUR PRIVATE KEY. WE DO NOT HAVE ACCESS TO IT**

An initalization example is presented below:

```js
const WaaS = require('oken-waas')

const privateKey = 'YOUR_PRIVATE_KEY'
const okenClientId = 'YOUR_CLIENT_ID'

const { contracts, wallets } = WaaS.connect({
  network: WaaS.networks.ETHEREUM.KOVAN,
  endpoint: WaaS.endpoints.STAGING,
  okenClientId,
  privateKey
})

```

The parameter `network` should be one of the types:

-   WaaS.endpoints.DEVELOPMENT
-   WaaS.endpoints.STAGING
-   WaaS.endpoints.PRODUCTION

The parameter `endpoint` should be one of the types:

-   WaaS.networks.ETHEREUM.KOVAN
-   WaaS.networks.ETHEREUM.ROPSTEN
-   WaaS.networks.ETHEREUM.MAINNET
-   WaaS.networks.CELO.ALFAJORES
-   WaaS.networks.CELO.FORNO

As shown above, you could instantiate three elements: `contracts`, `wallets` and `transactions`. Ahead we describe each of them.

## [](https://www.npmjs.com/package/oken-waas#wallets)Wallets

After instantiating the WaaS SDK, you could perform wallet operations, as described ahead:

-   `create(referenceId)`: creates a new account for the provided reference ID
-   `get(referenceId)`: returns account data for the requested reference ID
-   `get()`: returns all accounts created by the connected Client ID

You could use the `wallets` component like this:

```js
const referenceId = 'ABC123'
try {
  const account = await wallets.create(referenceId)
  const allAccounts = await wallets.get()

} catch (error) {
  console.error(error.message, error.info)
}

```

## [](https://www.npmjs.com/package/oken-waas#contracts)Contracts

You could instantiate a deployed contract and call its methods using the SDK. Your provided Client ID should have a linked contract deployed to the blockchain before using it. There are two types of contract currently supported by the SDK:

-   `contracts.nft({ address: '0x0...' })`: an [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155)  Non-Fungible Token (NFT) extended implementation
-   `contracts.controlledToken()`: an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) extended implementation to make it controllable

The SDK abstracts all existing contract methods, so you need to refer to the correspoding ERC documentation in order to have access to all existing methods. Ahead, we exemplify how you could call the methods  `mint`  (a POST request to the API, as it writes to the contract) and  `balanceOf`  (a GET request to the API, as it reads from the contract):

```js
try {
  const mint = await contract.mint({
    to: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
    id: 1,
    amount: 1,
    data: 'test script'
  })

  console.log(mint)

  const balance = await contract.balanceOf({
    account: '0xb9f4b9a007dea047caf882d201d4d950050c21aa',
    id: 1
  })

  console.log(balance)

} catch (error) {
  console.error(error.message, error.info)
}

```

## Transaction status

Transactions may have the following status:

- ``CREATED``: Transaction was created is wating to be enqueued
- ``ENQUEUING``: Transaction is being enqueued
- ``ENQUEUED``: Transaction was enqueued and is waiting to be sent 
- ``SENDING``: Transaction is being sent to blockchain
- ``SENT``: Transaction was successfully sent to blockchain
- ``MINED``: Transactions was mined
- ``AWAITING_RETRY``: There was a transient error while sending, will be retried
- ``REVERTED``: There was an error in the execution of transaction (thrown by the smart contract)
- ``ERROR``: There was a server or integration error while sending the transaction

## Error Treatment
The SDK provides an element to wrap API errors. Ahead, we summarize the supported error types:

- ``ALREADY_CREATED``: when the requested user already has an associated account
- ``INTEGRATION_ERROR``: when the WaaS API encounters an error with a third party service
- ``REQUEST_ERROR``: whenever a malformed request is provided to the API
- ``UNAUTHORIZED``: when customer ID has no access to the API
- ``SERVER_ERROR``: for other errors

You should surround your code with a ``try/catch`` block in order to collect any raised error. The basic usage could be as follows:

```js
const { contracts, wallets, errors } = WaaS.connect({ /* Your connection object */ })

try {
    // Your SDK calls here
} catch(error) {
    if (error instanceof errors.ALREADY_CREATED) { // ALREADY_CREATED ERROR }
    if (error instanceof errors.INTEGRATION_ERROR) { // INTEGRATION_ERROR ERROR }
    if (error instanceof errors.REQUEST_ERROR) { // REQUEST_ERROR ERROR }
    if (error instanceof errors.UNAUTHORIZED) { // UNAUTHORIZED ERROR }
    if (error instanceof errors.SERVER_ERROR) { //SERVER_ERROR ERROR }
}
```

## [](https://www.npmjs.com/package/oken-waas#issues-and-support)Issues and support

If you need any support on this SDK, please visit our  [issues page on Github](https://github.com/onepercentio/oken-waas-sdk-js/issues)  or contact our team.

Made with 🤘🏾 by  [OnePercent](http://onepercent.io/)

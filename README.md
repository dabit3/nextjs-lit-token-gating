This is a minimal example of how to token-gate a Next.js page using [Lit Protocol](https://developer.litprotocol.com/) using `getServerSideProps`.


This token gates a `/protected` page checking to see if the user has a [Devs for Revolution](https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b) ERC721 token.

To run this example:

1. Clone the repo and install dependencies

```sh
git clone git@github.com:dabit3/nextjs-lit-token-gating.git

cd nextjs-lit-token-gating

npm install
```

2. Update the `accessControlConditions` with the contract address of the NFT you'd like to use:

```javascript
const accessControlConditions = [
  {
    contractAddress: '0x25ed58c027921E14D86380eA2646E3a1B5C55A8b',
    standardContractType: 'ERC721',
    chain: 'ethereum',
    method: 'balanceOf',
    parameters: [
      ':userAddress'
    ],
    returnValueTest: {
      comparator: '>',
      value: '0'
    }
  }
]
```

3. Start the app

```sh
npm run dev
```
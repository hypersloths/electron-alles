# Rocket Payments Application - Blockchain seruced payments
## adaptation of blockchain
Blockchain, eventhough popular in mainstream literature, remains a tool used and understood by very few. 

## private keys and losing them
One of the greatest challenges of introducing blockchain is private key handling by its users. 
Private keys are personal and by design the only way to perform actions on the blockchain.

Many solutions have been proposed to store private keys (online wallets, tokens), but none are truly foolproof.
Other solutions have been proposed to recover data when private keys are lost but these essentially weaken the security.

## the blockchain as a control mechanism rather than the only mechanism
Rather than using blockchain as the mechanism to save transactions we propose to use blockchain as an additional ledger for
transactions. In this fashion, losing private keys might be unpleasant but of minor consequence. 
The blockchain can be used to constantly check if other ledgers have a correct transaction history and correct them if necessary.
Therefore at the moment of loss other ledgers form a trustworthy basis to initiate a new instance of a blockchain control ledger. 

## PSD2 XS2A
Legalisation in Europe demands that (in 2018) banks provide account data to third parties if the account holder permits it. 
This offers the unique opportunity to compare data stored in the account of the bank with a blockchain.

## how it works
The app is like a FinTech making use of our idea. it provides insight in transactions on all accounts and adds some gamification with showing
which transactions were stored in the blockchain and which not. Promoting of course storage in the blockchain and using the app.

The app also allows you to send money, now by either mastercard api or paypal api. Any transaction done from the app is also stored in the blockchain.

Furthermore, there is an option to use the app to send payment requests to others. this also has an interesting aspect for shops, because 
the request is stored in the blockchain creating an undeniable register of an agreement. When the request is payed via the app (or maybe 
the transaction request is answered through the app) the blockchain will be updated. Incentive for shop owners to force customers using
the app is strong as it provides a good basis when legal problems concerning payments need to be solved.

## in depth about blockchain setup, client and master nodes
because the app should be user friendly and the blockchain should not kill users mobile devices, a setup such as explored by proof of stake is preferable.
Master nodes should be used to add new blocks and clients nodes should be used to hold a copy of at least the ledger merkle root hashes. 

## concluding, the bank as trusted party
This methodology might look great but it leaves us with the question on what premise initiaton of a new blockchain ledger is done (how do you proof you lost your private key).
This is where an identity becomes important. An identity strongly represented in the real (non-virtual) world is likely to be the best
protected identity there is and for most of the consumer market, good enough. 

Banks, now holding most of our account information and money, would be able to transform into the trusted parties to confirm our identities
so that new ledgers could be connected to our accounts. 

This might be a way in which blockchain can become a more prominent technology in protecting financial interests of consumers.

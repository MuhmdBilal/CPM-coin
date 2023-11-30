const express = require("express");
const router = express.Router();
const { createTransactionNFT,
    getUserTransactions,
    releaseTokens,
    setTokensBalance,
    tokensBalance,
    transactions,
    totalTransactions,
    transactionIDAddress,
    getAddressForTransaction,
    rescueToken,
    approve,
    transferFrom
} = require("../controllers/transactionNFT");

router.route("/create-transaction-NFT").post(createTransactionNFT)
router.route("/release-tokens").post(releaseTokens)
router.route("/set-tokens-balance").post(setTokensBalance)
router.route("/get-user-transaction/:id").get(getUserTransactions)
router.route("/tokens-balance/:id").get(tokensBalance)
router.route("/transactions/:id").get(transactions)
router.route("/total-transactions").get(totalTransactions)
router.route("/transaction-ID-address/:id").get(transactionIDAddress)
router.route("/get-address-for-transaction/:id").get(getAddressForTransaction)
router.route("/rescue-token").post(rescueToken)
router.route("/approve").post(approve)
router.route("/transfer-from").post(transferFrom)
module.exports = router
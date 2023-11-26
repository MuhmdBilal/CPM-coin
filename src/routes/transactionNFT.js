const express = require("express");
const router = express.Router();
const { createTransactionNFT,
    getUserTransactions,
    releaseTokens,
    setTokensBalance,
    tokensBalance,
    transactions
} = require("../controllers/transactionNFT");

router.route("/create-transaction-NFT").post(createTransactionNFT)
router.route("/release-tokens").post(releaseTokens)
router.route("/set-tokens-balance").post(setTokensBalance)
router.route("/get-user-transaction/:id").get(getUserTransactions)
router.route("/tokens-balance/:id").get(tokensBalance)
router.route("/transactions/:id").get(transactions)


module.exports = router
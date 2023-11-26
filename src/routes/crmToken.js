const express = require("express");
const router = express.Router();
const {createWallet, 
    balanceOf,
    sellAndPurchaseFeePercentage,
    liquidityAndPurchaseFeeAndDecentralizedExchange,
    setSellFeePercentage,
    setPurchaseFeePercentage,
    setLiquidityPoolWallet,
    setPurchaseFeeWallet,
    setDecentralizedExchange
} = require("../controllers/crmToken")

router.route("/create-wallet").get(createWallet)
router.route("/balance-of/:id").get(balanceOf)
router.route("/sell-and-purchase-fee-percentage").get(sellAndPurchaseFeePercentage)
router.route("/liquidity-and-purchase-fee-and-decentralized-exchange").get(liquidityAndPurchaseFeeAndDecentralizedExchange)
router.route("/set-sell-fee-percentage").post(setSellFeePercentage)
router.route("/set-purchase-fee-percentage").post(setPurchaseFeePercentage)
router.route("/set-liquidity-pool-wallet").post(setLiquidityPoolWallet)
router.route("/set-purchase-fee-wallet").post(setPurchaseFeeWallet)
router.route("/set-decentralized-exchange").post(setDecentralizedExchange)
module.exports = router
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
    setDecentralizedExchange,
    approve,
    mint,
    rescueToken,
    rescueUSDT,
    getUSDTAddress
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
router.route("/approve").post(approve)
router.route("/mint").post(mint)
router.route("/rescue-token").post(rescueToken)
router.route("/rescue-USDT").post(rescueUSDT)
router.route("/get-USDT-address").get(getUSDTAddress)
module.exports = router
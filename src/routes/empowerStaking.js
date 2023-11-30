const express = require("express");
const router = express.Router();
const { plans,
    setExchangeRate,
    purchaseStakingPlan,
    withdrawInterest,
    setAdmin,
    tokenId,
    planId,
    userPlans,
    current_exchange_rate,
    single_wallet_address,
    balanceOf,
    getUserStakedBalance,
    ownerOf,
    rescueToken,
    setMaticAddress,
    transferUSDT,
    withdrawCPM,
    approve
} = require("../controllers/empowerStaking")

router.route("/plans/:id").get(plans)
router.route("/set-exchange-rate").post(setExchangeRate)
router.route("/purchase-staking-plan").post(purchaseStakingPlan)
router.route("/withdraw-interest").post(withdrawInterest)
router.route("/set-admin").post(setAdmin)
router.route("/token-id").get(tokenId)
router.route("/plan-id").get(planId)
router.route("/user-plans").get(userPlans)
router.route("/current-exchange-rate").get(current_exchange_rate)
router.route("/single-wallet-address").get(single_wallet_address)
router.route("/balance-of/:id").get(balanceOf)
router.route("/get-user-staked-balance").get(getUserStakedBalance)
router.route("/owner-of/:id").get(ownerOf)
router.route("/rescue-token").post(rescueToken)
router.route("/set-matic-address").post(setMaticAddress)
router.route("/transfer-USDT").post(transferUSDT)
router.route("/withdraw-CPM").post(withdrawCPM)
router.route("/approve").post(approve)
module.exports = router
const express = require("express");
const router = express.Router();
const { plans,
    setExchangeRate,
    purchaseStakingPlan,
    withdrawInterest,
    setAdmin,
    tokenId,
    planId,
    userPlans
} = require("../controllers/empowerStaking")

router.route("/plans/:id").get(plans)
router.route("/set-exchange-rate").post(setExchangeRate)
router.route("/purchase-staking-plan").post(purchaseStakingPlan)
router.route("/withdraw-interest").post(withdrawInterest)
router.route("/set-admin").post(setAdmin)
router.route("/token-id").get(tokenId)
router.route("/plan-id").get(planId)
router.route("/user-plans").get(userPlans)

module.exports = router
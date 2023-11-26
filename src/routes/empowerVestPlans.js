const express = require("express");
const router = express.Router();
const {createStakingPlan,
    purchaseStakingPlan,
    userPlans,
    plansAndTotalPlans
} = require("../controllers/empowerVestPlans");

router.route("/create-staking-plan").post(createStakingPlan);
router.route("/purchase-staking-plan").post(purchaseStakingPlan);
router.route("/user-plans").get(userPlans)
router.route("/plans-and-total-plans").get(plansAndTotalPlans)

module.exports = router
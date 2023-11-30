const express = require("express");
const router = express.Router();
const {createStakingPlan,
    purchaseStakingPlan,
    userPlans,
    plansAndTotalPlans,
    balanceOf,
    uri,
    isApprovedForAll,
    setApprovalForAll,
    safeTransferFrom,
    rescueToken
} = require("../controllers/empowerVestPlans");

router.route("/create-staking-plan").post(createStakingPlan);
router.route("/purchase-staking-plan").post(purchaseStakingPlan);
router.route("/user-plans").get(userPlans)
router.route("/plans-and-total-plans").get(plansAndTotalPlans)
router.route("/balance-of").get(balanceOf)
router.route("/uri/:id").get(uri)
router.route("/is-approved-for-all").get(isApprovedForAll)
router.route("/set-approval-for-all").post(setApprovalForAll);
router.route("/safe-transfer-from").post(safeTransferFrom);
router.route("/rescue-token").post(rescueToken);
module.exports = router
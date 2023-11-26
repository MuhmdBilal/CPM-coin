const { Web3 } = require('web3');
const { empowerStakingAddress, empowerStakingAbi } = require("../contracts/empowerStakingContract")
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');

const empowerStakingContract = new web3.eth.Contract(empowerStakingAbi, empowerStakingAddress);

//get api
exports.plans = async (req, res) => {
    try {
        let number = req.params.id

        let result = await empowerStakingContract.methods.plans(number).call()
        const formattedResult = {
            name: result[0],
            annualRate: Number(result[1]),
            minCPM: Number(result[2]),
            maxCPM: Number(result[3]),
            duration: Number(result[4]),
            interestOption: Number(result[5]),
            lastInterestWithdrawal: Number(result[6]),
        };
        res.status(200).json({
            success: true,
            result: formattedResult,
            message: "plans",
            code: "plans_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.setExchangeRate = async (req, res) => {
    try {
        let { rate, ownerAddress } = req.body;
        const weiAmount = web3.utils.toWei(rate.toString(), 'ether');
        let result = await empowerStakingContract.methods.setExchangeRate(weiAmount)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Exchange Rate",
            code: "setExchangeRate_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.purchaseStakingPlan = async (req, res) => {
    try {
        let { planId, amount, userAddress } = req.body;
        const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
        let result = await empowerStakingContract.methods.purchaseStakingPlan(planId, weiAmount)
            .send({ from: userAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Purchase Staking Plan",
            code: "purchaseStakingPlan_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.withdrawInterest = async (req, res) => {
    try {
        const { plainId, userAddress } = req.body;
        let result = await empowerStakingContract.methods.withdrawInterest(plainId)
            .send({ from: userAddress });

        res.status(200).json({
            success: true,
            result: result,
            message: "Withdraw Interest",
            code: "withdrawInterest_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.setAdmin = async (req, res) => {
    try {
        const { newAdminAddress, ownerAddress } = req.body;
        let result = await empowerStakingContract.methods.setAdmin(newAdminAddress)
            .send({ from: ownerAddress });

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Admin",
            code: "setAdmin_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.tokenId = async (req, res) => {
    try {
        let result = await empowerStakingContract.methods.tokenId().call()
        const resultString = result.toString();

        res.status(200).json({
            success: true,
            result: resultString,
            message: "Token Id",
            code: "tokenId_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.planId = async (req, res) => {
    try {
        let result = await empowerStakingContract.methods.planId().call()
        const resultString = result.toString();

        res.status(200).json({
            success: true,
            result: resultString,
            message: "Plan Id",
            code: "planId_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.userPlans = async (req, res) => {
    try {
        let { address, amount } = req.query
        let ddd = amount.toString()
            let result = await empowerStakingContract.methods.userPlans(address, amount).call()
            const resultString = result.toString();
    
            res.status(200).json({
                success: true,
                result: resultString,
                message: "User Plans",
                code: "userPlans_Api"
            });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}
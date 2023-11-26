const { Web3 } = require('web3');
const { empowerVestPlansAddress, empowerVestPlansAbi } = require("../contracts/empowerVestPlansContract");
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');

const empowerVestPlansContract = new web3.eth.Contract(empowerVestPlansAbi, empowerVestPlansAddress);


//post api
exports.createStakingPlan = async (req, res) => {
    try {
        let { name, annualRate, minCPM, maxCPM, duration, initialSupply, ownerAddress } = req.body;
        let result = await empowerVestPlansContract.methods.createStakingPlan(name, annualRate, minCPM, maxCPM, duration, initialSupply)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Create Staking Plan",
            code: "createStakingPlan_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.purchaseStakingPlan = async (req, res) => {
    try{
    let {planId, amount, userAddress} = req.body;
    const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
    let result = await empowerVestPlansContract.methods.purchaseStakingPlan(planId, weiAmount)
    .send({from: userAddress})

    res.status(200).json({
        success: true,
        result: result,
        message: "Purchase Staking Plan",
        code: "purchaseStakingPlan_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.userPlans = async (req, res) => {
    try {
        let { address, amount } = req.query
        let ddd = amount.toString()
            let result = await empowerVestPlansContract.methods.userPlans(address, amount).call()
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

//get api
exports.plansAndTotalPlans = async(req, res) =>{
    try{
       let totalPlans = await empowerVestPlansContract.methods.totalPlans().call()
       let plans = await  empowerVestPlansContract.methods.plans(totalPlans).call()
       
       res.status(200).json({
        success: true,
        result: plans,
        message: "Plans and Total Plans",
        code: "plansAndTotalPlans_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}
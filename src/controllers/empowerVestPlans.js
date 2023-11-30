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
       const formattedResult = {
        name: plans.name,
        annualRate: Number(plans.annualRate),
        minCPM: Number(plans.minCPM),
        maxCPM: Number(plans.maxCPM),
        duration: Number(plans.duration)
      };
      
       res.status(200).json({
        success: true,
        result: formattedResult,
        message: "Plans and Total Plans",
        code: "plansAndTotalPlans_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

// get api
exports.balanceOf = async (req, res) => {
    try {
        let {address, id} = req.query
        const result = await empowerVestPlansContract.methods.balanceOf(address, id).call();
        const resultString = result.toString();
        res.status(200).json({
            success: true,
            result: resultString,
            message: "Balance Get Successfully.",
            code: "balance_of_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.uri = async(req, res)=>{
    try{
    let {tokenId} = req.params.id;
    let result = await empowerVestPlansContract.methods.uri(tokenId);

    res.status(200).json({
        success: true,
        result: result,
        message: "uri Get Successfully.",
        code: "uri_Api"
    });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.isApprovedForAll = async(req, res) =>{
    try{
      let {accountAddress, operatorAddress } = req.query;
      let result = await empowerVestPlansContract.methods.isApprovedForAll(accountAddress, operatorAddress).call()

      res.status(200).json({
        success: true,
        result: result,
        message: "Is Approved For All",
        code: "isApprovedForAll_Api"
    });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api 
exports.setApprovalForAll = async(req,res)=>{
    try{
    let  {operatorAddress, approved, address  } = req.body;
    let result= await empowerVestPlansContract.methods.setApprovalForAll(operatorAddress, approved)
    .send({from: address}) 

    res.status(200).json({
        success: true,
        result: result,
        message: "Set Approval For All",
        code: "setApprovalForAll_Api"
    });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.safeTransferFrom = async(req, res)=>{
    try{
     let {fromAddress, toAddress, id, value, date, address } = req.body
     let result = await empowerVestPlansContract.methods.safeTransferFrom(fromAddress,toAddress, id, value, date)
     .send({from: address})

     res.status(200).json({
        success: true,
        result: result,
        message: "Safe Transfer From",
        code: "safeTransferFrom_Api"
    });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.rescueToken = async(req,res)=>{
    try{
       const {tokenAddress, amount, ownerAddress} = req.body;
       const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
       let result = await empowerVestPlansContract.methods.rescueToken(tokenAddress, weiAmount)
       .send({from: ownerAddress})

       res.status(200).json({
        success: true,
        result: result,
        message: "Rescue Token",
        code: "rescueToken_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err }); 
    }
}
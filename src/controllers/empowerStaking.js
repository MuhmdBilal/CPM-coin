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

//get api
exports.current_exchange_rate = async(req, res)=>{
    try{
         let result = await empowerStakingContract.methods.CURRENT_EXCHANGE_RATE().call();
         const resultString = result.toString();

         res.status(200).json({
            success: true,
            result: resultString,
            message: "current_exchange_rate",
            code: "current_exchange_rate_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.single_wallet_address = async(req, res)=>{
    try{
        let result = await empowerStakingContract.methods.SINGLE_WALLET_ADDRESS().call();
        
        res.status(200).json({
           success: true,
           result: result,
           message: "single_wallet_address",
           code: "single_wallet_address_Api"
       });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.balanceOf = async (req, res)=>{
    try{
        let address = req.params.id;
         let result = await empowerStakingContract.methods.balanceOf(address).call()
         const resultString = result.toString();

         res.status(200).json({
            success: true,
            result: resultString,
            message: "Balance Of",
            code: "balanceOf_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.getUserStakedBalance = async(req, res)=>{
    try{
        let { userAddress, plainId } = req.query;
        let result = await empowerStakingContract.methods.getUserStakedBalance(userAddress, plainId).call();
        const resultString = result.toString();

        res.status(200).json({
            success: true,
            result: resultString,
            message: "Get User Staked Balance",
            code: "getUserStakedBalance_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.ownerOf = async(req,res)=>{
    try{
        let tokenId = req.params.id;
        let result = await empowerStakingContract.methods.ownerOf(tokenId).call();
        let resultString = result.toString();
        res.status(200).json({
           success: true,
           result: resultString,
           message: "Owner Of",
           code: "ownerOf_Api"
       });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.rescueToken = async(req,res)=>{
    try{
       const {tokenAddress, amount, ownerAddress} = req.body;
       const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
       let result = await empowerStakingContract.methods.rescueToken(tokenAddress, weiAmount)
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

exports.setMaticAddress = async(req, res)=>{
    try{
       let {tokenAddress, ownerAddress} = req.body;
       let result = await empowerStakingContract.methods.setmaticAddress(tokenAddress)
       .send({from : ownerAddress})

       res.status(200).json({
        success: true,
        result: result,
        message: "Set Matic Address",
        code: "setMaticAddress_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.transferUSDT = async (req,res)=>{
    try{
     let {receiverAddress, amount, ownerAddress} = req.body;
     const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
     let result = await empowerStakingContract.methods.transferUSDT(receiverAddress, weiAmount)
     .send({from: ownerAddress})

     res.status(200).json({
        success: true,
        result: result,
        message: "Transfer USDT",
        code: "transferUSDT_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//post api 
exports.withdrawCPM = async(req, res)=>{
    try{
        let {planId, amount, userAddress} = req.body;
        const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
        let result = await empowerStakingContract.methods.withdrawCPM(planId, weiAmount)
        .send({from: userAddress})
   
        res.status(200).json({
           success: true,
           result: result,
           message: "Withdraw CPM",
           code: "withdrawCPM_Api"
       });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

exports.approve = async(req,res) =>{
    try{
     const {toAddress, tokenId, address} = req.body;
     let result = await empowerStakingContract.methods.approve(toAddress, tokenId)
     .send({ from: address})

     res.status(200).json({
        success: true,
        result: result,
        message: "Approve",
        code: "approve_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err }); 
    }
}

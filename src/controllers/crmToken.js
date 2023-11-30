const { Web3 } = require('web3');
const { crmTokenAddress, crmTokenAbi } = require("../contracts/crmTokenContract")
const { ethers } = require('ethers');
// Connect to your Ethereum node
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');
const CrmTokenContract = new web3.eth.Contract(crmTokenAbi, crmTokenAddress);

// get api
exports.createWallet = async (req, res) => {
    try {
        const wallet = ethers.Wallet.createRandom();
        let data = {
            'Wallet Address:': wallet.address,
            'Private Key:': wallet.privateKey
        }
        res.status(200).json({
            success: true, result: data,
            message: "wallet create Successfully.",
            code: "Create_Wallet_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// get api
exports.balanceOf = async (req, res) => {
    try {
        let address = req.params.id
        const result = await CrmTokenContract.methods.balanceOf(address).call();
        const resultString = result.toString();
        res.status(200).json({
            success: true,
            result: resultString,
            message: "Balance Get Successfully.",
            code: "CPM_balanceOf_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// get api
exports.sellAndPurchaseFeePercentage = async (req, res) => {
    try {
        const sellFeePercentage = await CrmTokenContract.methods.sellFeePercentage().call()
        const purchaseFeePercentage = await CrmTokenContract.methods.purchaseFeePercentage().call()
        const resultSellFeePercentage = sellFeePercentage.toString();
        const resultPurchaseFeePercentage = purchaseFeePercentage.toString();
        let result = {
            sellFeePercentage: resultSellFeePercentage,
            purchaseFeePercentage: resultPurchaseFeePercentage
        }
        res.status(200).json({
            success: true,
            result: result,
            message: "Sell Fee Percentage and Purchase Fee Percentage Get Successfully.",
            code: "sellAndPurchaseFeePercentage_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// get api
exports.liquidityAndPurchaseFeeAndDecentralizedExchange = async (req, res) => {
    try {
        let liquidityPoolWallet = await CrmTokenContract.methods.liquidityPoolWallet().call();
        let purchaseFeeWallet = await CrmTokenContract.methods.purchaseFeeWallet().call();
        let decentralizedExchange = await CrmTokenContract.methods.decentralizedExchange().call();

        let result = {
            liquidityPoolWallet: liquidityPoolWallet,
            purchaseFeeWallet: purchaseFeeWallet,
            decentralizedExchange: decentralizedExchange
        }
        res.status(200).json({
            success: true,
            result: result,
            message: "Liquidity Pool Wallet, Purchase Fee Wallet and Decentralized Exchange Get Successfully.",
            code: "liquidityAndPurchaseFeeAndDecentralizedExchange_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post Api
exports.setSellFeePercentage = async (req, res) => {
    try {
        let { newPercentage, ownerAddress } = req.body;
        const result = await CrmTokenContract.methods.setSellFeePercentage(newPercentage)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Sell Fee Percentage",
            code: "setSellFeePercentage_Api"
        });

    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post Api
exports.setPurchaseFeePercentage = async (req, res) => {
    try {
        let { newPercentage, ownerAddress } = req.body;
        const result = await CrmTokenContract.methods.setPurchaseFeePercentage(newPercentage)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Purchase Fee Percentage",
            code: "setPurchaseFeePercentage_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post Api
exports.setLiquidityPoolWallet = async (req, res) => {
    try {
        let { walletAddress, ownerAddress } = req.body;
        let result = await CrmTokenContract.methods.setLiquidityPoolWallet(walletAddress)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Liquidity Pool Wallet",
            code: "setLiquidityPoolWallet_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post Api
exports.setPurchaseFeeWallet = async (req, res) => {
    try {
        let { walletAddress, ownerAddress } = req.body;
        let result = await CrmTokenContract.methods.setPurchaseFeeWallet(walletAddress)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Purchase Fee Wallet",
            code: "setPurchaseFeeWallet_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post Api
exports.setDecentralizedExchange = async (req, res) => {
    try {
        let { exchangeAddress, ownerAddress } = req.body;
        let result = await CrmTokenContract.methods.setDecentralizedExchange(exchangeAddress)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Decentralized Exchange",
            code: "setDecentralizedExchange_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

// post api
exports.approve = async (req, res) => {
    try {
        const { spenderAddress, value, address } = req.body;
        const weiAmount = web3.utils.toWei(value.toString(), 'ether');
        let result = await CrmTokenContract.methods.approve(spenderAddress, weiAmount)
            .send({ from: address })

        res.status(200).json({
            success: true,
            result: result,
            message: "Approved successfully",
            code: "approve_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.mint = async (req, res) => {
    try {
        const { amount, ownerAddress } = req.body;
        const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
        const result = await CrmTokenContract.methods.mint(weiAmount)
        .send({from: ownerAddress})

        res.status(200).json({
            success: true,
            result: result,
            message: "Mint successfully",
            code: "mint_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.rescueToken = async(req, res)=>{
    try{
        const { ownerAddress } = req.body;
        const result = await CrmTokenContract.methods.rescueToken()
        .send({from: ownerAddress})

        res.status(200).json({
            success: true,
            result: result,
            message: "Rescue Token successfully",
            code: "rescueToken_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.rescueUSDT = async(req, res) => {
    try{
        const { amount, ownerAddress } = req.body;
        const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
        const result = await CrmTokenContract.methods.rescueUSDT(weiAmount)
        .send({from: ownerAddress})

        res.status(200).json({
            success: true,
            result: result,
            message: "Rescue USDT successfully",
            code: "rescueUSDT_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

// get api
exports.getUSDTAddress = async(req, res) => {
    try{
      const result = await CrmTokenContract.methods.getUSDTAddress().call()

      res.status(200).json({
        success: true,
        result: result,
        message: "Get USDT Address successfully",
        code: "getUSDTAddress_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}


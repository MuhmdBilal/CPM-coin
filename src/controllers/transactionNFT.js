const { Web3 } = require('web3');
const { transactionNftAddress, transactionNftAbi } = require("../contracts/transactionNFTContract")

const web3 = new Web3('https://rpc-mumbai.maticvigil.com');
const transactionNftContract = new web3.eth.Contract(transactionNftAbi, transactionNftAddress);

//post api
exports.createTransactionNFT = async (req, res) => {
    try {
        const { recipientAddress, amount, releaseDate, transactionType, senderAddress } = req.body;
        const result = await transactionNftContract.methods
            .createTransactionNFT(recipientAddress, amount, releaseDate, transactionType)
            .send({ from: senderAddress });

        res.status(200).json({
            success: true,
            result: result.transactionHash,
            message: "TransactionNFT create successfully.",
            code: "createTransactionNFT_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.getUserTransactions = async (req, res) => {
    try {
        let address = req.params.id;
        const result = await transactionNftContract.methods.getUserTransactions(address).call();
        res.status(200).json({
            success: true,
            result: result,
            message: "Get User Transaction Successfully.",
            code: "getUserTransactions_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.releaseTokens = async (req, res) => {
    try {
        const { transactionId, userAddress } = req.body;
        let result = await transactionNftContract.methods.releaseTokens(transactionId)
            .send({ from: userAddress });

        res.status(200).json({
            success: true,
            result: result,
            message: "Release Token",
            code: "releaseTokens_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.setTokensBalance = async (req, res) => {
    try {
        const { userAddress, balance, ownerAddress } = req.body;
        let result = await transactionNftContract.methods.setTokensBalance(userAddress, balance)
            .send({ from: ownerAddress })

        res.status(200).json({
            success: true,
            result: result,
            message: "Set Tokens Balance",
            code: "setTokensBalance_Api"
        });
    } catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.tokensBalance = async(req, res)=>{
    try{
        let address = req.params.id;
        let result = await transactionNftContract.methods.tokensBalance(address).call();
        const resultString = result.toString();
        res.status(200).json({
            success: true,
            result: resultString,
            message: "Tokens Balance",
            code: "tokensBalance_Api"
        });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.transactions = async(req, res)=>{
    try{
        let totalTransactionsNo = req.params.id;
        let result = await transactionNftContract.methods.transactions(totalTransactionsNo).call();
        const formattedResult = {
            transactionId: Number(result.transactionId),
            amount: Number(result.amount),
            releaseDate: Number(result.releaseDate),
            transactionType: Number(result.transactionType)
          };
          
        res.status(200).json({
            success: true,
            result: formattedResult,
            message: "Transactions",
            code: "transactions_Api"
        });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api 
exports.totalTransactions = async(req, res)=>{
    try{
       let result = await transactionNftContract.methods.totalTransactions().call();
       const resultString = result.toString();
       res.status(200).json({
        success: true,
        result: resultString,
        message: "Total Transactions",
        code: "totalTransactions_Api"
    });
    }catch (err) {
        res.status(500).send({ success: false, message: err });
    }
}

//get api 

exports.transactionIDAddress = async(req, res) =>{
    try{
        let nftId = req.params.id;
        const result = await transactionNftContract.methods.transactionIDAddress(nftId).call();

        res.status(200).json({
            success: true,
            result: result,
            message: "Transaction ID Address",
            code: "transactionIDAddress_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//get api
exports.getAddressForTransaction = async(req, res)=>{
    try{
        let transactionID = req.params.id;

        const result = await transactionNftContract.methods.getAddressForTransaction(transactionID).call();

        res.status(200).json({
            success: true,
            result: result,
            message: "Get Address For Transaction",
            code: "getAddressForTransaction_Api"
        });
    }catch(err){
        res.status(500).send({ success: false, message: err });
    }
}

//post api
exports.rescueToken = async(req,res)=>{
    try{
       const {amount, ownerAddress} = req.body;
       const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
       let result = await transactionNftContract.methods.rescueToken(weiAmount)
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

//post api 
exports.approve = async(req,res) =>{
    try{
     const {userAddress, tokenId, address} = req.body;
     let result = await transactionNftContract.methods.approve(userAddress, tokenId)
     .send({ from: address})

     res.status(200).json({
        success: true,
        result: result,
        message: "approve",
        code: "approve_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err }); 
    }
}

// post api
exports.transferFrom = async(req, res)=>{
    try{
      const {fromAddress, toAddress, tokenId, address} = req.body;
      let result = await transactionNftContract.methods.transferFrom(fromAddress, toAddress, tokenId)
      .send({from : address})

      res.status(200).json({
        success: true,
        result: result,
        message: "Transfer From",
        code: "transferFrom_Api"
    });
    }catch(err){
        res.status(500).send({ success: false, message: err }); 
    }
}
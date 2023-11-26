const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const crmToken = require("./src/routes/crmToken");
const empowerStaking = require("./src/routes/empowerStaking");
const empowerVestPlans = require("./src/routes/empowerVestPlans");
const transactionNFT = require("./src/routes/transactionNFT");
const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
// Load env file
dotenv.config({path: './config.env'})

// Router File
app.use("/api/v1/CPM", crmToken)
app.use("/api/v1/empower-staking", empowerStaking)
app.use("/api/v1/empower-vest-plans", empowerVestPlans)
app.use("/api/v1/transaction-NFT", transactionNFT)


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
const validate = require("validate.js");
const nodeConfigConstraints = require('./constraints/nodeConfigConstraints');
const walletConfigConstraints = require('./constraints/walletConfigConstraints');
const transactionConstraints = require('./constraints/transactionConstraints');

module.exports = {
    validateNodeConfig: function (config){
        return validate(config, nodeConfigConstraints);
    },
    validateWalletConfig: function (config){
        return validate(config, walletConfigConstraints);
    },
    validateTransaction: function (options) {
        return validate(options, transactionConstraints);
    }
}
const {logError} = require('./utils/loggers');
const initializeNodeClient = require('./config/node');
const initializeWalletClient = require('./config/wallet');
const {validateTransaction} = require('./utils/validation/validators');


class BitcoinApi{
    constructor(nodeClientConfig, walletConfig){
        if(!nodeClientConfig){
            throw new Error('should pass node config object as first parameter')
        }
        
        if(!walletConfig){
            throw new Error('should pass wallet config object as second parameter')
        }

        this.nodeClient = initializeNodeClient(nodeClientConfig);
        const { wallet, walletClient } = initializeWalletClient(walletConfig);
        this.wallet = wallet;
        this.walletClient = walletClient;
    }

    getNodeInfo(){
        try {
            return this.nodeClient.getInfo();
        }catch (error){
            logError(error);
        }
    }

    async getWalletTransferData(transactionId){
        try {
            let transaction = await this.wallet.getTX(transactionId);
            transaction = JSON.parse(transaction.body);
            return transaction;
        }catch (error) {
            logError(error);
        }
    }

    async getAccount(accountName){
        if (!accountName) {
            throw new Error('Pass accountName as an argument.');
        }

        try {
            const result = await this.wallet.getAccount(accountName)
            return {account: result};
        } catch (error) {
            logError(error);
        }
    };

    async getWalletBalance(accountName){
        if (!accountName) {
            accountName = 'default';
        }

        try {
            const balance = await this.wallet.getBalance(accountName);
            return {balance: balance};
        } catch (error) {
            logError(error);
        }
    };

    async listAddresses(accountName){
        if (!accountName) {
            throw new Error('Pass accountName as an argument.');
        }

        try {
            const result = await this.walletClient.execute('getaddressesbyaccount', [accountName]);
            return {addresses: result};
        } catch (error) {
            logError(error);
        }
    }

    async listTransfers(accountName){
        if (!accountName) {
            throw new Error('Pass accountName as an argument.');
        }

        try {
            const transactions =  await this.walletClient.execute('listtransactions', [accountName]);
            return {transactions: transactions};
        } catch (e) {
            logError(error);
        }
    };

    async createAddress(walletPassPhrase, accountName){
        if (!accountName){
            throw new Error("Pass accountName as an argument.");
        }

        if (!walletPassPhrase){
            throw new Error("Pass walletPassPhrase as an argument.");
        }

        try {
            let options = {
                passphrase: walletPassPhrase,
                type: 'pubkeyhash',
                witness: true,
                name: accountName
            }
            await this.wallet.createAccount(accountName, options);
            const getAddress =  await this.getAccountAddress(accountName);
            return {address: getAddress};
        } catch (error) {
            logError(error);
        }
    }

    async getAccountAddress(accountName){
        if (!accountName){
            throw new Error("Pass accountName as an argument.");
        }

        try {
            const address =  await this.walletClient.execute('getaccountaddress', [accountName]);
            return {address: address};
        }catch (error){
            logError(error);
        }
    }

    async estimateFee (numberOfBlocks){
        numberOfBlocks = Number(numberOfBlocks);
        if (!numberOfBlocks) {
            throw new Error("Pass numberOfBlocks as an argument.");
        }

        if(!Number.isInteger(numberOfBlocks)){
            throw new Error("NumberOfBlocks as should be a number.");
        }

        try {
            const fee = await this.nodeClient.execute('estimatefee', [numberOfBlocks]);
            return {fee: fee};
        } catch (error) {
            logError(error);
        }
    }

    async buildTransaction(options ){
        const result = validateTransaction(options)
        if(result){
            throw new Error(result);
        }

        try {
            let address = options.address;
            let amount = parseFloat(options.amount);

            const transactionOptions = {
                passphrase: options.walletPassphrase,
                rate: options.fee,
                maxFee: options.fee,
                subtractFee: false,
                sign: true,
                outputs: [
                    {
                        value: amount,
                        address
                    }
                ]
            };

            const transaction = await this.wallet.createTX(transactionOptions)
            return {transaction: transaction};
        }catch (error){
            logError(error);
        }
    }

    async sendTransaction(hexTransaction){
        if (!hexTransaction){
            throw new Error("Pass hexadecimal transaction as an argument.");
        }

        try {
            let transactionHash = await this.nodeClient.execute('sendrawtransaction', [hexTransaction])
            return {hash: transactionHash};
        } catch (error) {
            logError(error)
        }
    }
}

module.exports = BitcoinApi;
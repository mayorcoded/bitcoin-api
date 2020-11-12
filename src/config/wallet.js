const {Network, WalletClient} = require('bcoin.js');
const { validateWalletConfig } = require('../utils/validation/validators')

function initializeWalletClient(config){
    const walletConfigValidation = validateWalletConfig(config);
    if(walletConfigValidation){
        throw new Error(Object.values(walletConfigValidation)[0]);
    }

    const id = config.walletId;
    const token = config.walletToken;
    const network = Network.get(config.walletNetwork);
    const walletClientOptions = {
        host: config.walletHost,
        network: network.type,
        port: network.walletPort,
        apiKey: config.walletApiKey,
        token: config.walletToken,
        ssl: true
    };

    const walletClient = new WalletClient(walletClientOptions);
    const wallet = walletClient.wallet(id, token);
    return {wallet, walletClient};
}

module.exports = initializeWalletClient;
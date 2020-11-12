const {Network, NodeClient} = require('bcoin.js');
const { validateNodeConfig } = require('../utils/validation/validators')

function initializeNodeClient(config){
    const nodeConfigValidation = validateNodeConfig(config);
    if(nodeConfigValidation){
        throw new Error(Object.values(nodeConfigValidation)[0]);
    }

    const network = Network.get(config.nodeNetwork);
    const nodeClientOptions = {
        host: config.nodeHost,
        network: network.nodeType,
        port: network.rpcPort,
        apiKey: config.nodeApiKey,
        ssl: true
    };

    return (new NodeClient(nodeClientOptions));
}

module.exports = initializeNodeClient;
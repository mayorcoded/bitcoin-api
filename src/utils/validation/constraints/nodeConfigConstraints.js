const constraints = {
    nodeNetwork: {
        presence: {message: 'must be added to config object'},
    },
    nodeHost: {
        presence: {message: 'must be added to config object'}
    },
    nodeApiKey: {
        presence: {message: 'must be added to config object'}
    }
}

module.exports = constraints;

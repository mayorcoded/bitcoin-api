const constraints = {
    walletId: {
        presence: {message: 'must be added to config object'},
    },
    walletToken: {
        presence: {message: 'must be added to config object'},
    },
    walletNetwork: {
        presence: {message: 'must be added to config object'},
    },
    walletHost: {
        presence: {message: 'must be added to config object'}
    },
    walletApiKey: {
        presence: {message: 'must be added to config object'}
    }
}

module.exports = constraints;

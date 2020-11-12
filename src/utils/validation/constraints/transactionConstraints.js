const constraints = {
    walletPassphrase: {
        presence: {message: 'walletPassphrase must be added to options object.'},
    },
    fee: {
        presence: {message: 'fee  must be added to options object.'}
    },
    address: {
        presence: {message: 'address must be added to options object.'}
    },
    amount: {
        presence: {message: 'amount must be added to options object.'}
    }
}

module.exports = constraints;

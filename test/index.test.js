const BitcoinApi = require('../src/index');

describe('test index.js', () => {
    it('should throw when config objects for instance are not passed', () => {
        expect(() => {const bitcoinApi = new BitcoinApi();}).toThrow()
    })

    it('should throw when either config objects for instance are not passed', () => {
        expect(() => {const bitcoinApi = new BitcoinApi({});}).toThrow()
        expect(() => {const bitcoinApi = new BitcoinApi(null,{});}).toThrow()
    })

})
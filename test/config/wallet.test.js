const WalletClient = require('../../src/config/wallet');
describe('wallet test', () => {
    it('should throw an error when config is not passed', async () =>{

        try{
            const walletClient = new WalletClient({
                walletId: "",
                walletToken: "",
                walletNetwork: "",
                walletHost: "",
                walletApiKey: ""
            });
        }catch (error){
            console.log(error);
        }
        expect(() => { const walletClient = new WalletClient(); }).toThrow('');
    })
    it('should not throw an error when config is not passed', async () =>{

        expect(() => { const walletClient = new WalletClient({
            walletId: "",
            walletToken: "",
            walletNetwork: "",
            walletHost: "",
            walletApiKey: ""
        })}).not.toThrow("");
    })
})
const NodeClient = require('../../src/config/node');
describe('node test', () => {
    it('should throw an error when config is not passed',  () =>{
        try{
            const nodeClient = new NodeClient({
                nodeNetwork: "",
                nodeHost: "",
                nodeApiKey: "",
                nodeType: ""
            });
        }catch (error){
            console.log(error);
        }
        expect(() => { const nodeClient = new NodeClient(); }).toThrow('');
    })
    it('should not throw an error when config is not passed',  () =>{
        expect(() => { const nodeClient = new NodeClient({
            nodeNetwork: "",
            nodeHost: "",
            nodeApiKey: "",
            nodeType: ""
        }); }).not.toThrow("");
    })
})
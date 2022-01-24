const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "direct coconut weapon stand monitor nest noise federal tide call manage key", //This is account mnemonics of metamask
  "https://rinkeby.infura.io/v3/b9db1cfb55324863ba8e8f7bbb602d62" //This is infura rinkeby test network api
);
const web3 = new Web3(provider);

//This deploy funciton contains two async calls: 1 getting all accounts, 2nd deploying contract
const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Our acccount", accounts[0]);
    //THIS IS DEPLOYMENT OF CONTRACT
    const result = await new web3.eth.Contract(JSON.parse(interface)) //this is abi that we are pasrsing as json
      .deploy({
        data: bytecode, //contract bytecode
        arguments: ["Hi There!"],
      })
      .send({
        gas: "10000000", //10 million
        from: accounts[0],
      });
    console.log("Address is deployed to: ", result.options.address);

    provider.engine.stop();
  } catch (err) {
    console.log("Error is ", err);
  }
};

//Deployed to 0x2BeE9439C7d2CFd901d1a46778E7e3Ef05DfB1B3

deploy();

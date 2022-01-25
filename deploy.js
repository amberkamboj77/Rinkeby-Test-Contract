const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, evm } = require("./compile");

provider = new HDWalletProvider(
  "direct coconut weapon stand monitor nest noise federal tide call manage key", //This is account mnemonics of metamask
  "https://rinkeby.infura.io/v3/b9db1cfb55324863ba8e8f7bbb602d62" //This is infura rinkeby test network api
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  // Contract deployed to 0x37A6544890C9E3BeE63627d02D6202AE1FD8cC77
  provider.engine.stop();
};

deploy();

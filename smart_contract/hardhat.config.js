// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.4",
// };

// end of hardhat code....

// http key -  https://eth-rinkeby.alchemyapi.io/v2/l8jTd8sufWS0rSMzJgFmc3uGKIvbH-X-

require('@nomiclabs/hardhat-waffle');



module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/l8jTd8sufWS0rSMzJgFmc3uGKIvbH-X-',
      accounts: [ 'afca872306ccfa14cc5568926701b3dacf0f7992957f04ba6cd3c2450bc5eaaa' ]
    }
  }
}


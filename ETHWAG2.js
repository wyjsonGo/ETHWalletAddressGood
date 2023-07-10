/**
 * @author Wyjson
 * @version 2 主要寻找前6位相同的账号
 * @date 2021-06-17 15:27
 * 离线生成以太坊钱包靓号地址(Generate an Ethereum wallet good account number offline)
 * 1. npm install ethers@5.6.0
 */
//引入ethers.js
const ethers = require('ethers');
console.log('ethers.version:'+ethers.version);

//靓号正则
const AAAAAA1 = new RegExp("^([\\w])\\1{6,}","g");// 前7位相同

for(;;){
    //拿到生成的钱包信息
    let wallet = ethers.Wallet.createRandom();

    //获取钱包地址
    let address = wallet.address;

    let isLog = false;

    if (AAAAAA1.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^AAAAAA)")
    }

	if (isLog) {
        console.log(`钱包地址: ${address} |【${address.substring(address.length-5)}】`) // 提取后5位高亮

        //获取钱包的私钥
        let privateKey = wallet.privateKey;
        console.log(`钱包私钥: ${privateKey.substring(2)}`) // 去掉开头的0x

        //获取助记词
        let mnemonic = wallet.mnemonic;
        console.log(`钱包助记词: ${mnemonic.phrase}`)
        console.log("-------------------------------------------------------------------")
	}
}




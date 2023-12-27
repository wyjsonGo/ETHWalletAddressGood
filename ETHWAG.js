/**
 * @author Wyjson
 * @version 1
 * @date 2021-06-17 15:27
 * 离线生成以太坊钱包靓号地址(Generate an Ethereum wallet good account number offline)
 * 1. npm install ethers@5.6.0
 */
//引入ethers.js
const ethers = require('ethers');
console.log('ethers.version:'+ethers.version);

//靓号正则
// let a0x0 = new RegExp("^0x0","g");// 开头不能是0x0

const aaaaaa = new RegExp("([\\d])\\1{5,}","g");// 111111或222222
const dead0000 = new RegExp("^dead0000","g");// 以dead0000开头

const AAAA1 = new RegExp("^([\\w])\\1{3,}","gi");// 前4位相同
const AAAAA2 = new RegExp("([\\w])\\1{4,}$","gi");// 后5位相同

const a80808080 = new RegExp("^80808080","g");// 以80808080开头
const a90909090 = new RegExp("^90909090","g");// 以90909090开头
const a58585858 = new RegExp("^58585858","g");// 以58585858开头

const AAAAAA1 = new RegExp("^([\\w])\\1{5,}","g");// 前6位相同

for(;;){
    //拿到生成的钱包信息
    let wallet = ethers.Wallet.createRandom();

    //获取钱包地址
    let address = wallet.address;

    let isLog = false;

    if (aaaaaa.exec(address) != null) {
    	isLog = true;
        console.log("正则(aaaaaa)")
    }
    if (dead0000.exec(address.substring(2)) != null) {
    	isLog = true;
        console.log("正则(^dead0000)")
    }
    if (AAAA1.exec(address.substring(2)) != null && AAAAA2.exec(address.substring(2)) != null) {
    	isLog = true;
        console.log("正则(AAAA+AAAAA$)")
    }

    if (AAAAAA1.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^AAAAAA)")
    }

    if (a80808080.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^80808080)")
    }
    if (a90909090.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^90909090)")
    }
    if (a58585858.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^58585858)")
    }

    // if (a0x0.exec(address) != null) {
    // 	isLog = false;
    // }

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




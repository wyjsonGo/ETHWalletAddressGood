/**
 * @author Wyjson
 * @version 1
 * @date 2021-06-17 15:27
 * 离线生成以太坊钱包靓号地址(Generate an Ethereum wallet good account number offline)
 */
//引入ethers.js
var ethers = require('ethers');
console.log('ethers.version:'+ethers.version);

//靓号正则
// var a0x0 = new RegExp("^0x0","g");// 开头不能是0x0

var aaaaaa = new RegExp("([\\d])\\1{5,}","g");// 111111或aaaaaa
var dead0000 = new RegExp("^dead0000","g");// 以dead0000开头

var AAAA1 = new RegExp("^([\\w])\\1{3,}","gi");// 前4位相同
var AAAAA2 = new RegExp("([\\w])\\1{4,}$","gi");// 后5位相同

var a80808080 = new RegExp("^80808080","g");// 以80808080开头
var a90909090 = new RegExp("^90909090","g");// 以90909090开头
var a58585858 = new RegExp("^58585858","g");// 以58585858开头

var AAAAAA1 = new RegExp("^([\\w])\\1{5,}","g");// 前6位相同

for(;;){
    //拿到生成的钱包信息
    var wallet = ethers.Wallet.createRandom();

    //获取钱包地址
    var address = wallet.address;

    var isLog = false;

    if (aaaaaa.exec(address) != null) {
    	isLog = true;
        console.log("正则(aaaaaa)")
    }
    if (dead0000.exec(address.substring(2)) != null) {
    	isLog = true;
        console.log("正则(^dead0000)")
    }
    if (AAAA1.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(^AAAA)")
    }
    if (AAAAA2.exec(address.substring(2)) != null) {
        isLog = true;
        console.log("正则(AAAAA$)")
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
        console.log(`钱包地址： ${address} |【${address.substring(address.length-5)}】`) // 提取后5位高亮

        //获取钱包的私钥
        var privateKey = wallet.privateKey;
        console.log(`钱包私钥： ${privateKey.substring(2)}`) // 去掉开头的0x

        //获取助记词
        var mnemonic = wallet.mnemonic;
        console.log(`钱包助记词： ${mnemonic.phrase}`)
        console.log("-------------------------------------------------------------------")
	}
}




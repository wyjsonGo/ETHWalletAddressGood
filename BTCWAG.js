/**
 * @author Wyjson
 * @version 1
 * @date 2022-03-15 16:13:25
 * 离线生成BTC钱包靓号地址(Generate an Bitcoin wallet good account number offline)
 * 1. npm install bip32@2.0.6
 * 2. npm install bip39@3.0.4
 * 3. npm install bitcoinjs-lib@6.0.1
 */
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.bitcoin;

//靓号正则
const w5 = new RegExp("([\\w])\\1{4,}","g");// 连续

const sw4 = new RegExp("^([\\w])\\1{3,}","g");// 前4位相同

const BTC = new RegExp("^Bitcoin","g");// 以BTC开头

const path = "m/44'/0'/0'/0/0";
const swPath = "m/49'/0'/0'/0/0";// sw 隔离见证
for(;;){
    var mnemonic = bip39.generateMnemonic();
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var node = bip32.fromSeed(seed);
    var wif = node.derivePath(path).toWIF();

//    var p2pkh = bitcoin.payments.p2pkh({ pubkey: node.derivePath(path).publicKey, network : network });
//    var address1 = p2pkh.address;

    var p2wpkh = bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey: node.derivePath(swPath).publicKey, network : network }) })
    var address3 = p2wpkh.address;

    var isLog = false;

    if (w5.exec(address3.substring(1)) != null) {
        isLog = true;
        console.log("正则(w5)")
    }

    if (sw4.exec(address3.substring(1)) != null) {
        isLog = true;
        console.log("正则(^w4)")
    }

    if (BTC.exec(address3.substring(1)) != null) {
        isLog = true;
        console.log("正则(^BTC)")
    }

	if (isLog) {
        console.log(`钱包地址： ${address3}`);
        console.log(`钱包助记词： ${mnemonic}`)
        console.log("-------------------------------------------------------------------")
	}
}






















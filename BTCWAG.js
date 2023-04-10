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
const w4 = new RegExp("^([\\w])\\1{3,}","g");// 前4位相同

// const aabb = new RegExp("^(.)\\1(.)\\2","g");// AABB
const abab = new RegExp("^(.)(.)\\1\\2","g");// ABAB

const BTC = new RegExp("^Bitcoin","gi");// 以BTC开头

for(;;){
    // var mnemonic = "love slogan menu thunder liquid pave economy subject deposit organ trick loyal";
    var mnemonic = bip39.generateMnemonic();
    var seed = bip39.mnemonicToSeedSync(mnemonic);

    // Legacy (P2PKH)格式 1LuXraXCFcWCMVWqnjigvZMmjSBmHY4Vez
    var path = bip32.fromSeed(seed).derivePath("m/44'/0'/0'/0/0");
    var privateKey = path.toWIF();
    var p2pkh = bitcoin.payments.p2pkh({ pubkey: path.publicKey, network : network });
    var address = p2pkh.address;

    
    var swPath = bip32.fromSeed(seed).derivePath("m/49'/0'/0'/0/0");// sw 隔离见证
    var privateKey3 = swPath.toWIF();

    // Native SegWit (Bech32)格式 bc1qwyuzkw5k3u90cq7sgj2nmj6f7ya0u7wxswhent
    var bc1 = bitcoin.payments.p2wpkh({ pubkey: swPath.publicKey, network : network });
    var address3bc1 = bc1.address;

    // Nested SegWit (P2SH)格式 3LoE438ufVn99qgaX5Gwvi22iAgKBzF9Hd
    var p2wpkh = bitcoin.payments.p2sh({ redeem: bc1 })
    var address3 = p2wpkh.address;

    

    var isLog = false;

    if (w4.exec(address3bc1.substring(4)) != null) {
        isLog = true;
        console.log("正则(^w4)")
    }

    if (abab.exec(address3bc1.substring(4)) != null) {
        isLog = true;
        console.log("正则(^ABAB)")
    }

    if (BTC.exec(address3bc1.substring(4)) != null) {
        isLog = true;
        console.log("正则(^BTC)")
    }

	if (isLog) {
        console.log(`钱包地址Legacy-1： ${address}`);
        console.log(`钱包私钥Legacy-1： ${privateKey}`);
        console.log(`钱包地址SegWit-3： ${address3}`);
        console.log(`钱包私钥SegWit-3： ${privateKey3}`);
        console.log(`钱包地址SegWit-3-bc1： ${address3bc1}`);
        console.log(`钱包助记词： ${mnemonic}`)
        console.log("-------------------------------------------------------------------")
	}
}






















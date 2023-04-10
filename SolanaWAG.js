/**
 * @author Wyjson
 * @version 1
 * @date 2023-03-16 15:47:53
 * 离线生成Solana钱包靓号地址(Generate an Solana wallet good account number offline)
 * 1. npm install ed25519-hd-key
 */
const bs58 = require("bs58");
const bip39 = require('bip39');
const nacl = require("tweetnacl") // nacl
const ed25519 = require('ed25519-hd-key');

const derivePath = "m/44'/501'/0'/0'";

//靓号正则
const sw_ = new RegExp("^([\\w])\\1{5,}","g");// 前6位相同

const solana = new RegExp("^Solana","gi");// 以Solana开头
const sol = new RegExp("^Sol","gi");// 以Sol开头
const sol_ = new RegExp("^SOL","gi");// 以SOL开头
const aabb = new RegExp("^(.)\\1(.)\\2","g");// AABB
const abab = new RegExp("^(.)(.)\\1\\2","g");// ABAB

for(;;){
    var mnemonic = bip39.generateMnemonic();
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var derivedSeed = ed25519.derivePath(derivePath, seed.toString('hex')).key;
    var signSeed = nacl.sign.keyPair.fromSeed(derivedSeed);
    var privateKey = bs58.encode(signSeed.secretKey);
    var address = bs58.encode(signSeed.publicKey);

    var isLog = false;

    if (sw_.exec(address) != null) {
        isLog = true;
        console.log("正则(^sw_)")
    }
    if (solana.exec(address) != null) {
        isLog = true;
        console.log("正则(^Solana)")
    }
    if (sol.exec(address) != null) {
        isLog = true;
        console.log("正则(^Sol)")
    }
    if (sol_.exec(address) != null) {
        isLog = true;
        console.log("正则(^SOL)")
    }
    if (aabb.exec(address) != null) {
        isLog = true;
        console.log("正则(^AABB)")
    }
    if (abab.exec(address) != null) {
        isLog = true;
        console.log("正则(^ABAB)")
    }

    if (isLog) {
        console.log(`钱包地址： ${address}`);
        console.log(`钱包私钥： ${privateKey}`);
        console.log(`钱包助记词： ${mnemonic}`);
        console.log("-------------------------------------------------------------------");
    }
}








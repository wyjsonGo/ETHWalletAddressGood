/**
 * @author Wyjson
 * @version 1
 * @date 2022-03-15 16:13:25
 * 离线生成BTC钱包靓号地址(Generate an Bitcoin wallet good account number offline)
 * 1. npm install bip32@2.0.6
 * 2. npm install bip39@3.0.4
 * 3. npm install bitcoinjs-lib
 * 4. npm install tiny-secp256k1
 */
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
const network = bitcoin.networks.bitcoin;
const ecc = require('tiny-secp256k1');
bitcoin.initEccLib(ecc);

//靓号正则
const w4 = new RegExp("^([\\w])\\1{3,}","g");// 前4位相同

const aabb = new RegExp("^(.)\\1(.)\\2","g");// AABB
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

    // Nested SegWit (P2SH)格式 3LoE438ufVn99qgaX5Gwvi22iAgKBzF9Hd
    var swPath = bip32.fromSeed(seed).derivePath("m/49'/0'/0'/0/0");
    var privateKey3 = swPath.toWIF();
    var p2wpkh = bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2wpkh({ pubkey: swPath.publicKey, network : network }) })
    var address3 = p2wpkh.address;

    // Native SegWit (Bech32)格式 bc1qjmfmsaj2mvgd7n46qrms6avlu0ku4qgrns9x7w
    var bech32Path = bip32.fromSeed(seed).derivePath("m/84'/0'/0'/0/0");
    var privateKey3bc1q = bech32Path.toWIF();   
    var bc1q = bitcoin.payments.p2wpkh({ pubkey: bech32Path.publicKey, network : network });
    var address3bc1q = bc1q.address;

    // Taproot (P2TR)格式 bc1ptyurxq9h7v4p6va48pd4nhu5lup9ttszhpnn3fggg59dup6j9n9srk3030
    var bech32mPath = bip32.fromSeed(seed).derivePath("m/86'/0'/0'/0/0");
    var privateKey3bc1p = bech32mPath.toWIF();   
    var bc1p = bitcoin.payments.p2tr({ internalPubkey: bech32mPath.publicKey.slice(1, 33), network : network });
    var address3bc1p = bc1p.address;

    var isLog = false;

    if (w4.exec(address3bc1p.substring(4)) != null) {
        isLog = true;
        console.log("正则(^w4)")
    }

    if (aabb.exec(address3bc1p.substring(4)) != null) {
        isLog = true;
        console.log("正则(^AABB)")
    }

    if (abab.exec(address3bc1p.substring(4)) != null) {
        isLog = true;
        console.log("正则(^ABAB)")
    }

    if (BTC.exec(address3bc1p.substring(4)) != null) {
        isLog = true;
        console.log("正则(^BTC)")
    }
    
    if (isLog) {
        console.log(`地址Legacy (P2PKH)： ${address}`);
        console.log(`私钥Legacy (P2PKH)： ${privateKey}`);
        console.log(`地址Nested SegWit (P2SH)： ${address3}`);
        console.log(`私钥Nested SegWit (P2SH)： ${privateKey3}`);
        console.log(`地址Native SegWit (Bech32)： ${address3bc1q}`);
        console.log(`私钥Native SegWit (Bech32)： ${privateKey3bc1q}`);
        console.log(`地址Taproot (P2TR)： ${address3bc1p}`);
        console.log(`私钥Taproot (P2TR)： ${privateKey3bc1p}`);
        console.log(`助记词： ${mnemonic}`)
        console.log("-------------------------------------------------------------------")
    }
}





















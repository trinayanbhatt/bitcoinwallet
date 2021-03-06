
// // required bitcore.js libraries to interact with blockchain //
    var bitcore = require('bitcore-lib');
    var Mnemonic = require('bitcore-mnemonic');
    buffer = bitcore.util.buffer;
//     // Buffer = require('buffer');

// List of global variables declared and Console toggle can be achieved by changing the value of CONSOLE_DEBUG to either true or false //



var CONSOLE_DEBUG = true;
var privkey1;
var pubaddr;
var publicKey;
var redeemScript;
var publicAddress;
var net = localStorage.getItem("network");
var Bal;
pubaddr = localStorage.getItem("pubaddr");
var mainNetAddr;
var testNetAddr;
var address_pubkeyhash_version;
var address_checksum_value;
var private_key_version;
wordListLang = 'ENGLISH';
entropyLength = 256;
var password;
var seed;
var MnemonicsArray;
var isvalid;
var hex;
var decodedvout;
var txid;
var scriptHash;
var finaltxid;
var privateKey;
var multisigaddress;
var finalhex;
address_pubkeyhash_version = '00';
address_checksum_value = '00000000';
private_key_version = '80';
var str1 = "http://194.135.82.88:2733/Buybit/tx/";

$('document').ready(function(){

    //addressGenrationScript();
    BitcoreAddressGenerator();
    checkValidity();
    restore();

  
    //$('#modal1').modal();

    // $('#registered_adr').val== localStorage.getItem(publicAddress);
    inputboxPublicAddress = localStorage.getItem("publicAddress");
    jQuery('#registered_adr').val(inputboxPublicAddress);


    listaddresstransactions(multisigaddress);
    walletLoginOnclickFunction();

});




// function addressGenrationScript(){
//     $('#createKeyPairsBtn').click(function(){
//         $.ajax({
//             type: "POST",
//             // url: "/assets"
//             url: 'assets/api/createkeypairs.php',
//             data: ({
               
//             }),
//             success: function(Response) {
//                 var x = Response;
//                 console.log(x); 
//                 x = JSON.parse(x);
//                 publicKey = x.result[0].pubkey;
//                 publicAddress = x.result[0].address;

//                 importAddress(publicAddress);

                
//                 createmultisig();
                          
//             }
//         });
//     });
// }


function createmultisig(publicKey){

    var address;

    $.ajax({
        type: "POST",
        url: 'assets/api/createmultisig.php',
        async: false,
        data: ({
           publicKey:publicKey
        }),
        success: function(Response) {
            publicAddress = Response;
            publicAddress = JSON.parse(publicAddress);
            multisigaddress = publicAddress.result;
          
            localStorage.setItem("multisigaddress", multisigaddress);

            address = multisigaddress;

            //jQuery('#registered_adr').val(multisigaddress);

            validateAddress(multisigaddress);
                      
        }
    });   
    return address;
}

function returnaddress(publicKey){
    
    var address;
    $.ajax({
        type: "POST",
        url: 'assets/api/createmultisig.php',
        async:false,
        data: ({
           publicKey:publicKey
        }),
        success: function(Response) {
            publicAddress = Response;
            publicAddress = JSON.parse(publicAddress);
            multisigaddress = publicAddress.result;

            address = multisigaddress;
                      
        }
        
    });  

    return address; 

    
    
}



function importAddress(publicAddress){
    // publicAddress = localStorage.getItem('publicAddress');
    console.log("lets see1 : ",publicAddress);
    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/importaddress.php',
        data: ({
           publicAddress : publicAddress
        }),
        success: function(Response) {

            importAddressResponse = Response;
            importAddressResponse = JSON.parse(importAddressResponse);
            importAddressResponse = importAddressResponse.result;

            // createmultisig(publicKey);
            //validateAddress(publicAddress);
                
        }
    });   
    
}




function validateAddress(multisigaddress){

    multisigaddress = publicAddress;
    console.log("lets see1 : ",multisigaddress);

    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/validateaddress.php',
        data: ({
           multisigaddress:multisigaddress
        }),
        success: function(Response) {
            addressValidity = Response;
            addressValidity = JSON.parse(addressValidity);
            isvalid = addressValidity.result.isvalid;
            console.log(isvalid, "isvalid");
          
            console.log(addressValidity, "outscope"); 
            

        }
    });   
    
}

function decodeTransaction(hex){
    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/decodetransaction.php',
        data: ({
           hex:hex
        }),
        success: function(Response) {
            var txdata = Response;
            txdata = JSON.parse(txdata);
            txid = txdata.result.vin[0].txid;
            decodedvout = txdata.result.vin[0].vout;
            console.log(txid, "result is: ");

            getScripthash(txid);
                             
        }
    });   
    
}

function getScripthash(txid){

       $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/getScripthash.php',
        data: ({
                txid : txid     
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            scriptHash = x.result.vout[decodedvout].scriptPubKey.hex;
            console.log(scriptHash, "script hash is:");      
            signprivTransaction(hex, txid, decodedvout, scriptHash, redeemScript, privateKey);     
        }
        
    });

}


function signprivTransaction(hex, txid, decodedvout, scriptHash, redeemScript, privateKey){
    
    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/signtransaction.php',
        data: ({
           hex: hex,
           txid: txid,
           decodedvout: decodedvout,
           scriptHash: scriptHash,
           redeemScript : redeemScript
        }),
        success: function(Response) {

            signedresult = Response;
            signedresult = JSON.parse(signedresult);
            finalhex = signedresult.result.hex;
          
            signTransaction(finalhex, txid, decodedvout, scriptHash, redeemScript, privateKey);            
                      
        }
    });   
    
}

function signTransaction(hex, txid, decodedvout, scriptHash, redeemScript, privateKey){
    
    var privateKey = $('#privkey').val();
    
    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/resigntransaction.php',
        data: ({
           hex: hex,
           txid: txid,
           decodedvout: decodedvout,
           scriptHash: scriptHash,
           redeemScript : redeemScript,
           privateKey : privateKey
        }),
        success: function(Response) {

            signedresult = Response;
            signedresult = JSON.parse(signedresult);
            finalhex = signedresult.result.hex;
            console.log(signedresult, "final hex is:");
          
            sendFinaltransaction(finalhex);            
                      
        }
    });   
    
}

function sendFinaltransaction(finalhex){
    
    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/sendtransaction.php',
        data: ({
            finalhex : finalhex
        }),
        success: function(Response) {

            var signedtx = Response;
            var signedtxresult = JSON.parse(signedtx);
            var txid = signedtxresult;
            console.log(txid, "final txid is:");
            var txUrl = str1;
            
            var y = signedtxresult.error;
            if (y != null) {
                swal({
                    title: 'Invalid Transaction! ',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });
            } else {
                CONSOLE_DEBUG && console.log('result in json format :', signedtxresult);
                CONSOLE_DEBUG && console.log("transaction id result : ", signedtxresult.result);
                //        jQuery('#txid').text(x.result);
                CONSOLE_DEBUG && console.log("txurl", txUrl + signedtxresult.result);
                var aurl = txUrl + signedtxresult.result;

                swal({
                    title: 'Your transction has been processed.',

                    html: '<a href="' + aurl + '" target="_blank"> <b>Check Transaction status here:</b><br> ' + signedtxresult.result + '</a>',
                    type: 'success',
                    showConfirmButton: true,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "OK!",

                    timer: 15000
                });
            }
                      
        }
    });   
    
}



function redirectToHome(){
    if(isvalid == true){
        window.location.href = "bitcoinwallet/home.php";
    }
    else{
        alert("invalid address ");
    }
}


// function to generate BIP39XRKwallet

function BitcoreAddressGenerator(){

     $('#createnew').click(function(){

            firstpass = $("#firstpass").val();
            confpass = $("#confpass").val();

            if ( firstpass == "" && confpass == ""){
                $("#firstpass").css("border-color", "red");
                $("#confpass").css("border-color", "red");
            }
            else  if ( firstpass != "" && confpass == ""){
                $("#firstpass").css("border-color", "green");
                $("#confpass").css("border-color", "red");
            }
            else  if ( firstpass == "" && confpass != "") {
                $("#firstpass").css("border-color", "red");
                $("#confpass").css("border-color", "green");
            }
            else if ( firstpass == confpass){
                $("#firstpass").css("border-color", "green");
                $("#confpass").css("border-color", "green");
                generateBip39Wallet(password, wordListLang, entropyLength,
                    address_pubkeyhash_version, address_checksum_value,
                    private_key_version);
            }
           
            
     });
}



function generateBip39Wallet(password, wordListLang, entropyLength,
    address_pubkeyhash_version, address_checksum_value,
    private_key_version) {

    password = $('#firstpass').val();

    const wordList = eval('Mnemonic.Words.' + wordListLang);
    var code = new Mnemonic(entropyLength, wordList);

    var xprivKey = code.toHDPrivateKey(password); // using a passphrase
    var masterPrivateKey = xprivKey.privateKey.toString();

    PublicAddress = createAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
    PrivateKey = createPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);


    var multiWallet = {
        "status": "success",
        "address": PublicAddress,
        "privateKey": PrivateKey,
        "publicKey": PublicKeyString,
        "seed": code.toString()
    };


    importAddress(PublicAddress);

    createmultisig(PublicKeyString);

    var multiWallet = {
        "status": "success",
        "address": PublicAddress,
        "privateKey": PrivateKey,
        "publicKey": PublicKeyString,
        "seed": code.toString(),
        "multisigaddress": multisigaddress
    };

    CONSOLE_DEBUG && console.log("MultiWallet", multiWallet);
    $("#firststand").hide();
    $("#seedcontainer").show();
    $("#qrcodecontainer").show();
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150
    });
    var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
        width: 150,
        height: 150
    });
    var qrcode3 = new QRCode(document.getElementById("qrcode3"), {
        width: 150,
        height: 150
    });


    function makeCode() { // qr code generater function for address

        var elText = multisigaddress;
        var elprive = PrivateKey; //pass  value of address stored in elpriv


        qrcode.makeCode(elText);

    }

    makeCode(); // call the function here 

    function makeCode2() { // qr code generater function for address

        var elText = PublicKeyString;
        var elprive = PrivateKey; //pass  value of address stored in elpriv


        qrcode2.makeCode(elText);

    }
    makeCode2();

    function makeCode3() { // qr code generater function for address

        var elText = PrivateKey;
        var elprive = PrivateKey; //pass  value of address stored in elpriv


        qrcode3.makeCode(elText);

    }
    makeCode3();
    $("#registered_adr").val(multisigaddress);
    seed = code.toString();
    var dataStr = "data:text/json;charset=utf-8," + ('{' + '"BBIT-wallet-address"' + ":" + '"' + multisigaddress + '"' + "," + '"BBIT-wallet-private-key"' + ":" + '"' + PrivateKey + '"' + "," + '"BBIT-wallet-public-key"' + ":" + '"' + PublicKeyString + '"' + "," + '"BBIT-wallet-recovery-seed"' + ":" + '"' + seed + '"' + '}');

        var dlAnchorElem = document.getElementById('downloadlink');

        dlAnchorElem.setAttribute("href", dataStr);

       
        dlAnchorElem.setAttribute("download", "BBIT-wallet-"+ multisigaddress +".json");
        dlAnchorElem.click();
       
        (function() {
            var textFile = null,
                makeTextFile = function(text) {
                    var data = new Blob([text], {
                        type: 'text/plain'
                    });

                    // If we are replacing a previously generated file we need to
                    // manually revoke the object URL to avoid memory leaks.
                    if (textFile !== null) {
                        window.URL.revokeObjectURL(textFile);
                    }

                    textFile = window.URL.createObjectURL(data);

                    return textFile;
                };

            var create = document.getElementById('create'),
                textbox = document.getElementById(privkey1);
            var link = document.getElementById('downloadlink');

            link.href = makeTextFile('{' + '"BBIT-address"' + ":" + '"' + multisigaddress + '"' + "," + '"BBIT-private-key"' + ":" + '"' + PrivateKey + '"' + "," + '"BBIT-PublicKey"' + ":" + '"' + PublicKeyString + '"}');
            
            link.style.display = 'block';
        })();

    return multiWallet;


}


// this functions creates Public Address from master private key
function createAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value) {

    // step 1: Get raw private key
    var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);

    // step 2: Get public key from private key
    publicKeyHex = privateKeyHex.publicKey;

    var publicKeyBuffer = publicKeyHex.toBuffer();


    // step 3: Calculate sha256 hash of the public key
    var publicKeySHA256Hash = new bitcore.crypto.Hash.sha256(publicKeyBuffer);

    // step 4: Calculate ripemd160 hash of the previous sha256 hash
    var publicKeyRipemd160Hash = new bitcore.crypto.Hash.ripemd160(publicKeySHA256Hash);

    // step 5: insert address_pubkeyhash_version at appropriate place in previous digest
    var adrPubKeyHashVer = buffer.hexToBuffer(address_pubkeyhash_version);
    var insertStep = Math.floor(20 / adrPubKeyHashVer.length)
    var publicKeyExtendedRipemd160Hash = buffer.copy(publicKeyRipemd160Hash);

    for (var i = 0; i < adrPubKeyHashVer.length; i++) {

        var buf_before = publicKeyExtendedRipemd160Hash.slice(0, i + i * insertStep);
        var buf_middle = adrPubKeyHashVer.slice(i, i + 1);
        var buf_after = publicKeyExtendedRipemd160Hash.slice(i + i * insertStep);

        publicKeyExtendedRipemd160Hash = buffer.concat([buf_before, buf_middle, buf_after]);

    }

    // step 6: Calculate sha256 of the extended ripemd160
    var publicKeySHA256HashOfExtendedRipemd160Hash = new bitcore.crypto.Hash.sha256(publicKeyExtendedRipemd160Hash);

    // step 7: Calculate sha256 hash of the previous sha256 hash
    var publicKeySHA256HashOfSHA256HashOfExtendedRipemd160Hash = new bitcore.crypto.Hash.sha256(publicKeySHA256HashOfExtendedRipemd160Hash);

    // step 8: Get address checksum - First 4 bytes of previous hash
    var addressChecksum = publicKeySHA256HashOfSHA256HashOfExtendedRipemd160Hash.slice(0, 4);

    // step 9: XOR above checksum with address-checksum-value blockchain parameter
    var adrChecksumValue = buffer.hexToBuffer(address_checksum_value);
    var xoredChecksum = xorBuffer(adrChecksumValue, addressChecksum);

    // step 10: Add xored checksum at the end of extended ripemd160 hash (from step 5)
    var PublicBinaryAddress = buffer.concat([publicKeyExtendedRipemd160Hash, xoredChecksum]);

    // step 11: Apply bitcoin base58 encoding to above result
    var publicAddress = bitcore.encoding.Base58.encode(PublicBinaryAddress);

    PublicKeyString = publicKeyHex.toString();

    return publicAddress;

}



// this functions creates Private Key from master private key
function createPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value) {

    // step 1: Get raw private key
    var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);
    var privateKeyBuffer = privateKeyHex.toBuffer();

    // step 2: Append 0x01 at end of private key (if corresponding public key is compressed)
    var buf01 = buffer.emptyBuffer(1);
    buf01[0] = 1;
    var privateKeyBufferAppended = buffer.concat([privateKeyBuffer, buf01]);

    // step 3: insert private_key_version at appropriate place in previous result
    var privateKeyVer = buffer.hexToBuffer(private_key_version);
    var insertStep = Math.floor(33 / privateKeyVer.length)
    var privateKeyExtended = buffer.copy(privateKeyBufferAppended);

    for (var i = 0; i < privateKeyVer.length; i++) {

        var buf_before = privateKeyExtended.slice(0, i + i * insertStep);
        var buf_middle = privateKeyVer.slice(i, i + 1);
        var buf_after = privateKeyExtended.slice(i + i * insertStep);

        privateKeyExtended = buffer.concat([buf_before, buf_middle, buf_after]);
    }

    // step 4: Calculate sha256 of the extended private key
    var privateKeyExtendedSHA256 = new bitcore.crypto.Hash.sha256(privateKeyExtended);

    // step 5: Calculate sha256 hash of the previous sha256 hash
    var privateKeyExtendedSHA256OfSHA256 = new bitcore.crypto.Hash.sha256(privateKeyExtendedSHA256);

    // step 6: Get address checksum - First 4 bytes of previous hash
    var addressChecksum = privateKeyExtendedSHA256OfSHA256.slice(0, 4);

    // step 7: XOR above checksum with address-checksum-value blockchain parameter
    var adrChecksumValue = buffer.hexToBuffer(address_checksum_value);
    var xoredChecksum = xorBuffer(adrChecksumValue, addressChecksum);

    // step 8: Add xored checksum at the end of extended privatekey (from step 3)
    var BinaryPrivateKey = buffer.concat([privateKeyExtended, xoredChecksum]);

    // step 9: Apply bitcoin base58 encoding to above result
    var privateKey = bitcore.encoding.Base58.encode(BinaryPrivateKey);


    return privateKey;

}

function xorBuffer(bufA, bufB) {
    var xorBuf = buffer.emptyBuffer(bufA.length);

    for (var i = 0; i < bufA.length; i++)
        xorBuf[i] = bufA[i] ^ bufB[i];
    CONSOLE_DEBUG && console.log(xorBuf);
    return xorBuf;

}



function checkValidity(){

     $('#send').click(function(e){
         console.log('working');
         debugger;
         e.preventDefault();
            // check Password here 
        if(validateForm()){
            // alert('call function here');
            checkPassword(password, address_pubkeyhash_version, address_checksum_value, private_key_version);
        }
            
     });
}


function validateForm(){
    var flag = 0;
    var address = $('#toaddress').val();
    var amount = $('#amount').val();
    var privkey = $('#privkey').val();
    var passphrase = $('#passphrase').val();
    var seeder = $('#seeder').val();
    $('.errorMessage').hide();

    var inputVal = new Array(address, amount, privkey, passphrase, seeder);
        if(inputVal[0] == ""){
            $('.error0').show().html('enter the address');
        } 
         if(inputVal[1] == ""){
            $('.error1').show().html('enter the amount');
        }
        if(inputVal[2] == ""){
            $('.error2').show().html('enter the privkey');
        } 
        if(inputVal[3] == ""){
            $('.error3').show().html('enter the passphrase');
        }
        if(inputVal[4] == ""){
            $('.error4').show().html('enter the seeder');
        }
        if(inputVal[0] != "" && inputVal[1] != "" && inputVal[2] != "" && inputVal[3] != "" && inputVal[4] != "" ){
            flag=1;
        }
    return flag;
}   

function checkPassword(password, address_pubkeyhash_version, address_checksum_value, private_key_version) {

    password = $('#passphrase').val();

    seed = $('#seeder').val();

    var code = new Mnemonic(seed);

    var xprivKey = code.toHDPrivateKey(password); // using a passphrase

    var masterPrivateKey = xprivKey.privateKey.toString();

    PublicAddress = createAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
    
    PrivateKey = createPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

    var publicaddr = listaddresses(multisigaddress);

    if (publicaddr == PublicAddress){
        
        sendTransaction();
    }
    else{

          swal({
                                icon: "error",
                                title: 'Invalid Password !',
                                html: '<p></p>',
                                type: 'error',
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "OK!",
                                timer: 15000
                            });

    }

    return true;



}


function restore(){

     $('#restore').click(function(){
            // check Password here 
            restoreWallet(password, address_pubkeyhash_version, address_checksum_value, private_key_version);
            
     });
}

function restoreWallet(password, address_pubkeyhash_version, address_checksum_value, private_key_version) {

    password = $('#pass1').val();

    seed = $('#seed').val();

    var code = new Mnemonic(seed);

    var xprivKey = code.toHDPrivateKey(password); // using a passphrase

    var masterPrivateKey = xprivKey.privateKey.toString();

    PublicAddress = createAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
    
    PrivateKey = createPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

    var address = returnaddress(PublicKeyString);
    
    var restoredWallet = {
        "status": "success",
        "address": address,
        "privateKey": PrivateKey,
        "publicKey": PublicKeyString
    };

    console.log(restoredWallet);

    return restoredWallet;


}



function listaddresses(multisigaddress){
    var address;
    multisigaddress = localStorage.getItem('multisigaddress');
    
       $.ajax({
        type: "POST",
        url: 'assets/api/listaddresses.php',
        async:false,
        data: ({
            multisigaddress : multisigaddress,
            
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            redeemScript = x.result[0].hex;
            var check = x.result[0].addresses[2];

            address=check;
                             
        }
        
    });

       return address;

}


function sendTransaction(){
    
    var fromaddress = localStorage.getItem('multisigaddress');
       var toaddress = $('#toaddress').val();
       var amount = $('#amount').val();
       //console.log(publicAddress, "toaddress value here : - ");
       $.ajax({
                type: "POST",
                // url: "/assets"
                url: 'assets/api/createrawsendfrom.php',
                data: ({
                    fromaddress : fromaddress,
                    toaddress : toaddress,
                    amount : amount
                    
                }),
                success: function(Response) {
                    var x = Response;
                    x = JSON.parse(x);
                    if ( x.result == null ){

                        if(x.error['code']== -1){

                            swal({
                                icon: "error",
                                title: 'Invalid Recipient Address !',
                                html: '<p></p>',
                                type: 'error',
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "OK!",
                                timer: 15000
                            });
                            
                        }else if(x.error['code']== -32700){
                            swal({
                                icon: "error",
                                title: 'Parse Error !',
                                html: '<p></p>',
                                type: 'error',
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "OK!",
                                timer: 15000
                            });
                        }
                        else{
                            swal({
                                icon: "error",
                                title: 'Insufficient funds !',
                                html: '<p></p>',
                                type: 'error',
                                confirmButtonClass: "btn-danger",
                                confirmButtonText: "OK!",
                                timer: 15000
                            });
                        }
                    }
                    hex = x.result.hex;
                    console.log(hex, "hex is:"); 
                    decodeTransaction(hex);
                    listaddresses(multisigaddress);   
                                    
                }
        });   

}



function walletloginFunction(multisigaddress){
    console.log("lets see: ",multisigaddress);

    $.ajax({
        type: "POST",
        // url: "/assets"
        url: 'assets/api/validateaddress.php',
        data: ({
           multisigaddress:multisigaddress
        }),
        success: function(Response) {
            addressValidity = Response;
            addressValidity = JSON.parse(addressValidity);
            isvalid = addressValidity.result.isvalid;
            console.log(isvalid, "isvalid");
          
            console.log(addressValidity, "outscope"); 

            if(isvalid == true){
                window.location.href = "../bitcoinwallet/home.php";
            }
            else{
                swal({
                    icon: "error",
                    title: 'Invalid  Address !',
                    html: '<p></p>',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });
            }
            

        }
    });   
    
    



}


function walletLoginOnclickFunction(){

    jQuery("#walletloginbtn").click(function() {
        // var netw = net;
        multisigaddress = jQuery("#registered_adr").val();

        CONSOLE_DEBUG && console.log(multisigaddress);
        localStorage.setItem("multisigaddress", multisigaddress);

        // net = localStorage.getItem("network");

        CONSOLE_DEBUG && console.log("wallet address ", multisigaddress);
        // valueChanged();
        if (multisigaddress == '') {

            jQuery("#registered_adr").css("border", "1px solid red");

        } 
        
        else {
                
            walletloginFunction(multisigaddress);
        }
       


    });
}






function listaddresstransactions() {



    multisigaddress = localStorage.getItem("multisigaddress");
    // var a = localStorage.getItem("pubaddr");
    jQuery.ajax({
        type: "POST",
        url: 'assets/api/listaddresstransactions.php',
        data: ({
            multisigaddress : multisigaddress
        }),
        success: function(body) {
            var x = JSON.parse(body);


            var date = new Date();
            CONSOLE_DEBUG && console.log(x, "list transaction result");
            x.result = x.result.reverse();


            if (x.result.length == 0) {
                CONSOLE_DEBUG && console.log("no Transactions on this address.");
                jQuery('.notransaction').css("display", "block");
                jQuery('#tableone').css("display", "none");
            } else {
                for (var i = 0; i < x.result.length; i++) {
                    var checkamount = x.result[i].balance.amount;
                    CONSOLE_DEBUG && console.log("checkamount : ", checkamount);

                    if (x.result[i].balance.amount > 0) {



                        var date = new Date((x.result[i].time) * 1000);
                        var date1 = new Date();
                        var diff = date1 - date;
                        diff = diff / 1000;
                        var seconds = Math.floor(diff % 60);
                        diff = diff / 60;
                        var minutes = Math.floor(diff % 60);
                        diff = diff / 60;
                        var hours = Math.floor(diff % 24);
                        var days = Math.floor(diff / 24);
                        CONSOLE_DEBUG && console.log(days);
                        CONSOLE_DEBUG && console.log(hours);
                        CONSOLE_DEBUG && console.log(x.result);
                        // getPagination('#tableone');
                        


                        if (days > 0) {
                            if (hours > 0) {

                                jQuery('.table-a').append("<tr >  <td id='childAddresses" + i + "' class='addressrows' ><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span>" + hours + "<span class='xrk'> hours ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            } else {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else if (hours > 0) {
                            if (minutes > 0) {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            } else {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else if (minutes > 0) {
                            if (seconds > 0) {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes </span>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            } else {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else {


                            jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> BBIT</span> <span class='xrk in'> in </span></td></tr>");
                        }


                    } else if (x.result[i].balance.amount < 0) {

                        var date = new Date((x.result[i].time) * 1000);
                        var date1 = new Date();
                        var diff = date1 - date;
                        var diff = date1 - date;
                        diff = diff / 1000;
                        var seconds = Math.floor(diff % 60);
                        diff = diff / 60;
                        var minutes = Math.floor(diff % 60);
                        diff = diff / 60;
                        var hours = Math.floor(diff % 24);
                        var days = Math.floor(diff / 24);
                        CONSOLE_DEBUG && console.log(days);
                        CONSOLE_DEBUG && console.log(hours);
                      
                        var str2 = x.result[i].txid;
                        var str3 = str1.concat(str2);
                        CONSOLE_DEBUG && console.log(str3);

                        if (days > 0) {
                            if (hours > 0) {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span>" + hours + "<span class='xrk'> hours ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else if (hours > 0) {
                            if (minutes > 0) {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else if (minutes > 0) {
                            if (seconds > 0) {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes </span>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else {



                            jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> BBIT</span><span class='xrk out'> Out </span></td></tr>");
                        }
                    }
                    // add a table row here
                }
            }
        }
    });



}
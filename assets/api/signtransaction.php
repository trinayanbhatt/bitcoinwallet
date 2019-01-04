<?php

$curl = curl_init();

$config = include('config.php');

$txid = $_POST['txid'];
$hex = $_POST['hex'];
$scriptHash = $_POST['scriptHash'];
$redeemScript = $_POST['redeemScript'];
$decodedvout = $_POST['decodedvout'];
$privateKey = $config['privkey'];
$chain = $config['chain'];

curl_setopt_array($curl, array(
    CURLOPT_PORT => $config['port'],
    CURLOPT_URL => $config['host'],
    CURLOPT_USERPWD => $config['user'].":".$config['pass'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"signrawtransaction\",\"params\":[\"$hex\", [{\"txid\":\"$txid\", \"vout\":$decodedvout,\"scriptPubKey\":\"$scriptHash\", \"redeemScript\": \"$redeemScript\"}],[\"$privateKey\"]],\"id\":1,\"chain_name\":\"$chain\"}",
  CURLOPT_HTTPHEADER => array(
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

?>
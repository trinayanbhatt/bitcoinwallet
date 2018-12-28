<?php

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BBIT Wallet</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet">

    <link rel="stylesheet" type="text/css" media="screen" href="assets/css/index.css" />
        <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <style>
        input, select, textarea {
            display: block;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #a4aaba;
            background: #fff;
            color: #a4aaba;
            font-size: 12px;
            padding:8px;
        }
    </style>
</head>
<body>

<header>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <img alt="Brand" src="">
            </a>
            </div>
        </div>
    </nav>
</header>
<section>
    <div class="container">
        <h2>Wallet</h2>
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Transactions</a></li>
            <li><a data-toggle="tab" href="#menu1">Recieve</a></li>
            <li><a data-toggle="tab" href="#menu2">Send</a></li>
            
        </ul>

        <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
                <div class="table-wrapper">
                    <table class="table-a" id="tableone" data-paging="true">
                    <tbody>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Time</th>
                                
                                
                                <th>Transaction Amount</th>
                            </tr>	
                            <tr>  
                                <td id="childAddresses0" class="addressrows">
                                    <p>373368923cd29dcd78b030127e4acc8ba1b2c09ff48559b5e36257279ed2092a
                                    </p>
                                </td>
                                <td>
                                    <a data-toggle="tooltip" title="Fri Dec 28 2018 10:40:59 GMT+0530 (India Standard Time)">15<span class="BBIT"> seconds ago</span>
                                    </a>
                                </td>
                                <td>10<span class="BBIT"> BBIT</span>
                                    <span class="BBIT in"> in </span>
                                </td>
                            </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div id="menu1" class="tab-pane fade">
                
            </div>
            <div id="menu2" class="tab-pane fade">
            <div name="myForm" method="post" class="sendform" id="pfform">
                    
                    <div class="tabs-inner">
                        <p class="showaddr fnone senderaddr">
<!--                                 Sender's
                        BBIT Address : mpC8A8Fob9ADZQA7iLrctKtwzyWTx118Q9</p> -->
                        <div class="">
                            
                            <p>
                                <label for="sendRecipientaddress">Enter Recipient Address </label>
                                <input type="text" id="toaddress" name="sendRecipientaddress" placeholder="Recipient Address" onchange="">
                                <span class="suffix"><i class="icon-qr"></i></span>
                            </p>

                            <p>
                                <label for="faa">Enter BBIT Amount</label>
                                <input type="number" id="amount" name="sendBTC" placeholder="BBIT Amount" onchange="">
                                <!-- <span class="suffix">BBIT</span> -->
                            </p>

                            <p>
                                <label >Enter Private key</label>
                                <input type="text" id="privkey" name="sendBTC" placeholder="Private key" onchange="">
                                <!-- <span class="suffix">BBIT</span> -->
                            </p>
                        </div>
                        
                        <button id="send" class="testnetColor">SEND TRANSACTION
                        </button>
            
                        <p class="formerrorpara"></p>
                        <div id="txid"></div>

                    </div>
                </div> 
            </div> <!-- menu2 ends here -->
            <div id="menu3" class="tab-pane fade">
            <h3>Menu 3</h3>
            <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
        </div>
    </div>
</section>



<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

<!--JavaScript at end of body for optimized loading-->
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"
        ></script>

      <script src="assets/js/bitcore-lib/bitcore-lib.js"></script>
      <script src="assets/js/bitcore-mnemonic/bitcore-mnemonic.js"></script>
      
      <script src ="assets/js/index.js"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>


</body>
</html>
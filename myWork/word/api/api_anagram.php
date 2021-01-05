<?php
    $retcode = 200;
    
    if(!isset($_GET["word"])) {
        echo "Word not specified\n";
        $retcode = 400;
    }
    else {
        $word = $_GET["word"];
        $url = 'http://www.anagramica.com/best/' . $word;
    
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $url
        ));

        $resp = curl_exec($curl);

        curl_close($curl);
        echo $resp;
    }

    http_response_code($retcode);
<?php
    $retcode = 200;

    if(!isset($_GET["word"])) {
        echo "Word not specified\n";
        $retcode = 400;
    }
    else {
        $word = $_GET["word"];
        $api_key = "9b28fdc9ec916c662c527f2db4da197a";
        $url = 'https://glosbe.com/gapi/translate?from=eng&dest=spa&format=json&phrase=' . $word;
    
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
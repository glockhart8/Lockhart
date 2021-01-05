<?php
if(isset($_GET["index"])) {
    try {
        $id = $_GET["index"];

        $result = PDOQuery("SELECT * FROM students WHERE index=?",[$id],$dsn,$username,$password);

        if($result) {
            http_response_code(200);
            echo json_encode($result);
        }
        else {
            http_response_code(204);
            exit("There is no data with that index");
        }
    }
    catch (Exception $e) { 
        error_log($e->getMessage());
        exit("There was an error");
    }
} else {
    try {
        $result = PDOQuery("SELECT * FROM students ORDER BY lastname, firstname",[],$dsn,$username,$password);
        http_response_code(200);
        echo json_encode($result);
    }
    catch (Exception $e) {
        error_log($e->getMessage());
        exit("There was an error");
    }
}
?>
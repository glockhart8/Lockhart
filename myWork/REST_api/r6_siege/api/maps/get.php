<?php
if(isset($_GET["id"])) {
    try {
        $id = $_GET["id"];

        $result = PDOQuery("SELECT * FROM maps WHERE id=?",[$id],$dsn,$username,$password);

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
} else if(isset($_GET["name"])) {
    try {
        $name = $_GET["name"];

        $result = PDOQuery("SELECT * FROM maps WHERE name=?",[$name],$dsn,$username,$password);

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
        $result = PDOQuery("SELECT * FROM maps ORDER BY name",[],$dsn,$username,$password);
        http_response_code(200);
        echo json_encode($result);
    }
    catch (Exception $e) {
        error_log($e->getMessage());
        exit("There was an error");
    }
}
?>
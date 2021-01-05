<?php
if(isset($_GET["id"])) {
    try {
        $id = $_GET["id"];

        $result = PDOQuery("SELECT * FROM operators WHERE id=?",[$id],$dsn,$username,$password);

        if($result) {
            http_response_code(200);
            echo json_encode($result);
        }
        else {
            http_response_code(204);
            exit("Something went wrong");
        }
    }
    catch (Exception $e) { 
        error_log($e->getMessage());
        exit("There was an error");
    }
} else if(isset($_GET["name"])) {
    try {
        $name = $_GET["name"];

        $result = PDOQuery("SELECT * FROM operators WHERE name=?",[$name],$dsn,$username,$password);

        if($result) {
            http_response_code(200);
            echo json_encode($result);
        }
        else {
            http_response_code(204);
            exit("Something went wrong");
        }
    }
    catch (Exception $e) { 
        error_log($e->getMessage());
        exit("There was an error");
    }
}   else if(isset($_GET["side"])) {
        try {
            $side = $_GET["side"];
    
            $result = PDOQuery("SELECT * FROM operators WHERE side=?",[$side],$dsn,$username,$password);
    
            if($result) {
                http_response_code(200);
                echo json_encode($result);
            }
            else {
                http_response_code(204);
                exit("Something went wrong");
            }
        }
        catch (Exception $e) { 
            error_log($e->getMessage());
            exit("There was an error");
        }
} else {
    try {
        $result = PDOQuery("SELECT * FROM operators ORDER BY name",[],$dsn,$username,$password);
        http_response_code(200);
        echo json_encode($result);
    }
    catch (Exception $e) {
        error_log($e->getMessage());
        exit("There was an error");
    }
}
?>
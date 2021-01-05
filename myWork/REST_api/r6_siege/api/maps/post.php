<?php
if (isset($_POST["name"]) &&  $_POST["name"]!='' &&
    isset($_POST["floors"]) && $_POST["floors"]!='' &&
	isset($_POST["operator"]) && $_POST["operator"]!='') {



	try {
		$name = $_POST["name"];
		$floors = $_POST["floors"];
		$operator = $_POST["operator"];


		$result = PDOQuery("INSERT INTO maps (name, floors, operator) VALUES (?,?,?)",
							[$name, $floors, $operator],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Create Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>
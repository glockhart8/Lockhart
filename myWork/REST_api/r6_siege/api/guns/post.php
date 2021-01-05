<?php

if (isset($_POST["name"]) &&  $_POST["name"]!='' &&
    isset($_POST["damage"]) && $_POST["damage"]!='' &&
	isset($_POST["operator"]) && $_POST["operator"]!='') {



	try {
		$name = $_POST["name"];
		$damage = $_POST["damage"];
		$operator = $_POST["operator"];


		$result = PDOQuery("INSERT INTO guns (name, damage, operator) VALUES (?,?,?)",
							[$name, $damage, $operator],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Create Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
else{
	echo("missing parameters");
}
?>
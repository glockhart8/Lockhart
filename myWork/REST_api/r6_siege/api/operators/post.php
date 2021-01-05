<?php

if (isset($_POST["name"]) &&  $_POST["name"]!='' &&
    isset($_POST["side"]) && $_POST["side"]!='' &&
	isset($_POST["speed"]) && $_POST["speed"]!='' &&
	isset($_POST["ability"]) && $_POST["ability"]!='' &&
	isset($_POST["gun"]) &&  $_POST["gun"]!='' &&
    isset($_POST["map"]) && $_POST["map"]!='') {



	try {
		$name = $_POST["name"];
		$side = $_POST["side"];
		$speed = $_POST["speed"];
		$ability = $_POST["ability"];
        $gun = $_POST["gun"];
        $map = $_POST["map"];


		$result = PDOQuery("INSERT INTO operators (name, side, speed, ability, gun, map) VALUES (?,?,?,?,?,?)",
							[$name, $side, $speed, $ability, $gun, $map],$dsn,$username,$password);
			
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
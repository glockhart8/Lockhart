<?php
parse_str(file_get_contents('php://input'), $_PUT);

if (isset($_PUT["id"]) && 
		isset($_PUT["name"]) && 
		isset($_PUT["side"]) && 
		isset($_PUT["speed"]) &&  
		isset($_PUT["ability"]) && 
        isset($_PUT["gun"]) &&  
		isset($_PUT["map"])) {

	try {
        $id = $_PUT["id"];
		$name = $_PUT["name"];
		$side = $_PUT["side"];
		$speed = $_PUT["speed"];
		$ability = $_PUT["ability"];
		$gun = $_PUT["gun"];
        $map = $_PUT["map"];

		$result = PDOQuery("UPDATE operators SET name=?, side=?, speed=?, ability=?, gun=?, map=? WHERE id=?",
							[$name, $side, $speed, $ability, $gun, $map, $id],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Update Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>
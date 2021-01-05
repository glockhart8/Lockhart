<?php
parse_str(file_get_contents('php://input'), $_PUT);

if (isset($_PUT["id"]) && 
		isset($_PUT["name"]) && 
		isset($_PUT["damage"]) && 
		isset($_PUT["operator"])) {

	try {
        $id = $_PUT["id"];
		$name = $_PUT["name"];
		$damage = $_PUT["damage"];
		$operator = $_PUT["operator"];

		$result = PDOQuery("UPDATE guns SET name=?, damage=?, operator=? WHERE id=?",
							[$name, $damage, $operator, $id],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Update Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>
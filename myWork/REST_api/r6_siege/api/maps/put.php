<?php
parse_str(file_get_contents('php://input'), $_PUT);

if (isset($_PUT["id"]) && 
		isset($_PUT["name"]) && 
		isset($_PUT["floors"]) && 
		isset($_PUT["operator"])) {

	try {
        $id = $_PUT["id"];
		$name = $_PUT["name"];
		$floors = $_PUT["floors"];
		$operator = $_PUT["operator"];


		$result = PDOQuery("UPDATE maps SET name=?, floors=?, operator=? WHERE id=?",
							[$name, $floors, $operator, $id],$dsn,$username,$password);
			
		http_response_code(201);
		echo json_encode("Update Succesful");
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>
<?php
parse_str(file_get_contents('php://input'), $_DELETE);

if (isset($_DELETE["id"])) {

	try {
		$id = $_DELETE["id"];
		$result = PDOQuery("DELETE FROM maps WHERE id = ?",
							[$id],$dsn,$username,$password);
			
		http_response_code(200);
		echo "Delete Succesful";
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Error processing');
	}
} 
?>
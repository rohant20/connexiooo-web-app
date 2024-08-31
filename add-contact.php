<?php
	// Connect to database
	define('DB_HOST', "localhost");
	define('DB_USER', "TheBeast");
	define('DB_PASS', "WeLoveCOP4331");
	define('DB_NAME', "COP4331");

	// Incoming JSON data from webpage
	$inData = getRequestInfo();

	$name = $inData["name"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if($conn->connect_error){
		die('Connection Failed ' . $conn->connect_error);
	} else {
		// Find the lowest available ID
		$query = "SELECT MIN(t1.ID + 1) AS nextID FROM Contacts t1 LEFT JOIN Contacts t2 ON t1.ID + 1 = t2.ID WHERE t2.ID IS NULL";
		$result = $conn->query($query);
		$row = $result->fetch_assoc();
		$nextID = $row['nextID'];

		// Insert the new contact with the found ID
		$stmt = $conn->prepare("INSERT INTO Contacts (ID, name, phone, email) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("isss", $nextID, $name, $phone, $email);
		$stmt->execute();
    
		if($stmt->affected_rows > 0){
			returnWithError(""); // Contact successfully inserted
		} else {
			returnWithError("Failed to add new contact");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj){
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError($err){
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

	echo 'CONNECTED!';
?>

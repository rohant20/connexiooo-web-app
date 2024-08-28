<?php
	// Connect to database
	$host = 'localhost';
	$dbname = 'DB_NAME';
	$username = 'DB_USER';
	$password = 'DB_PASS';

	try {
    		$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
    		die("Failed to connect to database");
	}

	// Check for POST request
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    		// Get the input data
    		$id = isset($_POST['id']) ? $_POST['id'] : null;
    		$first_name = isset($_POST['first_name']) ? $_POST['first_name'] : null;
    		$last_name = isset($_POST['last_name']) ? $_POST['last_name'] : null;
    		$phone = isset($_POST['phone']) ? $_POST['phone'] : null;
    		$email = isset($_POST['email']) ? $_POST['email'] : null;

    // Ensures that all contact info is provided in the request
    if (!$id || !$first_name || !$last_name || !$phone) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required field(s)']);
        exit;
    }

    // Prepare update query
    $sql = "UPDATE users SET first_name = :first_name, last_name = :last_name, phone = :phone, email = :email WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    // Execute query
    try {
        $stmt->execute([
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':phone' => $phone,
            ':email' => $email,
            ':id' => $id,
        ]);

        // Check if update was successful
        if ($stmt->rowCount()) {
            echo json_encode(['status' => 'success', 'message' => 'User updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user']);
        }
    } catch (PDOException $e) {
        	echo json_encode(['status' => 'error', 'message' => 'Database error']);
    }
    } else {
    		echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>

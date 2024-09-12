<?php
    define('DB_HOST', "localhost");
    define('DB_USER', "TheBeast");
    define('DB_PASS', "WeLoveCOP4331");
    define('DB_NAME', "COP4331");


    // Incoming JSON data from webpage
    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

    // Create a connection to the database
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // Check the connection
    if($conn->connect_error){
        die('Connection Failed ' . $conn->connect_error);
    } else {
        // echo $firstName . "<br>";
        // echo $lastName. "<br>";
        // echo $login. "<br>";
        // echo $password. "<br>";

        $stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();

        if( $row = $result->fetch_assoc()  )
		{
            returnWithError("Username already exsists");
		}
		else
		{
            $stmt2 = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?) ");
            $stmt2->bind_param("ssss", $firstName, $lastName, $login, $password);
            $stmt2->execute();

            $userId = $conn -> insert_id;

            returnWithInfo( $firstName, $lastName, $userId);

            $stmt2->close();
            $conn->close();
        }
    }


    function getRequestInfo(){
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj){
        header('Content-type: application/json');
        echo $obj;
    }
    
    function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>

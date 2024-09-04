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
        echo $firstName . "<br>";
        echo $lastName. "<br>";
        echo $login. "<br>";
        echo $password. "<br>";
        $stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
        $stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        returnWithError("");
    }


    function getRequestInfo(){
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj){
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


    echo 'CONNECTED!';



?>
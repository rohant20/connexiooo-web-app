function login(){
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if(username && password){
        //Logic to check in the database if the username and the password matches
    }
    else{
       alert("No account has been found with this username. Please sign-up!");
    }
}

function signup(){
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
}



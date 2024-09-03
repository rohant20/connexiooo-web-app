//Constants declaration for userName,password and form
const userName = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const form = document.getElementById("form");

//event listener for the form in case of an error
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    checkInputs();
});

//Function to check if inputs are correct or valid
function checkInputs(){
    const usernameValue = userName.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue == ''){
        setErrorFor(userName, 'Username cannot be blank');
    }
    else{
        setSuccessFor(userName);
    }
    if(passwordValue == ''){
        setErrorFor(password, 'Password cannot be blank');
    }else if(passwordValue.length < 8){
        setErrorFor(password, 'Password must be at least 8 characters');
    }
    else{
        setSuccessFor(password);
    }
}

//setError function to display a message when the input for a particular field is incorrect or invalid
function setErrorFor(input, message){
    
}

function setSuccessFor(){
    //set the border color to green and display a success message
}



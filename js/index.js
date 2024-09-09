const urlBase = 'http://www.connexiooo.xyz/LAMPAPI';
const extension = 'php';


//Constants declaration for userName,password and form
const userName = document.getElementById("usernameInput");
const password = document.getElementById("passwordInput");
const form = document.getElementById("form");



let userId = 0;
let firstName = "";
let lastName = "";

//event listener for the form in case of an error
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkInputs()) {
    if (form.getAttribute("method") == "post") {
      firstName = document.getElementById("firstNameInput");
      lastName = document.getElementById("lastNameInput");
      console.log("Signing UP");
      doSignUp();
    } else {
      doLogin();
    }
  };
});

//Function to check if inputs are formatted correct or valid
function checkInputs() {
  const usernameValue = userName.value.trim();
  const passwordValue = password.value.trim();

  console.log(usernameValue + " " + passwordValue);
  if (usernameValue == '') {
    return setErrorFor(userName, 'Username cannot be blank');
  }
  else {
    setSuccessFor(userName);
    if (passwordValue == '') {
      return setErrorFor(password, 'Password cannot be blank');
    }
    // } else if (passwordValue.length < 8) {
    //   return setErrorFor(password, 'Password must be at least 8 characters');
    // }
    else {
      return setSuccessFor(password);
    }
  }
}


function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  //	var hash = md5( password );
  console.log(userName.value + " " + password.value);
  document.getElementById("loginResult").innerHTML = "";

  let tmp = { login: userName.value, password: password.value };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/Login.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "index.html";
      }
    };
    xhr.send(jsonPayload);
  }
  catch (err) {
    document.getElementById("loginResult").innerHTML = err.error;
  }

}


function doSignUp() {
  userId = 0;

  //	var hash = md5( password );
  console.log(firstName.value + "" + lastName.value + "" + userName.value + "" + password.value);

  document.getElementById("signUpResult").innerHTML = "";

  let tmp = {
    firstName: firstName.value,
    lastName: lastName.value,
    login: userName.value,
    password: password.value
  }
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/insert-data.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {

        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("signUpResult").innerHTML = jsonObject.error;
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "index.html";
      }
    };
    xhr.send(jsonPayload);
  }
  catch (err) {
    console.log(err + "fuck");
    document.getElementById("signUpResult").innerHTML = err.message;
  }

}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}


//setError function to display a message when the input for a particular field is incorrect or invalid
function setErrorFor(input, message) {
  console.log(input + ":" + message);
  return false;

}

function setSuccessFor() {
  console.log("Formatted correctly");
  return true;
  //set the border color to green and display a success message
}





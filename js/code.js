//Constants declarations for Home Page
const addBtm = document.getElementById("addBtm");
const modTitle = document.getElementById('modal-title');
const editBtm = document.getElementById("editBtm");

const urlBase = '';
const extension = 'php';


let userId = 0;
let firstName = "";
let lastName = "";

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }
    else {
        document.getElementById("header").innerHTML = firstName + " " + lastName + "'s Contacts";
    }
}


/* HOME PAGE CLASS */
class contactInfo {
    //Contructors
    constructor() {
        this.name = "";
        this.phone = "";
        this.email = "";
    }

    //Setters
    set name(n) {
        this.name = n;
    }

    set phone(p) {
        this.phone = p;
    }

    set email(e) {
        this.email = e;
    }

    //Getters
    get name() {
        return this.name;
    }

    get phone() {
        return this.phone;
    }

    get email() {
        return this.email;
    }

    //Methods
    fillProps(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    clearProps() {
        this.name = "";
        this.phone = "";
        this.email = "";
    }
}

function changeAddTitle() {
    modTitle.textContent = 'Add Contact';
    console.log('Add button cilcked');
}

function changeEditTitle() {
    modTitle.textContent = 'Edit Contact';
    console.log('Edit button clicked');
}

function addContact() {
    let newName = document.getElementById("nameIn").value;
    let newEmail = document.getElementById("emailIn").value;
    let newPhone = document.getElementById("phoneIn").value;

    let tmp = { name: newName, phone: newPhone, email: newEmail };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/add-contact' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact added");
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log("Error console did not work");
    }
}

addBtm.addEventListener("click", changeAddTitle);

editBtm.addEventListener("click", changeEditTitle);

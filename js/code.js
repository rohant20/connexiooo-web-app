//Constants declarations for Home Page
const addBtm = document.getElementById("addBtm");
const modTitle = document.getElementById('modal-title');
const editBtm = document.getElementById("editBtm");
const createConBtn = document.getElementById("createConBtn");
const adedBtm = document.getElementById('adedBtm');
const delBtn = document.getElementById("confirmDel");
const searchBtm = document.getElementById('searchBtm');
const formName = document.getElementById('nameIn');
const formEmail = document.getElementById('emailIn');
const formPhone = document.getElementById('phoneIn');
const contactContainer = document.getElementById("contactList");
const searchInput = document.getElementById("searchBar");
const logOutBtn = document.getElementById("logOut");

const urlBase = 'http://www.connexiooo.xyz/LAMPAPI';
const extension = 'php';

let searchTxt = "";
let userId = 0;
let firstName = "";
let lastName = "";

function readCookie() {
    userId = -1;
    // let data = document.cookie;
    // console.log(data);
    // let breakoff = data.split(";");
    // console.log(breakoff);
    // let splits = breakoff[2].split(",");
    // console.log(splits);
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
        window.location.href = "login.html";
    }
    else {
        document.getElementById("header").innerText = `${firstName} ${lastName}'s Contacts`;
        retriveContacts();
    }
}

function logOut() {
    document.cookie = "firstName=; lastName;userId=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.reload();
}

function retriveContacts() {
    let user = {
        userId: userId
    }
    //	var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(user);

    let url = urlBase + '/get-contacts.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                let jsonArr = JSON.parse(xhr.responseText);
                if (jsonArr[0].ID > 0) {
                    for (let i = 0; i < jsonArr.length; i++) {
                        let obj = jsonArr[i];
                        contactContainer.insertAdjacentHTML("beforeend",
                            `<div class="card contactCard">
                                <div class="card-body contactBody">
                                    <div class="contianer">
                                        <div class="row">
                                            <!-- Contact Card Info -->
                                            <div class="col-md-10">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <h3 class="contactName" id="conName-${obj.ID}">${obj.Name}</h3>
                                                        <h6 class="infoSubtitle">Contact Name</h6>
    
                                                    </div>
                                                    <div class="col-md-3">
                                                        <h5 class="contactPhone" id="conPhone-${obj.ID}">${obj.Phone}</h5>
                                                        <h6 class="infoSubtitle">Phone Number</h6>
    
    
                                                    </div>
                                                    <div class="col-md-4">
                                                        <h5 class="contactEmail" id="conEmail-${obj.ID}">${obj.Email}</h5>
                                                        <h6 class="infoSubtitle">Email Address</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#popUp"
                                                    id="editBtm" onclick="changeEditTitle(${obj.ID})">Edit</button>
                                                <button type="button" class="btn btn-danger" id="delBtm" data-bs-toggle="modal"
                                                    data-bs-target="#deletMod" onclick="deletePrep(${obj.ID})">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        );
                    }
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log(err);
    }
}




/* HOME PAGE CLASS */


//BTN handling
function editContact(id, e) {
    e.preventDefault();
    let newName = document.getElementById("nameIn").value;
    let newEmail = document.getElementById("emailIn").value;
    let newPhone = document.getElementById("phoneIn").value;


    let tmp = { name: newName, phone: newPhone, email: newEmail, id: id };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/update-contact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.location.reload();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log("Error console did not work");
    }

}


function changeEditTitle(id) {
    modTitle.textContent = 'Edit Contact';

    let contactName = document.getElementById(`conName-${id}`).innerHTML;
    formName.value = contactName;

    let contactEmail = document.getElementById(`conEmail-${id}`).innerHTML;
    formEmail.value = contactEmail;

    let contactPhone = document.getElementById(`conPhone-${id}`).innerHTML;
    formPhone.value = contactPhone;

    adedBtm.addEventListener("click", () => editContact(id, event));

}


function changeAddTitle() {
    modTitle.textContent = 'Add Contact';

    document.getElementById("nameIn").innerHTML = "";
    document.getElementById("emailIn").innerHTML = "";
    document.getElementById("phoneIn").innerHTML = "";

    formName.value = document.getElementById("nameIn").innerHTML;
    formEmail.value = document.getElementById("emailIn").innerHTML;
    formPhone.value = document.getElementById("phoneIn").innerHTML;

    adedBtm.addEventListener("click", addContact);

}


function addContact(e) {
    e.preventDefault();
    let newName = document.getElementById("nameIn").value;
    let newEmail = document.getElementById("emailIn").value;
    let newPhone = document.getElementById("phoneIn").value;


    let tmp = { name: newName, phone: newPhone, email: newEmail, userID: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/add-contact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.location.reload()
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log("Error console did not work");
    }
}




function searchContact(e) {
    e.preventDefault();
    contactContainer.innerHTML = "";

    let searchObj = {
        userId: userId,
        search: searchTxt.trim()
    }
    //	var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(searchObj);

    let url = urlBase + '/searchContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                let jsonArr = JSON.parse(xhr.responseText).results;
                if (jsonArr[0].ID > 0) {
                    for (let i = 0; i < jsonArr.length; i++) {
                        let obj = jsonArr[i];
                        contactContainer.insertAdjacentHTML("beforeend",
                            `<div class="card contactCard">
                                <div class="card-body">
                                    <div class="contianer">
                                        <div class="row">
                                            <!-- Contact Card Info -->
                                            <div class="col-md-10">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <h3 class="contactName" id="conName-${obj.ID}">${obj.Name}</h3>
                                                        <h6 class="infoSubtitle">Contact Name</h6>
    
                                                    </div>
                                                    <div class="col-md-3">
                                                        <h5 class="contactPhone" id="conPhone-${obj.ID}">${obj.Phone}</h5>
                                                        <h6 class="infoSubtitle">Phone Number</h6>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <h5 class="contactEmail" id="conEmail-${obj.ID}">${obj.Email}</h5>
                                                        <h6 class="infoSubtitle">Email Address</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-info" type="button" data-bs-toggle="modal" data-bs-target="#popUp"
                                                    id="editBtm" onclick="changeEditTitle(${obj.ID})">Edit</button>
                                                <button type="button" class="btn btn-danger" id="delBtm" data-bs-toggle="modal"
                                                    data-bs-target="#deletMod" onclick="deletePrep(${obj.ID})">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                        );
                    }
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log(err);
    }
}


function deleteContact(id, e) {
    e.preventDefault();

    let tmp = { id: id };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/delete-contact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.location.reload();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log("Error console did not work");
    }
}

function deletePrep(id) {
    delBtn.addEventListener("click", () => deleteContact(id, event));
}

searchInput.addEventListener("change", () => {
    searchTxt = searchInput.value;
});

logOutBtn.addEventListener("click", logOut);
searchBtm.addEventListener("click", searchContact);
createConBtn.addEventListener("click", changeAddTitle);
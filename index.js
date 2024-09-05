const addBtm = document.getElementById("addBtm");
const modTitle = document.getElementById('modal-title');
const editBtm = document.getElementById("editBtm");

const urlBase = '';
const extension = 'php';


function changeAddTitle(){
  modTitle.textContent = 'Add Contact';
  console.log('Add button cilcked');
}

function changeEditTitle(){
  modTitle.textContent = 'Edit Contact';
  console.log('Edit button clicked');
}

function addContact(){
  let newName = document.getElementById("nameIn").value;
  let newEmail = document.getElementById("emailIn").value;
  let newPhone = document.getElementById("phoneIn").value;

  let tmp = {name: newName, phone: newPhone, email: newEmail};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/add-contact' + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
              console.log("Contact added");
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
      console.log("Error console did not work");
    }
}

addBtm.addEventListener("click", changeAddTitle);

editBtm.addEventListener("click", changeEditTitle);

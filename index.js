const addBtm = document.getElementById("addBtm");
const modTitle = document.getElementById('modal-title');
const editBtm = document.getElementById("editBtm");


function changeAddTitle(){
  modTitle.textContent = 'Add Contact';
  console.log('Add button cilcked');
}

function changeEditTitle(){
  modTitle.textContent = 'Edit Contact';
  console.log('Edit button clicked');
}

addBtm.addEventListener("click", changeAddTitle);

editBtm.addEventListener("click", changeEditTitle);

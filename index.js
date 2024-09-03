/*const addBtm = document.getElementById("addBtm");

const editBtm = document.getElementById("editBtm");

const popUpElm = (headerText) =>
                      `<div class="card popUp">
                        <div class="card-header">
                        <button type="button" class="btn-close" aria-label="Close" id="remove"></button>
                        ${headerText}
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                          <form>
                            <div class="form-group">
                              <label for="nameIn">Full Name</label>
                              <input type="Name" class="form-control" id="nameIn" placeholder="Richard Leinecker">
                            </div>
                          <form>
                          </li>
                          <li class="list-group-item">
                          <form>
                            <div class="form-group">
                              <label for="emailIn">Email</label>
                              <input type="Email" class="form-control" id="emailIn" placeholder="name@example.com">
                            </div>
                          <form>
                          </li>
                          <li class="list-group-item">
                          <form>
                            <div class="form-group">
                              <label for="numberIn">PhoneNumber</label>
                              <input type="phoneNumber" class="form-control" id="phoneIn" placeholder="123-456-7890">
                            </div>
                          <form>
                          </li>
                        </ul>
                      </div>`;
  



        

const popupFunc = (e,action) => {
  e.preventDefault();
  console.log(popUpElm);
  const headerText = action === 'add' ? 'Add Contact' : 'Edit Contact';
  document.getElementById("pop").innerHTML = popUpElm(headerText);

  let btnRemove = document.querySelector('#remove');
  btnRemove.addEventListener("click", (e) => {
    document.removeEventListener("click");
  });


};


addBtm.addEventListener("click", (e) => popupFunc(e,'add'));
editBtm.addEventListener("click", (e) => popupFunc(e,'edit'));*/

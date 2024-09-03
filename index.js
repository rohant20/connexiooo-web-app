const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");

const popUpElm = (headerText) =>
  `<div class="card popUp">
                        <div class="card-header">
                        ${headerText}
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">
                          <form>
                            <div class="form-group">
                              <label for="nameIn">Full Name</label>
                              <input type="Name" class="form-control" id="nameIn" placeholder="Richard Leinecker">
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div class="form-group">
                              <label for="emailIn">Email</label>
                              <input type="Email" class="form-control" id="emailIn" placeholder="name@example.com">
                            </div>
                          </li>
                          <li class="list-group-item">
                            <div class="form-group">
                              <label for="numberIn">PhoneNumber</label>
                              <input type="phoneNumber" class="form-control" id="phoneIn" placeholder="123-456-7890">
                            </div>
                          </form>
                          </li>
                        </ul>
                      </div>`;






const popupFunc = (e, action) => {
  e.preventDefault();
  console.log(e.target);
  const headerText = action === 'add' ? 'Add Contact' : 'Edit Contact';
  document.getElementById("pop").innerHTML = popUpElm(headerText);
};


addBtn.addEventListener("click", (e) => popupFunc(e, 'add'));
editBtn.addEventListener("click", (e) => popupFunc(e, 'edit'));





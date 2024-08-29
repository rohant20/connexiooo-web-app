const addBtm = document.getElementById("addBtm");

const editBtm = document.getElementById("editBtm");

const popUpElm = `<div class="card popUp">
                        <div class="card-header">
                          Featured
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

        

const popupFunc = (e) => {
    e.preventDefault();
    console.log(popUpElm);
    document.getElementById("testingDiv").innerHTML = popUpElm;
};


addBtm.addEventListener("click", popupFunc);
editBtm.addEventListener("click", popupFunc);





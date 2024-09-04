const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const popUpContainer = document.getElementById("pop");

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

//HTML Componenet Templates
const contactCard = (name, phone, email) => `<div class="card contactCard">
            <div class="card-body">
                <div class="contianer">
                    <div class="row">
                        <!-- Contact Card Info -->
                        <div class="col-md-10">
                            <div class="row">
                                <div class="col-md-5">
                                    <h3 class="contactName">${name}</h3>
                                    <h6 class="infoSubtitle">Contact Name</h6>

                                </div>
                                <div class="col-md-3">
                                    <h5 class="contactInfo">${phone}</h5>
                                    <h6 class="infoSubtitle">Phone Number</h6>
                                </div>
                                <div class="col-md-4">
                                    <h5 class="contactInfo">${email}</h5>
                                    <h6 class="infoSubtitle">Email Address</h6>
                                </div>
                            </div>
                        </div>
                        <!-- Contact Card Edit/Delete BTNS -->
                        <div class="col-md-2">
                            <button type="button" class="btn btn-info " id="editBtn">Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;


const popUpElm = (headerText) =>
  ` <div class="card popUp">
            <div class="card-header container">
                <div class="row">
                    <div class="col-10">
                        <h4>${headerText}</h4>
                    </div>
                    <div class="col-2">
                            <img id="closePop" src="images/cross.png" onclick="closePop()" alt="">
                    </div>
                </div>
            </div>
            <form>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
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
                    </li>
                </ul>
                <button id="popBtn" class="btn btn-primary" type="submit">${headerText}</button>
            </form>
        </div>`;


const popupFunc = (e, action) => {
  e.preventDefault();
  console.log(e.target);
  const headerText = action === 'add' ? 'Add Contact' : 'Edit Contact';
  popUpContainer.innerHTML = popUpElm(headerText);
};

const closePop = () => {
  popUpContainer.innerHTML = "";
}


addBtn.addEventListener("click", (e) => popupFunc(e, 'add'));
editBtn.addEventListener("click", (e) => popupFunc(e, 'edit'));





const addBtm = document.getElementById("addBtm");

const editBtm = document.getElementById("editBtm");

const popUpElm = `<div class="card popUp">
                        <div class="card-header">
                          Featured
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">An item</li>
                          <li class="list-group-item">A second item</li>
                          <li class="list-group-item">A third item</li>
                        </ul>
                      </div>`;

        

const popupFunc = (e) => {
    e.preventDefault();
    console.log(popUpElm);
    document.getElementById("testingDiv").innerHTML = popUpElm;
};


addBtm.addEventListener("click", popupFunc);
editBtm.addEventListener("click", popupFunc);





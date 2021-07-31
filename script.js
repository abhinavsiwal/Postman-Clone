console.log("Postman Clone");

//Initialize no of parameters
let addParamCounts = 0;

//Utility Functions
//1. Utility Function to get DOM Element from String
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


let parametersBox = document.getElementById('parametersBox');
let requestJsonBox = document.getElementById('requestJsonBox');
let paramsRadio = document.getElementById('paramsRadio');
let jsonRadio = document.getElementById('jsonRadio');

//Hide the Parameters box Initially
parametersBox.style.display = 'none';

//If the User Clicks the Params Hide the Json box
paramsRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'none';
    parametersBox.style.display = 'block';


})
//If the User Clicks on the Json hide the Params box
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = 'none';
    requestJsonBox.style.display = 'flex';

})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let html = `<div class="form-row row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter${addParamCounts + 2}</label>
                <div class=" col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter${addParamCounts + 2} Key" id="parameterKey${addParamCounts + 2}">
                </div>
                <div class=" col-md-4">
                    <input type="text" class="form-control" placeholder="Enter Parameter${addParamCounts + 2} Value" id="parameterValue${addParamCounts + 2}">
                </div>
                <button class="btn btn-primary col-1 deleteParam" >-</button>
            </div>`;
    //Convert the element String to DOM node
    let paramElement = getElementFromString(html);
    params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }
    addParamCounts++;

})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJsonText').innerText="Please Wait... Fetching Data...";
    document.getElementById('responsePrism').innerHTML = "Please Wait... Fetching Data...";
    //Fetch all the Values Entered by user
    let url = document.getElementById('url').value;
    let requestType = "";
    let get = document.getElementById('get');
    let post = document.getElementById('post');
    if (get.checked) {
        requestType = get.value;
    } else if (post.checked) {
        requestType = post.value;
    }
    let contentType = "";
    let json = document.getElementById('jsonRadio');
    let params = document.getElementById('paramsRadio');
    if (json.checked) {
        contentType = json.value;
    } else if (params.checked) {

        contentType = params.value;
    }
    //if user had used params instead of Json then store all the values in Object 
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamCounts + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value;
            }

        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);
    // console.log(data);

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(res => res.text())
            .then(text => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data

        }).then(res => res.text())
            .then(text => {
                // document.getElementById('responseJsonText').value=text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }

})
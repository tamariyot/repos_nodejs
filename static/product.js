 //const orders = require("../Models/orders");
//const Orders = require("../Models/orders");

var arrProdInSal = [];
var sumy = 0;
var s = JSON.parse(sessionStorage.getItem("arrProdInSal"));


window.addEventListener('load', (event) => {
    var j = JSON.parse(sessionStorage.getItem('count'));
    if (j == null)
        j = 0;
    document.getElementById("ItemsCountText").innerHTML = j;
    getAllProducts();
});

function drawProduct(product) {
    temp = document.getElementById("temp-card");
    var clonProducts = temp.content.cloneNode(true);
    var url = "/image/";
    clonProducts.querySelector("img").src = url + product.imgUrl + ".jpg";
    clonProducts.querySelector("h1").innerText = product.name;
    clonProducts.querySelector(".price").innerText = "₪" + product.price;
    clonProducts.querySelector(".description").innerText = product.description;
    clonProducts.querySelector("button").addEventListener("click", () => {
        addToCart(product)
    });

    document.getElementById("PoductList").appendChild(clonProducts);
}

function getAllProducts() {
    fetch("api/product/")
        .then(response => {
            if (response.ok && response.status == 204)
                alert("שגיאה!!!")
            if (response.ok)
                return response.json();
            else
                throw new error(response.status)
        })
        .then(data => {
            if (data) {
                c = 0;
                document.getElementById("counter").innerHTML = 0;
                data.forEach(p => {
                    return drawProduct(p),
                        c = c + 1
                });
                document.getElementById("counter").innerHTML = c;
            }
        })
        .then(getallCategories())
        .catch(err => console.log(err))
}

function getallCategories() {
    fetch("api/category/")
        .then(response => {
            if (response.ok && response.status == 204)
                alert("שגיאה!!!")
            if (response.ok)
                return response.json();
            else
                throw new error(response.status)
        })
        .then(data => {
            if (data) {
                data.forEach(c => ShowCategory(c));
            }
        })
        .catch(err => console.log(err))
}
function ShowCategory(category) {
    var Element = document.getElementById("temp-category");
    var cln = Element.content.cloneNode(true);
    cln.querySelector(".OptionName").innerText = category.name;
    cln.querySelector(".opt").id = category._id;
    cln.querySelector(".lbl").for = category._id;

    cln.querySelector(".opt").addEventListener("change", () => {
        if (document.getElementById(category._id).checked)
            getCategoriesById(category._id)
    });
    document.body.appendChild(cln);
}

function getCategoriesById(category_id) {
    fetch("api/product/" + category_id)
        .then(response => {
            if (response.ok && response.status == 204)
                alert("שגיאה!!!")
            if (response.ok)
                return response.json();
            else
                throw new error(response.status)
        })
        .then(data => {
            if (data) {
                document.body.removeChild(document.getElementById("PoductList"));
                c = 0;
                document.getElementById("counter").innerHTML = 0;
                var d = document.createElement('div');
                d.setAttribute("id", "PoductList")
                document.body.appendChild(d);
                data.forEach(p => { return drawProduct(p), c = c + 1 });
                document.getElementById("counter").innerHTML = c;

            }
        })
        .catch(err => console.log(err))
}

function deleteAll() {
    var a = JSON.parse(sessionStorage.getItem('arrProdInSal'));
    sessionStorage.clear(a);

}
function addToCart(product) {

    var j = JSON.parse(sessionStorage.getItem('count'));
    if (j == null)
        j = 0;

    //var j = parseInt( document.getElementById("ItemsCountText").innerHTML);
    document.getElementById("ItemsCountText").innerHTML = j + 1;
    sumy = sumy + product.price;
    arrProdInSal.push(product);
    if (s) {
        arrProdInSal = s;
    }
    sessionStorage.setItem('arrProdInSal', JSON.stringify(arrProdInSal));
    sessionStorage.setItem('count', JSON.stringify(j + 1));
    sessionStorage.setItem('sum', JSON.stringify(sumy));
}

function onLoadBag() {
    var arrProdFromSession = [];
    arrProdFromSession = JSON.parse(sessionStorage.getItem('arrProdInSal'));
    arrProdFromSession.forEach(a => drawProdInBag(a));

    var c = JSON.parse(sessionStorage.getItem('count'));
    document.getElementById("itemCount").innerHTML = c;

    var sumy = JSON.parse(sessionStorage.getItem('sum'));
    document.getElementById("totalAmount").innerHTML = sumy;

}
function drawProdInBag(prod) {
    var Elem = document.getElementById("temp-row");
    var cln = Elem.content.cloneNode(true);
    var url = "/image/";
    cln.querySelector("img").src = url + prod.imgUrl + ".jpg";
    cln.querySelector(".itemName").innerText = prod.name;
    cln.querySelector(".itemNumber").innerText = 1;
    cln.querySelector(".price").innerText = "₪" + prod.price;
    cln.querySelector(".descriptionColumn").innerText = prod.description;


    cln.getElementById("deleProd").addEventListener("click", () => {
        deleteProdFromSal(prod._id);
    });
    document.getElementById("items").appendChild(cln);
}

function deleteProdFromSal(idProd) {
    var saveIndex = 0;
    var iprice = 0;
    var arrFromSession = sessionStorage.getItem('arrProdInSal');
    var jesArr = JSON.parse(arrFromSession);
    for (var i = 0; i < jesArr.length; i++) {
        if (idProd == jesArr[i]._id) {
            saveIndex = i;
            iprice = jesArr[i].price;
            break;
        }
    }
    var startArr = jesArr.slice(0, saveIndex);//חיתוך מההתחלה עד המבוקש
    //console.log(startArr);
    var endArr = jesArr.slice(saveIndex + 1, jesArr.length);//חיתוך מהמבוקש עד הסוף
    arrProdInSal = startArr.concat(endArr);//חיבור שתי החלקים..
    //console.log(arrProdInSal);
    //console.log(startArr);
    sessionStorage.setItem('arrProdInSal', JSON.stringify(arrProdInSal));

    document.getElementById("items").innerHTML = "";//מחיקת פרטי הסל
    var count = JSON.parse(sessionStorage.getItem('count'));//עדכון הכמות
    count = count - 1;
    sessionStorage.setItem('count', JSON.stringify(count));

    var sum = JSON.parse(sessionStorage.getItem('sum'));//עדכון המחיר
    sum = sum - iprice;
    sessionStorage.setItem('sum', JSON.stringify(sum));

    onLoadBag();
}


function saveOrder() {
    var orderItemsArr = [];
    var array=JSON.parse(sessionStorage.getItem('arrProdInSal'));
    for (let i = 0; i < array.length; i++) {
        var item = {
        prodId: array[i]._id,
        Quantity: 1
    }
        orderItemsArr.push(item);
    }
    
    var orderArr = {
        date: new Date(),
        amount: sessionStorage.getItem('sum'),
        userId: JSON.parse(sessionStorage.getItem('user'))._id,
        products: orderItemsArr
    };

    fetch("api/orders",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderArr)
        }
    ).then(response => {
        if (response.status == 200) {
            console.log(response, "res")
            return response.json();

        }
        /* else
             alert("cant do order!!!!")*/
    }).then(data => {
        console.log('Success:', data);
        alert("ההזמנה בוצעה בהצלחה");
        window.location.href = "home.html";
    })
    // .catch(e => alert("ההזמנה נכשלה"))
}


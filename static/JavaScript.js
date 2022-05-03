
function Conection() {

    var email = document.getElementById("name1").value;
    var password = document.getElementById("password1").value;

    fetch("api/user/" + email + "/" + password)
        .then(response => {
            if (response.ok && response.status == 204)
                alert(" המשתמש אינו קיים במערכת, הכנס משתמש חדש או בצע רישום ")
            else if (response.ok)
                return response.json();
            else
                throw new error(response.status)
        })
        .then(data => {
            if (data) {
                sessionStorage.setItem('user', JSON.stringify(data)),
                console.log('Hellow to: ', data.fName),
                window.location.href = "openUser.html";
            }
            else {
                sessionStorage.setItem('password', JSON.stringify(password));
                sessionStorage.setItem('email', JSON.stringify(email));
            }
        })
        .catch(err => console.log(err))
}

function load() {
    var oldUser = JSON.parse(sessionStorage.getItem('user'));

    document.getElementById("welcome").textContent = "welcome to: " + oldUser.fName,
    document.getElementById("Email").value = oldUser.email,
    document.getElementById("Password").value =oldUser.password,
    document.getElementById("FName").value = oldUser.fName,
    document.getElementById("Lname").value = oldUser.lName;
}
function openNew() {
    window.location.href = "openNewUser.html";

}
function loadOpenNewUser() {
    document.getElementById("name1").value = JSON.parse(sessionStorage.getItem('email'));
    document.getElementById("password1").value = JSON.parse(sessionStorage.getItem('password'));
}
//////////לבדוקקקקקקקקקקקקקקקקק id
function Login() {
    let newUser = {
        //UserId: 0,
        email: document.getElementById("name1").value,
        password: document.getElementById("password1").value,
        fName: document.getElementById("FName").value,
        lName: document.getElementById("Lname").value,

    }
    fetch("api/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            // if(response.status==400)
            //     alert("נכשל!!!! שים לב שכתובת המייל שהזנת תקינה");
            if (response.status == 200)
                return response.json();
            else
                throw new Error();
        })
        .then(data => {
            console.log('Success:');
            alert("נרשם בהצלחה");
            Conection();
        }).catch(e=>alert("נכשל!!!! שים לב שכתובת המייל שהזנת תקינה וייחודית"))

}
function update() {
    var id = JSON.parse(sessionStorage.getItem('user'))._id;

    let oldUser1 = {
        //UserId: id,
        email: window.document.getElementById("Email").value,
        password: window.document.getElementById("Password").value,
        fName: window.document.getElementById("FName").value,
        lName: window.document.getElementById("Lname").value
    }


    fetch("api/user/" +  id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oldUser1)
    })
        .then(response => {
            if (response.ok)
                return response.text();
            else {
                throw new error(response.status)

            }
        })
        .then(data => {
            if (data != null) {
                alert("saved successful"),
                    sessionStorage.setItem('user', JSON.stringify(oldUser1))

                window.location.href = "htmlPage.html";
            }
        })
        .catch(err => console.log(err))

}
function goHome() {
    
     window.location.href = "home.html";
    }

function getAllOrder(){
    // var email = document.getElementById("Email").value;
    // var password = document.getElementById("Password").value;
    var id =JSON.parse(sessionStorage.getItem('user'))._id;
    fetch("api/user/" +id)//+ email + "/" + password
        .then((response) => {
            if (response.ok && response.status == 200){
                    return response.json()
            } 
            else{
                throw new Error( response.json);
            }  
        })
        .then(data => {
            console.log(data);
            if (data != "error") {
                document.getElementById("myOrders").innerText ="" +JSON.stringify(data)+"👍👌";
            }
    
        }).catch((error) => { console.log(error); alert(error) });
    
    }
    
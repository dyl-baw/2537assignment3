function savetoDataBase() {
    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        url:'localhost:3000/register',
        type: 'POST',
        data: {
            user: username,
            password: password,
        },
        success: register
    })
}

function register(data) {
    if(data) {
        window.alert("This username is already taken. Try another.");
    } else {
        window.alert("Registration success");
        window.location.href = "localhost:3000/login";
    }
}

function setup() {
    $("#submitButton").click(savetoDataBase)
}

$(document).ready(setup);
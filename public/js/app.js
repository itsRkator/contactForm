const contactFrom = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let sub = document.getElementById('subject');
let msg = document.getElementById('message');


contactFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: sub.value,
        message: msg.value
    }
    console.log("Form Data: ", formData);


    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log("xhr.responseText: ", xhr.responseText);
        if (xhr.responseText == 'Success') {
            alert("Email Sent");
            name.value = '';
            email.value = '';
            sub.value = '';
            msg.value = '';
        } else {
            alert("Something went wrong." + xhr.responseText)
        }
    }

    xhr.send(JSON.stringify(formData));
});
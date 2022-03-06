
let PayButtonStatus = e => {
    let refToLogin = document.getElementsByClassName('btn btn-light btn-sm')[0];

    let usernameValue = localStorage.getItem('username');
    let passwordValue = localStorage.getItem('password');
    let RefToButton = document.getElementsByClassName('btn btn-danger')[0];

    if (usernameValue == 'admin' && passwordValue == 'admin' ) {
        RefToButton.disabled= false;
    }
}

PayButtonStatus();

let DoPay = () => {
    alert('Hi your booking is successful !!');
}



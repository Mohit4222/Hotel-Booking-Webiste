
//Function for coverting the header and footer into javascript template   
let displayHeader = () => {
    let headerTemplate = `<a href="index.html"><img src="assests/images/logo.png" alt="logo" class="logo"></a>
    <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#login" data-backdrop="false"  onclick="mainLogin(event)" style="margin-right: 2%;">LOGIN</button>`;
    let access = document.getElementById("header");
    access.innerHTML += headerTemplate;

    let headerModal = `<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" aria-hidden="true">
                         <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel" >Please Login</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" style="text-align: center; ">
                                    <form action="">
                                        <label for="UserName" style="margin: 1em 0em 1em 2em; ">Username:</label>
                                        <input type="text" id="username" placeholder="Enter Username" name="username" required style="margin-left: 3em;">
                                        <br>
                                        <label for="Password" style="margin: 1em 0em 1em 2em;">Password:</label>
                                        <input type="password" id="password" placeholder="Enter Password" name="password" required style="margin-left: 3em;">
                                        <br>
                                    </form>
                                </div>
                                <div class="modal-footer d-flex justify-content-center">
                                    <button type="button" class="btn btn-primary"  onclick="login(event)">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

    document.getElementById("headerModal").innerHTML = headerModal;
}


let displayFooter = () => {
    let footerTemplate =`<div id="contact">
                    <a href="contact.html" target="_self" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#contact-us"><span>Contact Us</span></a>
                    </div>
                    <div class="copyright-info">
                    <span class="copyright">&copy; 2020 ROOM SEARCH PVT. LTD.</span>
                    </div>
                    <div id="social-media">     
                    <a href="https://www.facebook.com" target="_blank"><img src="assests/images/facebook.png" alt="facebookLogo" ></a>
                    <a href="https://www.instagram.com" target="_blank"><img src="assests/images/instagram.png" alt="instagramLogo" ></a>
                    <a href="https://twitter.com" target="_blank"><img src="assests/images/twitter.png" alt="twitterLogo" ><br></a>
                    </div>`;

    let access=document.getElementById("footer");
    access.innerHTML += footerTemplate;

    let footerModal = `<div class="modal fade" id="contact-us" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel" >Get in touch</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <span>Thank you for reaching out!!!</span><br> 
                                        <span>Please enter you email and we get back to you.</span><br>
                                        
                                        <label for="email">Email:</label>
                                        <input type="email" placeholder="Enter your email id" name="email" required style="margin-top: 3%;">
                                        <br>
                                    </div>
                                    <div class="modal-footer">
                                
                                    <button type="submit" formaction="index.html" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

    document.getElementById("footerModal").innerHTML = footerModal;
}

displayHeader();
displayFooter();

//Tenplate Function has ended

//Function's for Login credentials implemtation

let isUserLogin =localStorage.getItem('isLogin');
let mainLogin = e => {
    if (isUserLogin === 'true') {
        localStorage.setItem('isLogin', 'false');
        location.reload();
    }
};

let login = e => {

    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin');
    localStorage.setItem('isLogin', 'false');

    e.preventDefault();
    let userElement = document.getElementById('username');
    let passwordElement = document.getElementById('password');

    let usernameValue = localStorage.getItem('username');
    let passwordValue = localStorage.getItem('password');

    let loginElement = document.getElementsByClassName('btn btn-light btn-sm')[0];
    
    if (userElement.value === usernameValue && passwordElement.value === passwordValue) {
        localStorage.setItem('isLogin', 'true');
        alert('Successfully logged in!');
        let loginElement = document.getElementsByClassName('btn btn-light btn-sm')[0];
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
        location.reload();
    } 
    else if (loginElement.innerText == "LOGOUT" && isLogin === 'true') {
        localStorage.clear();
        userElement.value = '';
        loginElement.dataset.target = '';
        passwordElement.value = '';
        loginElement.innerText = 'LOGIN';
    }
    else {
        alert('Incorrect credentials! Login failed!');
        userElement.value = '';
        passwordElement.value = '';
    }
};

let isLogin = localStorage.getItem('isLogin');
let loginElement = document.getElementsByClassName('btn btn-light btn-sm')[0];


let checkLogin = () => {
    if (!isLogin || isLogin === 'false') {
        localStorage.clear();
        loginElement.dataset.target = '#login-modal';
        loginElement.innerText = 'LOGIN';
    } else  {
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
    }
}

checkLogin();
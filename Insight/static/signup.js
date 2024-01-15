const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

document.addEventListener("DOMContentLoaded", function() {
    let isSignup = signupLink.getAttribute('is-signup');
    console.log(isSignup);
    if (isSignup === 'true') {
        console.log(isSignup);
        signupBtn.click();
    }
});

signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});



document.getElementById("connectButton").addEventListener("click", async(e) => {
    e.preventDefault();

    let metamask = document.getElementById('metamaskID');
    let spinner = document.getElementById('spinner-connect');
    spinner.classList.remove("d-none");
    await sleep(300);

    let metamaskAddress = await getMetamaskAddress();
    console.log(metamaskAddress);
    metamask.value = metamaskAddress;
    
    spinner.classList.add("d-none");
});

document.getElementById("connectButtonLogin").addEventListener("click", async(e) => {
    e.preventDefault();

    let metamask = document.getElementById('metamaskID-login');
    let spinner = document.getElementById('spinner-connect-login');
    spinner.classList.remove("d-none");
    await sleep(300);

    let metamaskAddress = await getMetamaskAddress();
    if (!metamaskAddress || metamaskAddress === 'undefined' || metamaskAddress === null) 
        metamaskAddress = '';
    console.log(metamaskAddress);
    metamask.value = metamaskAddress;
    
    spinner.classList.add("d-none");
});

async function getMetamaskAddress() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        try {
            const accounts = await web3.eth.requestAccounts();
            var metamaskAddress = accounts[0];
            console.log(metamaskAddress);
            return metamaskAddress;
        } catch (error) {
            console.error("Error when getting Metamask address: " + error.message);
            return null;
        }
    } else {
        alert("Web3 is not available. Please install Metamask.");
        return null;
    }
}


const sleep = ms => new Promise(r => setTimeout(r, ms));

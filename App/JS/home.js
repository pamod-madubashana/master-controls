const verifySwitch = document.getElementById('verifySwitch');
const verifyIcon = document.getElementById('verifyIcon');
const HomeContainer = document.getElementById("homeContainer")
const VerifyPopup = document.getElementById("verifyPopup");
const backToHome = document.getElementById('backToHome');

verifySwitch.addEventListener('click', () => {
    if (verifySwitch.classList.contains('active')) {
        verifySwitch.classList.remove('active');
    } else {
        verifySwitch.classList.add('active');
    }
});

verifyIcon.addEventListener('click', () => {
    if (HomeContainer.classList.contains('center')) {
        HomeContainer.classList.remove('center');
        HomeContainer.classList.add('down');
        VerifyPopup.classList.add('active');
    }
});

backToHome.addEventListener('click', () => {
    HomeContainer.classList.remove('down');
    HomeContainer.classList.add('center');
    VerifyPopup.classList.remove('active');
});
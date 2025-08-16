const verifySwitch = document.getElementById('verifySwitch');
const verifyIcon = document.getElementById('verifyIcon');
const HomeContainer = document.getElementById("homeContainer")
const VerifyPopup = document.getElementById("verifyPopup");
const backToHome = document.getElementById('backToHome');
const groupDropdownIcon = document.getElementById('groupDropdown');
const pmDropdownIcon = document.getElementById('pmDropdown');
const pmDropdown = document.querySelector('.categories.pm');
const groupDropdown = document.querySelector('.categories.group');
const Dock = document.getElementById('dock');

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
        Dock.classList.add('hide');
    }
});

backToHome.addEventListener('click', () => {
    HomeContainer.classList.remove('down');
    HomeContainer.classList.add('center');
    VerifyPopup.classList.remove('active');
    Dock.classList.remove('hide');
});


function setupDropdownToggle(iconElement, dropdownElement) {
    iconElement.addEventListener('click', () => {
        console.log(`${iconElement.id} clicked`);
        dropdownElement.classList.toggle('active');
    });
}

setupDropdownToggle(groupDropdownIcon, document.querySelector('.categories.group'));
setupDropdownToggle(pmDropdownIcon, document.querySelector('.categories.pm'));

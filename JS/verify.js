const verifyToggle = document.querySelector('.main-toggle.verify');
let IsVerifyOn = false;

verifyToggle.addEventListener('click', () => {
    if(verifyToggle.classList.contains('active')){
        verifyToggle.classList.remove('active');
        IsVerifyOn = false;
        VerifySettings(IsVerifyOn);
    }
    else{
        verifyToggle.classList.add('active');
        IsVerifyOn = true;
        VerifySettings(IsVerifyOn);
    } 
});

function VerifySettings(status){
    const settings = document.querySelectorAll('.content-item.verify')
    if (status === true){
        settings.forEach((element,i)=> {
            setTimeout(() => {     
                if (element.classList.contains('main')){console.log('verify enabled')}
                else{
                    element.style.display = "block";
                    setTimeout(() => {  
                            element.classList.add('enabled');
                        },i*100);
                    }
            }, 100);
        });
    }
    else{
        [...settings].reverse().forEach((element,i) => {
            setTimeout(() => {     
                if (element.classList.contains('main')){console.log('verify enabled')}
                else{
                    element.classList.remove('enabled');       
                    setTimeout(() => {
                        element.style.display = "none";
                    },400);
                }
            }, i*100);
        })
    }
}

//buttons

const buttonStart = document.querySelector('.button_type_start');
const buttonPause = document.querySelector('.button_type_pause');
const buttonStop = document.querySelector('.button_type_stop');
const buttonReset = document.querySelector('.button_type_reset');
const buttonLap = document.querySelector('.button_type_lap');
//timer window elements

const hourElement = document.querySelector('.counter__element_type_hour');
const minuteElement = document.querySelector('.counter__element_type_minute');
const secondElement = document.querySelector('.counter__element_type_second');
const millsecondElement = document.querySelector('.counter__element_type_millsecond');

//hand clock

const hourHand =  document.querySelector('.clock__element_type_hour');
const minuteHand = document.querySelector('.clock__element_type_minute');
const secondHand = document.querySelector('.clock__element_type_second');
const millsecondHand = document.querySelector('.clock__element_type_millsecond');

//container
const lapContainer = document.querySelector('.marks');
const lapContainerEmptyElement = document.querySelector('.marks__empty');


const deg = 0.06;
let millsecond = 00,
    second = 00,
    minute = 00,
    hour = 00,
    clockHandValue = 0.0,
    intervalClock,
    intervalTimer


function srartTimer(){
    clockHandValue++;
    millsecond++;
    //millsec
    if(millsecond<10){
        millsecondElement.textContent = `0${millsecond}`;
    }
    if(millsecond>9){
        millsecondElement.textContent = millsecond;
    }
    if(millsecond> 99){
        millsecond = 00;

        millsecondElement.textContent = `0${millsecond}`;
        second++;
    }
    //sec
    if(second<10){
        secondElement.textContent = `0${second}`;
    }
    if(second>9){
        secondElement.textContent = second;
    }
    if(second>59){
        second = 00;
        secondElement.textContent = `0${second}`;
        minute++;
    }
    //min
    if(minute<10){
        minuteElement.textContent = `0${minute}`;
    }
    if(minute>9){
        minuteElement.textContent = minute;
    }
    if(minute>59){
        minute = 00;
        minuteElement.textContent = `0${minute}`;
        hour;
    }

    //hr
    if(hour<10){
        hourElement.textContent = `0${hour}`;
    }
    if(hour>9){
        hourElement.textContent = hour;
    }

}

function startClock(){
    minuteHand.style.transform = `rotateZ(${minute*deg}deg)`;
    secondHand.style.transform = `rotateZ(${clockHandValue*deg}deg)`;
    millsecondHand.style.transform = `rotateZ(${clockHandValue*3.6}deg)`;
}

function activateButton(button){
    button.classList.remove('button_inactive');
    button.removeAttribute('disabled');
}

function deactivateButton(button){
    button.classList.add('button_inactive');
    button.setAttribute('disabled', 'disabled');
}

function makeLap(){
    const lapTemplate = document.querySelector('#template_type_lap');
    const lapElement = lapTemplate.content.querySelector('.lap').cloneNode(true);
    const lapValue = lapElement.querySelector('.lap__result');
    lapValue.textContent = `${hourElement.textContent} : ${minuteElement.textContent} : ${secondElement.textContent} : ${millsecondElement.textContent}`;
    lapContainer.append(lapElement);
    lapContainerEmptyElement.style.display = 'none';
}

function resetLapContainer(){
    const laps = document.querySelectorAll('.lap');
    laps.forEach(lap => {
        lap.remove();
    })
    lapContainerEmptyElement.style.display = 'flex';
}

buttonStart.addEventListener('click', () => {
    intervalTimer = setInterval(srartTimer, 10);
    intervalClock = setInterval(startClock, 10);
    deactivateButton(buttonStart);
    activateButton(buttonPause);
    deactivateButton(buttonReset);
    activateButton(buttonStop);
    activateButton(buttonLap);
})

buttonPause.addEventListener('click', () => {
    activateButton(buttonStart);
    deactivateButton(buttonPause);
    activateButton(buttonReset)
    clearInterval(intervalTimer);
    clearInterval(intervalClock);
}
)

buttonStop.addEventListener('click', () => {
    deactivateButton(buttonPause);
    deactivateButton(buttonStart);
    deactivateButton(buttonStop);
    activateButton(buttonReset);
    clearInterval(intervalTimer);
    clearInterval(intervalClock);
    deactivateButton(buttonLap);
})

buttonLap.addEventListener('click', () => {
    makeLap();
})

buttonReset.addEventListener('click', () =>{
    activateButton(buttonStart);
    deactivateButton(buttonReset);
    deactivateButton(buttonLap);
    deactivateButton(buttonStop);
    millsecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    clockHandValue = 0;
    millsecondElement.textContent = `0${millsecond}`;
    secondElement.textContent = `0${second}`;
    minuteElement.textContent =`0${minute}`;
    hourElement.textContent = `0${hour}`;
    clearInterval(intervalTimer);
    clearInterval(intervalClock);
    secondHand.style.transform = `rotateZ(${0}deg)`;
    millsecondHand.style.transform = `rotateZ(${0}deg)`;
    minuteHand.style.transform = `rotateZ(${0})deg)`;
    resetLapContainer()
})
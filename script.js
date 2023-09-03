let value = 16;
let div;
let container = document.querySelector('.container');
let choosedColor = "#4C4C6D";
let colorButtonClicked = true;
let rainbowButtonClicked = false;
let rangeInput = document.getElementById('rangeInput');
let inputValue = document.querySelector('.inputValue');
let pickAColor = document.getElementById('pickAColor');
let backColor = document.getElementById('backColor');
let choosedBackColor = "#FFFFFF";

// Listening for the color input element's value
pickAColor.addEventListener('input', function () {
    choosedColor = pickAColor.value;
    listeningToDivs(choosedColor);
});
backColor.addEventListener('input', function () {
    choosedBackColor = backColor.value;
    container.style.backgroundColor = choosedBackColor;
});

function createDivs(n) {
    container.setAttribute("style", `grid-template-columns: repeat(${n}, 1fr); grid-template-rows: repeat(${n}, 1fr);`);

    let i = 0;
    while (i < n * n) {
        div = document.createElement("div");
        div.classList.add('inDiv');
        container.appendChild(div);
        i += 1;
    }
}

// coloring the divs
function changeBackgroudColor(div, color) {
    if (color) {
        div.setAttribute('style', `background-color: ${color};`);
    }  
    else {
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen= Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);
        div.setAttribute('style', `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue})`);
    }
}

function listeningToDivs(color) {
    let divs = document.querySelectorAll('.inDiv');

    divs.forEach(div => {
        // Preventing dragging elements issue
        div.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        div.addEventListener('mouseover', function (e) {
            if (e.buttons === 1) {
                changeBackgroudColor(div, color);
            }
        });

        div.addEventListener('mousedown', function (e) {
            changeBackgroudColor(div, color);
        });
    });
}

function cleaningContainer() {
    let divs = document.querySelectorAll('.inDiv');

    divs.forEach(div => {
        container.removeChild(div);
    });
}

// listening to the value of the range input
rangeInput.addEventListener('input', function () {
    cleaningContainer();
    value = rangeInput.value;
    inputValue.textContent = `${value} x ${value}`;

    createDivs(value);
    if (colorButtonClicked) {
        listeningToDivs(choosedColor);
    }
    else if (rainbowButtonClicked) {
        listeningToDivs(null);
    }
});

createDivs(value);
listeningToDivs(choosedColor);

// clearing the container if clear button was clicked
let clearButton = document.querySelector('.clearButton');

clearButton.addEventListener('click', function () {
    let divs = document.querySelectorAll('.inDiv');
    divs.forEach(div => changeBackgroudColor(div, 'none'));
});

// errasing if eraser button was clicked
let eraserButton = document.querySelector('.eraserButton');

eraserButton.addEventListener('click', function() {
    colorButtonClicked = false;
    rainbowButtonClicked = false;
    listeningToDivs(choosedBackColor);
});

// Switch to color mode if eraser button was clicked
let colorButton = document.querySelector('.colorButton');

colorButton.addEventListener('click', function() {
    colorButtonClicked = true;
    rainbowButtonClicked = false;
    listeningToDivs(choosedColor);
});

// Switch to rainbow mode if rainobow buttons was clicked
let rainbowButton = document.querySelector('.rainbowButton');

rainbowButton.addEventListener('click', function() {
    colorButtonClicked = false;
    rainbowButtonClicked = true;
    listeningToDivs(null);
});

// selecting the color button by default
colorButton.classList.add('selectedButton');

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'selectedButton' class from all buttons
        buttons.forEach(b => b.classList.remove('selectedButton'));

        // Add the 'selectedButton' class to the clicked button
        button.classList.add('selectedButton');
    });
});
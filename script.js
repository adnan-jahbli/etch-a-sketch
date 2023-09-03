let value = 16;
let div;
let container = document.querySelector('.container');
const choosedColor = "#4C4C6D";
let colorButtonClicked = true;

let rangeInput = document.getElementById('rangeInput');
let inputValue = document.querySelector('.inputValue');

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

/* ------------------------------------------------------------- */
// coloring the divs
function changeBackgroudColor(div, color) {
    div.setAttribute('style', `background-color: ${color};`);
}

function listeningToDivs(color) {
    let isMouseDown = false;
    let divs = document.querySelectorAll('.inDiv');

    document.body.onmousedown = () => { isMouseDown = true };
    document.body.onmouseup = () => { isMouseDown = false };

    divs.forEach(div => {
        div.addEventListener('mouseover', function () {
            // console.log('mouseover event: isMouseDown = ' + isMouseDown);
            if (isMouseDown) {
                changeBackgroudColor(div, color);
            }
        });

        div.addEventListener('mousedown', function () {
            // console.log('mousedown event: isMouseDown = ' + isMouseDown);
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
});

createDivs(value);
listeningToDivs(choosedColor);

// clearing the container if clear button is clicked
let clearButton = document.querySelector('.clearButton');

clearButton.addEventListener('click', function () {
    let divs = document.querySelectorAll('.inDiv');
    divs.forEach(div => changeBackgroudColor(div, 'none'));
});

// errasing if eraser button is clicked
let eraserButton = document.querySelector('.eraserButton');

eraserButton.addEventListener('click', function () {
    colorButtonClicked = false;
    listeningToDivs('#fff');
});

// Switch to color mode if eraser button is clicked
let colorButton = document.querySelector('.colorButton');

colorButton.addEventListener('click', function () {
    colorButtonClicked = true;
    listeningToDivs(choosedColor);
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
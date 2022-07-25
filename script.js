//basic operations
function add(a,b){
  return a + b;
}

function substract(a,b){
  return a - b;
}

function multiply(a,b){
  return a * b;
}

function divide(a,b){
  return a / b;
}


function operate(a, operator, b){
  switch(operator){
    case "*":
      return multiply(a,b);
    case "+":
      return add(a,b);
    case "-":
      return substract(a,b);
    case "/":
      return divide(a,b);
    default:
      return;
  }
}

//functionality
const inputDisplay = document.querySelector('.input');
const firstNumberDisplay = document.querySelector('.first-number');
const secondNumberDisplay = document.querySelector('.second-number');
const operatorDisplay = document.querySelector('.operator');

let input = '0';
let currentOperator = null;
let firstNumber = null;
let secondNumber = null;
let inputIsResult = false;

function niceOperator(operator){
  switch(operator){
    case "/":
      return "÷";
    case "*":
      return "×";
    default:
      return operator;
  }
}

function updateDisplay(){
  if(input.length < 1){
    input = '0';
  }
  updateOperatorButtons();
  firstNumberDisplay.innerText = firstNumber !== null ? firstNumber.toLocaleString("en-US") : "";
  secondNumberDisplay.innerText = secondNumber !== null ? secondNumber.toLocaleString("en-US") : "";
  operatorDisplay.innerText = currentOperator ? niceOperator(currentOperator) : "";

  inputDisplay.innerText = parseFloat(input).toLocaleString("en-US");
  let fontSize = 42;
  let inputString = inputDisplay.innerText;
  if(inputString.length > 11){
    let inputDisplayWidth = window.getComputedStyle(inputDisplay).width;
    let displayWidth = window.getComputedStyle(document.querySelector('.display')).width;
    while(inputDisplayWidth > displayWidth){
      inputDisplayWidth = window.getComputedStyle(inputDisplay).width;
      fontSize--;
      inputDisplay.style.fontSize = `${fontSize}px`;
    }
    console.log(fontSize);
  }
  inputDisplay.style.fontSize = `${fontSize}px`;
}

function updateOperatorButtons(){
  ['/','*','-','+','='].forEach(id => {
    if(currentOperator == id) return;
    let element = document.getElementById(id);
    element.classList.remove('selected-operator');
  });
}

function updateLastOperation(){
  if(firstNumber !== null && currentOperator !== null && secondNumber !== null){
    firstNumberDisplay.innerText = firstNumber.toLocaleString("en-US");
    secondNumberDisplay.innerText = secondNumber.toLocaleString("en-US");
    operatorDisplay.innerText = niceOperator(currentOperator);
  } else {
    firstNumberDisplay.innerText = "";
    secondNumberDisplay.innerText = "";
    operatorDisplay.innerText = "";
  }
}

function updateResult(){
  let result = operate(firstNumber,currentOperator,secondNumber);
  if(typeof result !== "number") result = 0;
  input = Math.round(result * 100) / 100;
  updateDisplay();
  updateLastOperation();
  inputIsResult = true;
  currentOperator = null;
  updateOperatorButtons();
  firstNumber = null;
  secondNumber = null;
}

//number buttons
for(i = 0; i <= 9; i++){
  let numberButton = document.getElementById(i);
  numberButton.addEventListener('click', event => {
    let element = event.currentTarget; //gets the actual button, not the child icon
    let number = element.id;
    if(inputIsResult){
      input = 0;
      inputIsResult = false;
      updateLastOperation();
    }
    if(input == 0){
      input = number;
    } else {
      if(input.length >= 9) return;
      input = input + `${number}`;
    }
    updateDisplay();
  });
}

//dot button
document.getElementById("dot").addEventListener('click', event => {
  if(input.includes(".")) return;
  input = input + '.';
  updateDisplay();
});


//operator buttons
['/','*','-','+','='].forEach(id => {
  document.getElementById(id).addEventListener('click', event => {
    let element = event.currentTarget;

    if(element.id == "="){
      if(firstNumber !== null && currentOperator !== null && input !== null) {
        secondNumber = parseFloat(input);
        updateResult();
      }
      return;
    }

    if(firstNumber == null){
      firstNumber = parseFloat(input);
      input = '0';
    } else {
      secondNumber = parseFloat(input);
      updateResult();
      return;
    }
    currentOperator = element.id;
    element.classList.add('selected-operator');
    updateDisplay();
  });
});

//undo button
document.getElementById("undo").addEventListener('click', event => {
  if(input.length < 1 || input == 0) return;
  input = `${input}`.substring(0, input.length - 1);
  updateDisplay();
});

//clear button
document.getElementById("clear").addEventListener('click', event => {
  input = '0';
  currentOperator =  null;
  firstNumber = null;
  secondNumber = null;
  updateDisplay();
});

//negative-positive button
document.getElementById("plus-minus").addEventListener('click', event => {
  input = input * -1;
  updateDisplay();
})

//percent button
document.getElementById("percent").addEventListener('click', event => {
  input = input * 0.01;
  updateDisplay();
})

//keyboard support
window.addEventListener('keydown',event => {
  let key = event.key;
  let button = document.querySelector(`button[data-key="${key}"]`);
  if(!button) return;
  let e = new Event('click');
  button.dispatchEvent(e);
});

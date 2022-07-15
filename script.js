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
  inputDisplay.innerText = parseFloat(input).toLocaleString("en-US");
  firstNumberDisplay.innerText = firstNumber !== null ? firstNumber.toLocaleString("en-US") : "";
  secondNumberDisplay.innerText = secondNumber !== null ? secondNumber.toLocaleString("en-US") : "";
  operatorDisplay.innerText = currentOperator ? niceOperator(currentOperator) : "";
}

function updateOperatorButtons(){
  ['/','*','-','+','='].forEach(id => {
    if(currentOperator == id) return;
    let element = document.getElementById(id);
    element.classList.remove('selected-operator');
  });
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

//operator buttons
['/','*','-','+','='].forEach(id => {
  document.getElementById(id).addEventListener('click', event => {
    let element = event.currentTarget;

    if(element.id == "="){
      if(firstNumber !== null && currentOperator !== null && input !== null) {
        secondNumber = parseFloat(input);
        showResult();
        console.log('showing result');
      }
      console.log('end');
      return;
    }

    if(firstNumber == null){
      firstNumber = parseFloat(input);
      input = '0';
      console.log('first number');
    } else {
      secondNumber = parseFloat(input);
      showResult();
      console.log('second number');
      return;
    }
    currentOperator = element.id;
    element.classList.add('selected-operator');
    updateDisplay();
  });
});

//calculate and display operation result
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

function showResult(){
  let result = operate(firstNumber,currentOperator,secondNumber);
  if(!Number.isInteger(result)) result = 0;
  console.log('result: ' + result + ' ' + secondNumber);
  input = result;
  updateDisplay();
  updateLastOperation();
  inputIsResult = true;
  currentOperator = null;
  updateOperatorButtons();
  firstNumber = null;
  secondNumber = null;
}

//undo button
document.getElementById("undo").addEventListener('click', event => {
  if(input.length < 1 || input == 0) return;
  input = input.substring(0, input.length - 1);
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

//keyboard support
window.addEventListener('keydown',event => {
  let key = event.key;
  if(key == "Enter") key = "=";
  let button = document.querySelector(`button[data-key="${key}"]`);
  if(!button) return;
  let e = new Event('click');
  button.dispatchEvent(e);
});

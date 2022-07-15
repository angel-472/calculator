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

let input = 0;
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
  inputDisplay.innerText = parseInt(input).toLocaleString("en-US");
  ['/','*','-','+','='].forEach(id => {
    if(currentOperator == id) return;
    let element = document.getElementById(id);
    element.classList.remove('selected-operator');
  });
  firstNumberDisplay.innerText = firstNumber ? firstNumber.toLocaleString("en-US") : "";
  secondNumberDisplay.innerText = secondNumber ? secondNumber.toLocaleString("en-US") : "";
  operatorDisplay.innerText = currentOperator ? niceOperator(currentOperator) : "";
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

    if(!firstNumber){
      firstNumber = parseInt(input);
      input = 0;
    } else if(secondNumber) {
      firstNumber = secondNumber;
      secondNumber = parseInt(input);
      showResult();
    } else {
      secondNumber = parseInt(input);
      showResult();
    }

    if(element.id == "="){
      if(firstNumber && currentOperator && secondNumber) {
        showResult();
      }
      return;
    }
    currentOperator = element.id;
    element.classList.add('selected-operator');
    updateDisplay();
  });
});

//calculate and display operation result
function updateLastOperation(){
  if(firstNumber && currentOperator && secondNumber){
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
  if(result == undefined) return;
  input = result;
  inputIsResult = true;
  currentOperator = null;
  firstNumber = 0;
  secondNumber = null;
  updateDisplay();
  updateLastOperation();
}


//keyboard support
window.addEventListener('keydown',event => {
  console.log(event);
  let button = document.querySelector(`button[data-key="${event.key}"]`);
  if(!button) return;
  let e = new Event('click');
  button.dispatchEvent(e);
});

let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '0';
let result = '';

let waitingForSecondNumber = false;

function add (a, b) 
{
  return a + b;
}

function subtract(a, b)
{
  return a - b;
}

function multiply(a, b)
{
  return a * b;
}

function divide(a, b)
{
    if (b === 0) 
    {
        return "Error!";
    }
    return a / b;
}

function roundResult(value, decimalPlaces) 
{
    return Number(value.toFixed(decimalPlaces));
}

function operate(firstNumber, secondNumber, operator)
{
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    let result;
    switch (operator) 
    {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
    }
    
    return typeof result === "string" ? result : roundResult(result, 4);
}


function updateDisplay() 
{
    document.querySelector('.display span').textContent = displayValue;
}

function handleNumberClick(e) 
{
    const number = e.target.textContent;

    if (displayValue === result.toString()) 
    {
        displayValue = number; 
        result = ''; 
    } 
    else if (waitingForSecondNumber) 
    {
        displayValue = number; 
        waitingForSecondNumber = false; 
    } 
    else 
    {
        displayValue = displayValue === '0' ? number : displayValue + number; 
    }

    updateDisplay();
}


function handleOperatorClick(e) 
{
    const clickedOperator = e.target.textContent;

    if (firstNumber === '') 
    {
        firstNumber = displayValue;
    } 
    else if (operator) 
    {
        secondNumber = displayValue;
        result = operate(firstNumber, secondNumber, operator);
        displayValue = String(result);
        firstNumber = result;
    }

    operator = clickedOperator;
    waitingForSecondNumber = true;

    updateDisplay();
}


function handleEqualsClick() 
{
    if (firstNumber !== '' && operator !== '') 
    {
        secondNumber = displayValue;
        result = operate(firstNumber, secondNumber, operator);
        displayValue = String(result);
        firstNumber = '';
        operator = '';
        waitingForSecondNumber = false;
        updateDisplay();
    }
}

function handleClearClick() 
{
    displayValue = '0';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    waitingForSecondNumber = false;
    updateDisplay();
}

const numberButtons = document.querySelectorAll('.digit, .zero');
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', handleEqualsClick);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', handleClearClick);
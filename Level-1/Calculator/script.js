let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let expression = "";
let isResultShown = false;
let operators = ['+', '-', '*', '/', '%'];

// Loop through all buttons
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

// --- IF-ELSE Logic ---
    if (value === 'AC') {
      expression = "";
      input.value = "";
      isResultShown = false;
    } 
    else if (value === 'DEL') {
      expression = expression.slice(0, -1);
      input.value = expression;
    } 
    else if (value === '=') {
      calculate();
    } 
    else {
      handleInput(value);
    }
  });
});

// Handle number/operator/decimal input 
function handleInput(value) {
  let lastChar = expression[expression.length - 1];

  // Prevent two operators in a row
  if (operators.includes(value) && operators.includes(lastChar)) return;

  // Prevent multiple decimals in same number
  if (value === '.') {
    let parts = expression.split(/[\+\-\*\/%]/);
    let lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  // Replace last operator if new one entered
  if (operators.includes(value) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1);
  }

  // Continue expression after result
  if (isResultShown && !operators.includes(value)) {
    expression = value;
    isResultShown = false;
  } else if (isResultShown && operators.includes(value)) {
    isResultShown = false;
    expression += value;
  } else {
    expression += value;
  }

  input.value = expression;
}

// Main Calculation Function
function calculate() {
  try {
    // Prevent trailing operator
    let lastChar = expression[expression.length - 1];
    if (operators.includes(lastChar)) expression = expression.slice(0, -1);

    // Evaluate safely
    let result = Function('return ' + expression)();
    if (result === Infinity || isNaN(result)) throw Error;
    input.value = result;
    expression = result.toString();
    isResultShown = true;
  } catch {
    input.value = "Error";
    isResultShown = true;
  }
}

  //EventsListeners
document.addEventListener('keydown', (e) => {
  let key = e.key;

  if (/^[0-9]$/.test(key) || key === '.') {
    handleInput(key);
  } 
  else if (operators.includes(key)) {
    handleInput(key);
  } 
  else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } 
  else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    input.value = expression;
  } 
  else if (key === 'Escape') {
    expression = "";
    input.value = "";
  }
});

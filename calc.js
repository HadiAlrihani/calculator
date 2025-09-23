//simple function to add 2 numbers
function add(num1, num2) {
    return num1 + num2;
}

//simple function to subtract 2 numbers
function subtract(num1, num2) {
    return num1 - num2;
}

//simple function to multiply 2 numbers
function multiply(num1, num2) {
    return num1 * num2;
}

//simple function to divide 2 numbers
function divide(num1, num2) {
    // num1 and num2 are already floats/doubles
    return num1 / num2;
}

//operands and operator are at null by default
var operand1 = null;
var operand2 = null;
var operator = null;

//function to operate on 2 numbers based on the operator
function operate(operand1, operator, operand2) {
    let result;
    if (operator == '+') {
        result = add(operand1, operand2); 
    }
    else if (operator == '-') {
        result = subtract(operand1, operand2);
    }
    else if (operator == '*') {
        result = multiply(operand1, operand2);
    }
    else if (operator == '/') {
        if (operand2 == 0) {
            result = "Error"
        } else {
            result = divide(operand1, operand2);
        }
    }

    return result;
}

//keep track of previous input
let previousInput = null;

//list of operators
const operators = ['+', '-', '/', '*', '='];

//select the display div of the calculator
const display = document.querySelector('#display');

//select all display buttons ('0'-'9', '.')
const displayButtons = document.querySelectorAll('.number-button');

displayButtons.forEach(display_button => {
    display_button.addEventListener('click', function() {
        const item = display_button.textContent.trim(); //most recently inputted display button
        const current = display.textContent.trim(); //number that is currently in the display
        console.log("previous input: " + previousInput);
        //ensure display doesn't overflow
        if (current.length < 18) {
            if (current === '0') { //display is not holding any value currently
                if (item != '.') { 
                    display.textContent = item; //replace starting or redundant "0"
                } else {
                    display.textContent += item; //append decimal after the 0
                }
            } else { //display is already populated with a number
                if (operators.includes(previousInput)) { //previous input was an operator
                    display.textContent = item; //replace current display number with new input
                }
                else {
                    if (item == '.') {
                        if (!current.includes('.')) {
                            display.textContent = current + item; // append decimal to number
                        }
                    }else {
                        display.textContent = current + item; // append number to display
                    }
                }
            }   
        }
        previousInput = display_button.textContent.trim(); //set previousInput to be the last inputted button
    });
});

//constant to represent the ac button
const acButton = document.querySelector('#ac-button');

//when the AC button is pressed, the calculator should be reset
acButton.addEventListener('click', function() {
    //reset variables
    operand1 = null;
    operand2 = null;
    operator = null;

    //reset display
    display.textContent = "0";
});

//constant representing the operator buttons
const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(operator_button => {
    operator_button.addEventListener('click', function() {

        //operand1 becomes the display number if it is previously null
        if (operand1 == null) {
            operand1 = parseFloat(display.textContent.trim());
         }
        console.log(operand1, operator, operand2);

        //first time operator is being pressed
        if (operator == null) {
            operator = operator_button.textContent.trim();
            if (operand1 == null) {
                operand1 = parseFloat(display.textContent.trim());
            }
        } else { //operator has been pressed previousl
            // only evaluate when the user is not repeatedly pressing operators buttons
            if (!operators.includes(previousInput)) {
                operand2 = parseFloat(display.textContent.trim());
                result = operate(operand1, operator, operand2);
                operand1 = result; //store the result in operand1

                //round to 3 decimals if not divisible by 1, else just represent the whole number
                let resultRounded = result % 1 == 0 ? parseFloat(result.toFixed(0)) : parseFloat(result.toFixed(3));
                
                display.textContent = resultRounded; //display the result
                operator = operator_button.textContent; //update operator variable

            } else { //replace previous operator with most recently inputted one
                operator = operator_button.textContent.trim();
            }
        }
        previousInput = operator_button.textContent.trim(); //set previousInput to be the last inputted button
    });
});

//constant to represent the equals button
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', function() {

    //only operate when the previous input was not also an operator
    if (!operators.includes(previousInput)) {

        //equals operation cannot be valid unless both operand1 and operator have been manipulated,
        //meaning that the user has pressed an oeprator button so that both operator and operand1 were updated
        if (!(operand1 == null || operator == null)) {
            operand2 = parseFloat(display.textContent.trim());
            console.log(operand1, operator, operand2);
            let result = Number(operate(operand1, operator, operand2));
            operand1 = result;

            //round to 3 decimals if not divisible by 1, else just represent the whole number
            let resultRounded = result % 1 == 0 ? parseFloat(result.toFixed(0)) : parseFloat(result.toFixed(3));
            
            display.textContent = resultRounded;
            operator = null; 
            operand2 = null;
        }   
    }
    previousInput = '='; //set previous operator input to be equals sign
});
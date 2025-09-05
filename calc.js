function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    // num1 and num2 are already floats/doubles
    return num1 / num2;
}

var operand1;
var operand2;
var operator;

function operate(operand1, operator, operand2) {
    let result
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
        result = divide(operand1, operand2);
    }

    return result;

}
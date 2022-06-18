const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

const updateDisplay = () => {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

const clearCalculator = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

const inputDigit = (digit) => {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
};

const inverseNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber *= -1;
};

const percentNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber /= 100;
};

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
    calculator.displayNumber = "0";
  } else {
    alert("Operator Sudah Ditetapkan");
  }
};

const performCalculation = () => {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda Belum Menetapkan Operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else if (calculator.operator === "-") {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  } else if (calculator.operator === "/") {
    result =
      parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
  } else if (calculator.operator === "x") {
    result =
      parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
  } else {
    result = Math.pow(
      parseInt(calculator.firstNumber),
      parseInt(calculator.displayNumber)
    );
  }

  calculator.displayNumber = result;
};

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("percent")) {
      percentNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

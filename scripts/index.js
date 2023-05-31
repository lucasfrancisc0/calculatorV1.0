const buttonsNumbers = document.querySelectorAll('.primary, .secondary, .tertiary')
const historicDisplay = document.querySelector('#historicDisplay')
const displayResults = document.querySelector('#resultOperations')
const buttonCE = document.querySelector('#cleardisplay')



function calc ({
  displayResults,
  historicDisplay,
  buttonsNumbers,
}) {

  let currentOperation = ""



  function addDigit (digit) {

    if(digit === "." && displayResults.innerText.includes(".")){
      return
    }
    currentOperation = digit
    updateDisplay()
  }

  function updateDisplay(operationValue = null, 
    operation = null, 
    current = null,
    previous = null
     ) {

    if(operationValue === null){
      displayResults.textContent += currentOperation
    } else {
      if(previous === 0) {
        operationValue = current
      }

      historicDisplay.innerText = `${operationValue} ${operation}`
      displayResults.innerText = ""
    }
  }

  function changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"]
    if(!mathOperations.includes(operation)) {
      return
    }

    historicDisplay.innerText = historicDisplay.innerText.slice(0, -1) + operation
  }

  function processClearCurrentOperation() {
    displayResults.textContent = ""
  }

  function processClearAll() {
    displayResults.textContent = ""
    historicDisplay.textContent = ""
  }

  function processEqualOperator() {
    const operation = historicDisplay.textContent.split(" ")[1]
    processOperation(operation)
  }

  function processOperation(operation) {

    if(displayResults.innerText === "" && operation !== "C") {
      if(historicDisplay.innerText !== "") {
        changeOperation(operation)
      }
      return
    }

    let operationValue 
    let previous = +historicDisplay.innerText.split(" ")[0]
    let current = +displayResults.innerText

    switch(operation) {
      case "+":
        operationValue = previous + current
        updateDisplay(operationValue, operation, current, previous)
        break
      case "-":
        operationValue = previous - current
        updateDisplay(operationValue, operation, current, previous)
        break
      case "/":
        operationValue = previous / current
        updateDisplay(operationValue, operation, current, previous)
        break
      case "*":
        operationValue = previous * current
        updateDisplay(operationValue, operation, current, previous)
        break
      case "CE":
        processClearCurrentOperation()
        break
      case "C":
        processClearAll()
        break
        case "=":
          processEqualOperator()
          break
      default:
        return
    }

  }

  return {
    addDigit, 
    processOperation
  }

}

const calculator = calc({
  displayResults,
  historicDisplay,
  buttonsNumbers
})


function valueButtons() {
  buttonsNumbers.forEach((button) => {
    button.addEventListener('click', function (){
      const value = this.value
      
      if(+value >= 0 || value === ".") {
        calculator.addDigit(value)
      } else {
        calculator.processOperation(value)
      }
    })
  })
  }


valueButtons()


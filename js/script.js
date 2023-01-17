const prevOperationTxt = document.getElementById('previous')
const currentOperationTxt = document.getElementById('current')
const buttons = document.querySelectorAll("#buttonscontainer button")

class Calculator {
    constructor(prevOperationTxt, currentOperationTxt) {
        this.prevOperationTxt = prevOperationTxt
        this.currentOperationTxt = currentOperationTxt
        this.currentOperation = ""
    }

    addDigit(digit) {
        if (digit === "." && this.currentOperationTxt.innerText.includes(".")){
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // Process all calculator Operations
    processOperation(operation) {
        //checagem se current esta vazio
        if (this.currentOperationTxt.innerText === "" && operation !== "C") {
            // mudança de operação
            if (this.prevOperationTxt.innerText !== "") {
                this.changeOperation(operation)    
            }
            return
        }





    // Obtendo valores de current e previous
    let operationValue
    const previous = +this.prevOperationTxt.innerText.split(" ")[0]
    const current = +this.currentOperationTxt.innerText

    switch(operation) {
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous);
          break
          case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous);
          break
          case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous);
          break
          case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous);
          break
          case "DEL":
            this.processDelOperation()
          break
          case "CE":
            this.processClearOperation()
          break
          case "C":
            this.processClearAllOperation()
          break
          case "=":
            this.processEqualOperation()
          break
        default:
          return
    }    

    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        console.log(operationValue, operation, current, previous)

        if(operationValue === null){
            this.currentOperationTxt.innerText += this.currentOperation
        } else {
            //checagem se value é zero, se for apenas add current value
            if (previous === 0) {
                operationValue = current
            }

            //add current value para previous
            this.prevOperationTxt.innerText = `${operationValue} ${operation}`
            this.currentOperationTxt.innerText = ''
        }
        
    }

    // mudando math operation
    changeOperation(operation) {

        const mathOperations = ["+", "-", "/", "*"]

        if(!mathOperations.includes(operation)){
            return
        }

        this.prevOperationTxt.innerText = this.prevOperationTxt.innerText.slice(0, -1) + operation
    }

    //Delet o ultimo digito
    processDelOperation() {
        this.currentOperationTxt.innerText = this.currentOperationTxt.innerText.slice(0,-1)
    }

    //limpando current operation
    processClearOperation() {
        this.currentOperationTxt.innerText = "" 
    }

    //limpando toda operação
    processClearAllOperation() {
        this.currentOperationTxt.innerText = ""
        this.prevOperationTxt.innerText = ""
    }

    // calculando as operações
    processEqualOperation() {

        const operation = prevOperationTxt.innerText.split(" ")[1]

        this.processOperation(operation)

    }

}

const calc = new Calculator(prevOperationTxt, currentOperationTxt)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText

        
        if (+value >= 0 || value === ".") {
           calc.addDigit(value) 
        } else {
            calc.processOperation(value)
        }
    })
})
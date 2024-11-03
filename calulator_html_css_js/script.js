class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clearAll()
    }

    clearAll(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
        

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    appendNumtoScreen(number){
        if(number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }


    calculate(){
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return                
        }
        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''

    }
    getDispayNumber(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1] 
        let integerDispaly
        if (isNaN(integerDigits)){
            integerDispaly = ''
        } else{
            integerDispaly = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${integerDispaly}.${decimalDigits}`
        } else{
            return integerDispaly
        }

    }


    updateDispaly(){

        this.currentOperandElement.innerText = this.getDispayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandElement.innerText = `${this.getDispayNumber(this.previousOperand)} ${this.operation}`

        } else{
            this.previousOperandElement.innerText = ''

        }
        
        
    }


}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
let previousOperandElement = document.querySelector('[data-previous-operand]')
let currentOperandElement = document.querySelector('[data-current-operand]')





const calculator = new Calculator(previousOperandElement, currentOperandElement)


numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumtoScreen(button.innerText)
        calculator.updateDispaly()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDispaly()
    })
})


equalsButton.addEventListener('click', button =>{
    calculator.calculate()
    calculator.updateDispaly()
})


allClearButton.addEventListener('click', button =>{
    calculator.clearAll()
    calculator.updateDispaly()
})


deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDispaly()
})
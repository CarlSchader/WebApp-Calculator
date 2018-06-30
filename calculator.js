appendDisplay = function()
{
	if(display.innerHTML === "0")
	{
		display.innerHTML = this.innerHTML
		return
	}
	display.innerHTML = display.innerHTML + this.innerHTML
}

function setStatesOn(str)
{
	negative = false
	decimalActive = false
	decimalButton.className = "btn btn-info"
	if(str.includes("."))
	{
		decimalButton.className = "btn btn-info active"
		decimalActive = true
	}
	if(str.includes("-"))
	{
		negative = true
	}
}

function clearOperations()
{
	addButton.className = "btn btn-primary"
	minusButton.className = "btn btn-primary"
	multiplyButton.className = "btn btn-primary"
	divideButton.className = "btn btn-primary"
}

var operation = function(){
	if(this.className === "btn btn-primary active")
	{
		display.innerHTML = operationStore.innerHTML
		setStatesOn(operationStore.innerHTML)
		operationStore.innerHTML = ""

		this.className = "btn btn-primary"
	}
	else
	{
		if(operationStore.innerHTML === "")
		{
			operationStore.innerHTML = display.innerHTML
		}
		display.innerHTML = "0"
		setStatesOn(display.innerHTML)
		clearOperations()
		this.className = "btn btn-primary active"
	}
}

var display = document.getElementById("calculator-display")
var digits = new Array(10)
var decimalButton = document.getElementById("calculator-.")
var clear = document.getElementById("calculator-clr")
var negateButton = document.getElementById("calculator-(-)")
var storeButton = document.getElementById("calculator-store")
var addButton = document.getElementById("calculator-+")
var minusButton = document.getElementById("calculator--")
var multiplyButton = document.getElementById("calculator-x")
var divideButton = document.getElementById("calculator-/")
var operationStore = document.getElementById("calculator-operation-store")
var storeDisplay = document.getElementById("calculator-store-display")
var equateButton = document.getElementById("calculator-=")

var store = null
var decimalActive = false
var negative = false

for(var i=0;i<10;i++)
{
	digits[i] = document.getElementById("calculator-" + i.toString())
	digits[i].addEventListener("click", appendDisplay)
}

decimalButton.addEventListener("click", function(){
	if(!decimalActive)
	{
		display.innerHTML = display.innerHTML + "."
		decimalButton.className = "btn btn-info active"
		decimalActive = true
	}
})

negateButton.addEventListener("click", function(){
	if(display.innerHTML === "0")
	{
		return
	}
	if(display.innerHTML[0] === "-")
	{
		display.innerHTML = display.innerHTML.substr(1)
		negative = false
	}
	else
	{
		display.innerHTML = "-" + display.innerHTML
		negative = true
	}
})

clear.addEventListener("click", function(){
	if(display.innerHTML === "0")
	{
		setStatesOn("0")
		clearOperations()
		operationStore.innerHTML = ""
	}
	else
	{
		display.innerHTML = "0"
		setStatesOn("0")
	}
})

storeButton.addEventListener("click", function(){
	if(storeButton.innerHTML === "store")
	{
		store = display.innerHTML
		storeDisplay.innerHTML = store
		display.innerHTML = "0"
		decimalButton.className = "btn btn-info"
		decimalActive = false
		negative = false
		storeButton.innerHTML = "load"
	}
	else
	{
		display.innerHTML = store
		setStatesOn(store)
		store = null
		storeDisplay.innerHTML = ""
		storeButton.innerHTML = "store"
	}
})



addButton.addEventListener("click", operation)
minusButton.addEventListener("click", operation)
multiplyButton.addEventListener("click", operation)
divideButton.addEventListener("click", operation)

equateButton.addEventListener("click", function(){
	if(operationStore.innerHTML != "")
	{
		if(addButton.className === "btn btn-primary active")
		{
			display.innerHTML = parseFloat(operationStore.innerHTML) + parseFloat(display.innerHTML)
		}
		else if(minusButton.className === "btn btn-primary active")
		{
			display.innerHTML = parseFloat(operationStore.innerHTML) - parseFloat(display.innerHTML)
		}
		else if(multiplyButton.className === "btn btn-primary active")
		{
			display.innerHTML = parseFloat(operationStore.innerHTML) * parseFloat(display.innerHTML)
		}
		else if(divideButton.className === "btn btn-primary active")
		{
			display.innerHTML = parseFloat(operationStore.innerHTML) / parseFloat(display.innerHTML)
		}
	}
	clearOperations()
	setStatesOn(display.innerHTML)
	operationStore.innerHTML = ""
})
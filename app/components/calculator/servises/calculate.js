module.exports = function (app) {
    app.service('operationsService', function() {
        this.first = {value:'0'};
        this.second = {value:''};
        this.operator = {value:''};

        this.default = 0;

        this.topScreen = {value: ''};
        this.botScreen = {value: this.first.value};

        // switcher to change input to a second number

        this.toggle = true;

        // accept user click and choose proper function

        this.btnClick = (inputType, inputData) => {
            switch (inputType) {
                case 'number':
                                this.setValue(inputData);
                                break;
                case 'operator':
                                this.setOperator(inputData);
                                break;
                case 'operation':
                                this.checkOperation(inputData);
                                break;
            }
            this.first.value = this.addComa(this.first.value);
            this.second.value = this.addComa(this.second.value);
            this.checkWhatToDisplay();
        };

        // check for operation

        this.checkOperation = (operation) => {
            switch (operation) {
                case '√':
                        this.getSquareRoot();
                        break;
                case 'x²':
                        this.bringToPower();
                        break;
                case '⅟':
                        this.divideOneByFirst();
                        break;
                case 'C':
                        this.reset();
                        break;
                case 'CE':
                        this.reset();
                        break;
                case '⌫':
                        this.back();
                        break;
                case '±':
                        this.changeMinus();
                        break;
                case '.':
                        this.handleDecimalDot('.');
                        break;
                case '=':
                        this.handleEquilButton();
                        break;
            }
        };

        // make top and bot screens display proper values

        this.checkWhatToDisplay = () => {
            if (this.toggle) {
                this.topScreen.value = '';
                this.botScreen.value = this.first.value;
            } else {
                this.topScreen.value = `${this.first.value} ${this.operator.value}`;
                this.botScreen.value = this.second.value;
            }
        };

        // find out: first or second operand is adding..

        this.setValue = value => {
            return this.toggle ? this.setFirstOperand(value) : this.setSecondOperand(value);
        };

        // Set value for this.first variable

        this.setFirstOperand = firstOperand => {
            if (this.first.value === '0') {
                this.first.value = firstOperand;
            } else if ( (this.removeComa(this.first.value)).length < 16 ) {
                this.first.value = this.first.value.concat(firstOperand);
            }
        };

        // Set value for this.second variable
        // && this.removeComa(this.second.value).length < 16) BUG BUG BUG rewrite!!!
        this.setSecondOperand = secondOperand => {
            if (this.second.value == '' || this.second.value == '0' || this.second.value === this.default) {
                this.second.value = secondOperand;
            } else if ( this.removeComa(this.second.value).length < 16) {
                this.second.value = this.second.value.concat(secondOperand);
            }
        };

        // Set value for this.operator variable and check this.first

        this.setOperator = operator => {
            if (this.second.value && this.operator.value) {
              this.actionPlusChooseNextOperator(operator);
            } else {
                this.operator.value = operator;
                this.default = this.first.value;
                this.second.value = this.default;
                this.toggle = false;
            }
        };

        // check for proper action if both operands and operator were chosen

        this.handleEquilButton = () => {
            if (this.operator.value && this.second.value) {
                this.makeSomeMath(this.operator.value);
            }
        };

        // remove comas from a string

        this.removeComa = (operand) => {
            if (operand !== '') {
                return operand.replace(/,/g, '');
            }
        };

        // add coma each 3 symbol, minus and dot will be handled properly

        this.addComa = (operand) => {
            let includesDot = operand.endsWith('.');

            if (operand.includes('Infinity')) {
                return operand;
            }

            operand = Number(this.removeComa(operand)).toLocaleString('En-us', { maximumFractionDigits: 17 });
            return includesDot ? operand.concat('.') : operand;
        };

        // check for proper dot(.) usage..

        this.handleDecimalDot = dot => {
            let floatNumber = this.toggle ? this.first : this.second;

            if ( !floatNumber.value.includes('.') ) {
                floatNumber.value = floatNumber.value.concat(dot);
            }
        };

        // check operator and use proper action

        this.makeSomeMath = value => {
            switch(this.operator.value) {
                case '+':
                        this.add();
                        break;
                case '✕':
                        this.multiple();
                        break;
                case '–':
                        this.minus();
                        break;
                case '÷':
                        this.divide();
                        break;
                case '%':
                        this.module();
                        break;
            }
            this.second.value = '';
            this.operator.value = '';
            this.toggle = true;
        };

        /*
        * start makeSomeMath() when both operands and operator is present
        * and choose clicked operator for next action
        */

        this.actionPlusChooseNextOperator = operator => {
            this.makeSomeMath(operator);
            this.operator.value = operator;
            this.toggle = false;
        };

        // remove commas and change data type to Number

        this.prepareForMath = (operand) => {
            return Number(this.removeComa(operand));
        };

        // arithmetic operations to be done with makeSomeMath() execution

        this.add = () => {
            this.first.value = ( this.prepareForMath(this.first.value) + this.prepareForMath(this.second.value) ).toString();
        };

        this.multiple = () => {
            this.first.value = ( this.prepareForMath(this.first.value) * this.prepareForMath(this.second.value) ).toString();
        };

        this.minus = () => {
            this.first.value =  ( this.prepareForMath(this.first.value) - this.prepareForMath(this.second.value) ).toString();
        };

        this.divide = () => {
            this.first.value = ( this.prepareForMath(this.first.value) / this.prepareForMath(this.second.value) ).toString();
        };

        this.module = () => {
            this.first.value = ( this.prepareForMath(this.first.value) % this.prepareForMath(this.second.value) ).toString();
        };

        // clear calculator operands and operator

        this.reset = () => {
            this.first.value = '0';
            this.second.value = '';
            this.operator.value = '';
            this.toggle = true;
        };

        // clear last symbol of a current operand

        this.back = () => {
           var obj = this.toggle ? this.first : this.second;
           obj.value = obj.value.length === 1 ? '0' : obj.value.slice(0, -1);
        };

        // Change minus to plus and Vice Versa

        this.changeMinus = () => {
            let operand = this.toggle ? this.first : this.second;
            operand.value = (this.prepareForMath(operand.value) * (-1)).toString();
        };

        // bring to power a number

        this.bringToPower = () => {
            if (this.toggle) {
                this.first.value = ( Math.pow(this.prepareForMath(this.first.value), 2) ).toString();
            }
        };

        // Divide 1 by this.first

        this.divideOneByFirst = () => {
            if (this.toggle) {
                this.first.value = ( 1 / this.prepareForMath(this.first.value)).toString();
            }
        };

        // get square root of a Number

        this.getSquareRoot = () => {
            if (this.toggle) {
                this.first.value = ( Math.pow(this.prepareForMath(this.first.value), 0.5) ).toString();
            }
        };
    });
}

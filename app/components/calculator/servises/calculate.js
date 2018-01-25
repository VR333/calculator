module.exports = function (app) {
    app.service('operationsService', function() {
        [this.firstOperand, this.secondOperand] = [ {value:'0'}, {value:''} ];
        [this.operator, this.defaultOperand] = [ {value:''}, 0];

        // switcher to handle default value, when it should be cleared and when not
        this.clearDefaultOperand = true;

        [this.topScreen, this.botScreen] = [ {value: ''}, {value: this.firstOperand.value} ];

        // switcher to change input to a secondOperand number

        this.toggle = true;

        // get top and bot screens

        this.getTopScreen = () => {
            return this.topScreen.value;
        };

        this.getBotScreen = () => {
            return this.botScreen.value;
        };

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
            [this.firstOperand.value, this.secondOperand.value] = [this.addComa(this.firstOperand.value), this.addComa(this.secondOperand.value)];
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
                        this.divideOneByfirstOperand();
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
                [this.topScreen.value, this.botScreen.value] = ['', this.firstOperand.value];
            } else {
                [this.topScreen.value, this.botScreen.value] = [`${this.firstOperand.value} ${this.operator.value}`, this.secondOperand.value];
            }
        };

        // find out: firstOperand or secondOperand operand is adding..

        this.setValue = value => {
            return this.toggle ? this.setFirstOperand(value) : this.setSecondOperand(value);
        };

        // Set value for this.firstOperand variable

        this.setFirstOperand = firstOperand => {
            if (this.firstOperand.value === '0') {
                this.firstOperand.value = firstOperand;
            } else if ( (this.removeComa(this.firstOperand.value)).length < 16 ) {
                this.firstOperand.value = this.firstOperand.value.concat(firstOperand);
            }
        };

        // Set value for this.secondOperand variable

        this.setSecondOperand = secondOperand => {
            const condition = this.secondOperand.value == ''
                              || this.secondOperand.value == '0'
                              || (this.secondOperand.value === this.defaultOperand && this.clearDefaultOperand);
            if (condition) {
                [this.clearDefaultOperand, this.secondOperand.value] = [false, secondOperand];
            } else if ( this.removeComa(this.secondOperand.value).length < 16) {
                this.secondOperand.value = this.secondOperand.value.concat(secondOperand);
            }
        };

        // Set value for this.operator variable and check this.firstOperand

        this.setOperator = operator => {
            if (this.secondOperand.value && this.operator.value) {
              this.actionPlusChooseNextOperator(operator);
            } else {
                this.toggle = false;
            }
            [this.operator.value, this.defaultOperand] = [operator, this.firstOperand.value];
            [this.secondOperand.value , this.clearDefaultOperand] = [this.defaultOperand, true];
        };

        // check for proper action if both operands and operator were chosen

        this.handleEquilButton = () => {
            if (this.operator.value && this.secondOperand.value) {
                this.makeSomeMath(this.operator.value);
            }
        };

        // remove comas from a string

        this.removeComa = (operand) => {
            return operand.replace(/,/g, '');
        };

        // add coma each 3 symbol, minus and dot will be handled properly

        this.addComa = (operand) => {
            let includesDot = operand.endsWith('.');

            if (operand.includes('Infinity')) {
                return operand;
            }
            // Number() removes dot, need to recheck
            operand = Number(this.removeComa(operand)).toLocaleString('En-us', { maximumFractionDigits: 17 });
            return includesDot ? operand.concat('.') : operand;
        };

        // check for proper dot(.) usage..

        this.handleDecimalDot = dot => {
            let floatNumber = this.toggle ? this.firstOperand : this.secondOperand;

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
            [this.secondOperand.value, this.operator.value , this.toggle] = ['', '', true];
        };

        /*
        * start makeSomeMath() when both operands and operator is present
        * and choose clicked operator for next action
        */

        this.actionPlusChooseNextOperator = operator => {
            this.makeSomeMath(operator);
            this.toggle = false;
        };

        // remove commas and change data type to Number

        this.prepareForMath = (operand) => {
            return Number(this.removeComa(operand));
        };

        // arithmetic operations to be done with makeSomeMath() execution

        this.add = () => {
            this.firstOperand.value = ( this.prepareForMath(this.firstOperand.value) + this.prepareForMath(this.secondOperand.value) ).toString();
        };

        this.multiple = () => {
            this.firstOperand.value = ( this.prepareForMath(this.firstOperand.value) * this.prepareForMath(this.secondOperand.value) ).toString();
        };

        this.minus = () => {
            this.firstOperand.value =  ( this.prepareForMath(this.firstOperand.value) - this.prepareForMath(this.secondOperand.value) ).toString();
        };

        this.divide = () => {
            this.firstOperand.value = ( this.prepareForMath(this.firstOperand.value) / this.prepareForMath(this.secondOperand.value) ).toString();
        };

        this.module = () => {
            this.firstOperand.value = ( this.prepareForMath(this.firstOperand.value) % this.prepareForMath(this.secondOperand.value) ).toString();
        };

        // clear calculator operands and operator

        this.reset = () => {
            [this.firstOperand.value, this.secondOperand.value, this.operator.value , this.toggle] = ['0', '', '', true];
        };

        // clear last symbol of a current operand

        this.back = () => {
           var obj = this.toggle ? this.firstOperand : this.secondOperand;
           obj.value = obj.value.length === 1 ? '0' : obj.value.slice(0, -1);
        };

        // Change minus to plus and Vice Versa

        this.changeMinus = () => {
            let operand = this.toggle ? this.firstOperand : this.secondOperand;
            operand.value = (this.prepareForMath(operand.value) * (-1)).toString();
        };

        // bring to power a number

        this.bringToPower = () => {
            if (this.toggle) {
                this.firstOperand.value = ( Math.pow(this.prepareForMath(this.firstOperand.value), 2) ).toString();
            }
        };

        // Divide 1 by this.firstOperand

        this.divideOneByfirstOperand = () => {
            if (this.toggle) {
                this.firstOperand.value = ( 1 / this.prepareForMath(this.firstOperand.value)).toString();
            }
        };

        // get square root of a Number

        this.getSquareRoot = () => {
            if (this.toggle) {
                this.firstOperand.value = ( Math.pow(this.prepareForMath(this.firstOperand.value), 0.5) ).toString();
            }
        };
    });
}

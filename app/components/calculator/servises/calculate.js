const app = angular.module('operationsService', []);
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
            case 'reset':
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
            return;
        }
        this.topScreen.value = `${this.first.value} ${this.operator.value}`;
        this.botScreen.value = this.second.value;
    };

    // check for proper action if both operands and operator were chosen

    this.handleEquilButton = () => {
        if (this.second.value === '.') {
            this.second.value = '0';
        }
        if (this.operator.value && this.second.value) {
            this.makeSomeMath(this.operator.value);
        }
    };

    this.reverseString = (str) => {
        return str.split("").reverse().join("");
    };

    this.removeComa = (operand) => {
        if (operand === '') {
            return '';
        }

        return operand.replace(/,/g, '');
    };

    // add coma each 3 symbol, minus will be handled properly

    this.addComa = (operand) => {
        if (operand === '') {
            return '';
        }

        if (operand.includes('Infinity')) {
            return operand;
        }

        if (operand.includes('-') && operand.length === 4) {
            return operand;
        }

        operand = this.removeComa(operand);
        if ( operand.includes('.') ) {
            if (operand.includes('-')) {
                operand = operand.slice(1);
                return '-' + this.reverseString(
                            this.reverseString(operand.split('.')[0])
                            .match(/.{1,3}/g).join(',')
                        ) + '.' + operand.split('.')[1];
            }
            return  this.reverseString(
                        this.reverseString(operand.split('.')[0])
                        .match(/.{1,3}/g).join(',')
                    ) + '.' + operand.split('.')[1];
        }

        if (operand.includes('-')) {
            operand = operand.slice(1);
            return '-' + this.reverseString(this.reverseString(operand).match(/.{1,3}/g).join(','));
        }
        return this.reverseString(this.reverseString(operand).match(/.{1,3}/g).join(','));
    };

    // check for proper dot(.) usage..

    this.handleDecimalDot = dot => {
        if ( this.toggle && !this.first.value.includes('.') ) {
            this.first.value = this.first.value.concat(dot);
            return;
        }
        if ( this.operator.value && !this.second.value.includes('.') ) {
            this.second.value = this.second.value.concat(dot);
        }
    };

    // find out: first or second operand is adding..

    this.setValue = value => {
        if (this.toggle) {
            this.setFirstOperand(value);
            return;
        }
        this.setSecondOperand(value);
    };

    // Set value for this.first variable

    this.setFirstOperand = firstOperand => {
        if (this.first.value === '0') {
            this.first.value = firstOperand;
            return;
        }
        if ( (this.removeComa(this.first.value) ).length < 16) {
            this.first.value = this.first.value.concat(firstOperand);
        }
    };

    // Set value for this.second variable

    // && this.removeComa(this.second.value).length < 16) BUG BUG BUG rewrite!!!
    this.fail = 1;
    this.setSecondOperand = secondOperand => {
        if ( this.removeComa(this.second.value).length < 16)
        if (this.second.value === this.default && this.fail) {
            this.second.value = '';
        }
        if (this.second.value == '' || this.second.value == '0') {
            this.second.value = secondOperand;
            return;
        }
        if ( this.removeComa(this.second.value).length < 16) {
            this.second.value = this.second.value.concat(secondOperand);
        }
        this.fail = 0;
    };

    // Set value for this.operator variable and check this.first

    this.setOperator = operator => {
        if ( this.checkForMinusNumber(operator) ) {
            return;
        }
        if (this.first.value === '-' || this.first.value === '-.') {
          this.first.value = '0';
        }

        if (this.second.value && this.operator.value) {
          this.actionPlusChooseNextOperator(operator);
          return;
        }
        this.operator.value = operator;
        this.default = this.first.value;
        this.second.value = this.default;
        this.toggle = false;
    };

    // check if user want to use minus number for operation

    this.checkForMinusNumber = minus => {
        const condition = minus === '-' &&
            this.toggle &&
            !this.first.value.toString().includes('-') &&
            this.first.value === '0';

        if (condition) {
            this.first.value = minus;
            return;
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
        if (this.second.value === '.') {
            this.second.value = '0';
        }
        this.makeSomeMath(operator);
        this.operator.value = operator;
        this.toggle = false;
    };

    // arithmetic operations to be done with makeSomeMath() execution

    this.add = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) + Number(this.second.value.replace(/,/g, '')) ).toString();
    };

    this.multiple = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) * Number(this.second.value.replace(/,/g, '')) ).toString();
    };

    this.minus = () => {
        this.first.value =  ( Number(this.first.value.replace(/,/g, '')) - Number(this.second.value.replace(/,/g, '')) ).toString();
    };

    this.divide = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) / Number(this.second.value.replace(/,/g, '')) ).toString();
    };

    this.module = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) % Number(this.second.value.replace(/,/g, '')) ).toString();
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
        if (this.toggle) {
            if (this.first.value.length === 1) {
                this.first.value = '0';
                return;
            }
            this.first.value = this.first.value.slice(0, -1);
            return;
        }

        if (this.second.value.length === 1) {
            this.second.value = '';
            return;
        }
        this.second.value = this.second.value.slice(0, -1);
    };

    // Change minus to plus and Vice Versa

    this.changeMinus = () => {
        if (this.toggle) {
            this.first.value = (Number( this.removeComa(this.first.value) ) * (-1)).toString();
            return;
        }
        this.second.value = (Number( this.removeComa(this.second.value) ) * (-1)).toString();
    };

    // bring to power a number

    this.bringToPower = () => {
        if (this.toggle) {
            this.first.value = ( Math.pow(Number( this.removeComa(this.first.value) ), 2) ).toString();
        }
    };

    // Divide 1 by this.first

    this.divideOneByFirst = () => {
        if (this.toggle) {
            this.first.value = ( 1 / Number( this.removeComa(this.first.value) )).toString();
        }
    };

    // get square root of a Number

    this.getSquareRoot = () => {
        if (this.toggle) {
            this.first.value = ( Math.pow(Number( this.removeComa(this.first.value) ), 0.5) ).toString();
        }
    };

});

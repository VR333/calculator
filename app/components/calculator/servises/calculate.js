const app = angular.module('operationsService', []); 
app.service('operationsService', function() {
    this.first = {value:'0'};
    this.second = {value:''};
    this.operator = {value:''};

    this.default = 0;

    this.topScreen = {value: ''};
    this.botScreen = {value: `${this.first.value} ${this.operator.value}`};

    this.checkWhatToDisplay = () => {
        if (this.toggle) {
          this.topScreen.value = '';
          this.botScreen.value = `${this.first.value} ${this.operator.value}`;
          return;
        }

        this.topScreen.value = `${this.first.value} ${this.operator.value}`;
        this.botScreen.value = this.second.value;
    };

    // switcher to change input to a second number

    this.toggle = true;

    // check for operation

    this.checkOperation = (operation) => {
        switch (operation) {
          case '√':
                  this.getSquareRoot();
                  break;
          case '**':
                  this.bringToPower();
                  break;
          case '1/x':
                  this.divideOneByFirst();
                  break;
          case 'reset':
                  this.reset();
                  break;
          case 'back':
                  this.back();
                  break;
          case 'minus':
                  this.changeMinus();
                  break;
          case '.':
                  this.handleDecimalDot('.');
                  break;
          case 'equil':
                  this.handleEquilButton();
                  break;
        }
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
            return operand.replace(/,/g, '');
    };

    this.addComa = (operand) => {
        if (operand.includes('-') && operand.length === 4) {
            return operand;
        }

        operand = this.removeComa(operand);
        if ( operand.includes('.') ) {
            return  this.reverseString(
                        this.reverseString(operand.split('.')[0])
                        .match(/.{1,3}/g)
                        .map( function(e) {return e + ','} )
                        .join('')
                    ).slice(1) + '.' + operand.split('.')[1];
        }

        return this.reverseString(
                        this.reverseString(operand).match(/.{1,3}/g)
                        .map( function(e) {return e + ','} )
                        .join('')
                ).slice(1);

    };

    // check for proper dot(.) usage..

    this.handleDecimalDot = dot => {
        if ( this.toggle && !this.first.value.includes('.') ) {
            this.first.value = this.first.value.concat(dot);
            this.checkWhatToDisplay();
            return;
        }
        if ( this.operator.value && !this.second.value.includes('.') ) {
            this.second.value = this.second.value.concat(dot);
            this.checkWhatToDisplay();
        }
    };

    // find out: first or second operand is adding..

    this.setValue = value => {
        if (this.toggle) {
            this.setFirstOperand(value);
            this.checkWhatToDisplay();
            return;
        }
        this.setSecondOperand(value);
        this.checkWhatToDisplay();
    };

    // Set value for this.first variable

    this.setFirstOperand = firstOperand => {
        if (this.first.value === '0') {
            this.first.value = firstOperand;
            return;
        }

      if ( (this.removeComa(this.first.value) ).length < 16) {
          this.first.value = this.first.value.concat(firstOperand);
          this.first.value = this.addComa(this.first.value);
      }
    };

    // Set value for this.second variable

    this.setSecondOperand = secondOperand => {
        if (this.second.value === this.default) {
            this.second.value = '';
        }
        if (this.second.value == '' || this.second.value == '0') {
            this.second.value = secondOperand;
            return;
        }
        if ( this.removeComa(this.second.value).length < 16) {
            this.second.value = this.second.value.concat(secondOperand);
            this.second.value = this.addComa(this.second.value);
        }
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
        this.checkWhatToDisplay();
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
            case '*':
                    this.multiple();
                    break;
            case '-':
                    this.minus();
                    break;
            case '/':
                    this.divide();
                    break;
            case '%':
                    this.module();
                    break;
        }
        this.second.value = '';
        this.operator.value = '';
        this.toggle = true;
        this.checkWhatToDisplay();
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
        this.checkWhatToDisplay();
    };

    // arithmetic operations to be done with makeSomeMath() execution

    this.add = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) + Number(this.second.value.replace(/,/g, '')) ).toString();
        this.first.value = this.addComa(this.first.value);
    };

    this.multiple = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) * Number(this.second.value.replace(/,/g, '')) ).toString();
        this.first.value = this.addComa(this.first.value);
    };

    this.minus = () => {
        this.first.value =  ( Number(this.first.value.replace(/,/g, '')) - Number(this.second.value.replace(/,/g, '')) ).toString();
        this.first.value = this.addComa(this.first.value);
    };

    this.divide = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) / Number(this.second.value.replace(/,/g, '')) ).toString();
        this.first.value = this.addComa(this.first.value);
    };

    this.module = () => {
        this.first.value = ( Number(this.first.value.replace(/,/g, '')) % Number(this.second.value.replace(/,/g, '')) ).toString();
        this.first.value = this.addComa(this.first.value);
    };

    // clear calculator operands and operator

    this.reset = () => {
        this.first.value = '0';
        this.second.value = '';
        this.operator.value = '';
        this.toggle = true;
        this.checkWhatToDisplay();
    };

    // clear last symbol of a current operand

    this.back = () => {
        if (this.toggle) {
            if (this.first.value.length === 1) {
                this.first.value = '0';
                this.checkWhatToDisplay();
                return;
            }
            this.first.value = this.first.value.slice(0, -1);
            this.first.value = this.addComa(this.first.value);
            this.checkWhatToDisplay();
            return;
        }

        if (this.second.value.length === 1) {
            this.second.value = '';
            this.checkWhatToDisplay();
            return;
        }
        this.second.value = this.second.value.slice(0, -1);
        this.second.value = this.addComa(this.second.value);
        this.checkWhatToDisplay();
    };

    // Change minus to plus and Vice Versa

    this.changeMinus = () => {
        if (this.toggle) {
            this.first.value = (Number( this.removeComa(this.first.value) ) * (-1)).toString();
            this.checkWhatToDisplay();
            return;
        }
        this.second.value = (Number( this.removeComa(this.second.value) ) * (-1)).toString();
        this.checkWhatToDisplay();
    };

    this.bringToPower = () => {
        if (this.toggle) {
            this.first.value = ( Math.pow(Number( this.removeComa(this.first.value) ), 2) ).toString();
            this.first.value = this.addComa(this.first.value);
        }
        this.checkWhatToDisplay();
    };

    // Divide 1 by this.first

    this.divideOneByFirst = () => {
        if (this.toggle) {
            this.first.value = ( 1 / Number( this.removeComa(this.first.value) )).toString();
            this.first.value = this.addComa(this.first.value);
        }
        this.checkWhatToDisplay();
    };

    this.getSquareRoot = () => {
        if (this.toggle) {
            this.first.value = ( Math.pow(Number( this.removeComa(this.first.value) ), 0.5) ).toString();
            this.first.value = this.addComa(this.first.value);
        }
        this.checkWhatToDisplay();
    };
});
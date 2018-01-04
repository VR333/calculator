// require('./../../servises/calculate.js');
// 'operationsService'

const app = angular.module('btn', []);

app.directive('btn', function(){
    return {
        restrict: 'E',
        bindToController: {
            first: '=',
            second: '=',
            operator: '='
        },
        transclude: true,
        controllerAs: 'btn',
        controller: btnCtrl,
        templateUrl: './app/components/calculator/diractives/btn/btn.html'
    };

    function btnCtrl($scope) {
        // $scope, operationsService
        this.default = 0;
        this.lol  = {x: 5};
        $scope.$emit('myevent', {l : 'hmmm'});

        // switcher to change input to a second number

        this.toggle = true;

        // check for proper action if both operands and operator were chosen

        this.handleEquilButton = () => {
            if (this.second === '.') {
                this.second = '0';
            }
            if (this.operator && this.second) {
                this.makeSomeMath(this.operator);
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
            if ( this.toggle && !this.first.includes('.') ) {
                this.first = this.first.concat(dot);
                return;
            }
            if ( this.operator && !this.second.includes('.') ) {
                this.second = this.second.concat(dot);
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
            if (this.first === '0') {
                this.first = firstOperand;
                return;
            }

          if ( (this.removeComa(this.first) ).length < 16) {
              this.first = this.first.concat(firstOperand);
              this.first = this.addComa(this.first);
          }
        };

        // Set value for this.second variable

        this.setSecondOperand = secondOperand => {
            if (this.second === this.default) {
                this.second = '';
            }
            if (this.second == '' || this.second == '0') {
                this.second = secondOperand;
                return;
            }
            if ( this.removeComa(this.second).length < 16) {
                this.second = this.second.concat(secondOperand);
                this.second = this.addComa(this.second);
            }
        };

        // Set value for this.operator variable and check this.first

        this.setOperator = operator => {
            if ( this.checkForMinusNumber(operator) ) {
                return;
            }

            if (this.first === '-' || this.first === '-.') {
              this.first = '0';
            }

            if (this.second && this.operator) {
              this.actionPlusChooseNextOperator(operator);
              return;
            }
            this.operator = operator;
            this.default = this.first;
            this.second = this.default;
            this.toggle = false;
        };

        // check if user want to use minus number for operation

        this.checkForMinusNumber = minus => {
            const condition = minus === '-' &&
                this.toggle &&
                !this.first.toString().includes('-') &&
                this.first === '0';

            if (condition) {
                this.first = minus;
                return;
            }

        };

        // check operator and use proper action

        this.makeSomeMath = value => {
            switch(this.operator) {
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
            this.second = '';
            this.operator = '';
            this.toggle = true;
        };

        /*
        * start makeSomeMath() when both operands and operator is present
        * and choose clicked operator for next action
        */

        this.actionPlusChooseNextOperator = operator => {
            if (this.second === '.') {
                this.second = '0';
            }
            this.makeSomeMath(operator);
            this.operator = operator;
            this.toggle = false;
        };

        // arithmetic operations to be done with makeSomeMath() execution

        this.add = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) + Number(this.second.replace(/,/g, '')) ).toString();
            this.first = this.addComa(this.first);
        };

        this.multiple = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) * Number(this.second.replace(/,/g, '')) ).toString();
            this.first = this.addComa(this.first);
        };

        this.minus = () => {
            this.first =  ( Number(this.first.replace(/,/g, '')) - Number(this.second.replace(/,/g, '')) ).toString();
            this.first = this.addComa(this.first);
        };

        this.divide = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) / Number(this.second.replace(/,/g, '')) ).toString();
            this.first = this.addComa(this.first);
        };

        this.module = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) % Number(this.second.replace(/,/g, '')) ).toString();
            this.first = this.addComa(this.first);
        };

        // clear calculator operands and operator

        this.reset = () => {
            this.first = '0';
            this.second = '';
            this.operator = undefined;
            this.toggle = true;
        };

        // clear last symbol of a current operand

        this.back = () => {
            if (this.toggle) {
                if (this.first.length === 1) {
                    this.first = '0';
                    return;
                }
                this.first = this.first.slice(0, -1);
                this.first = this.addComa(this.first)
                return;
            }

            if (this.second.length === 1) {
                this.second = '';
                return;
            }
            this.second = this.second.slice(0, -1);
            this.second = this.addComa(this.second)
        };

        // Change minus to plus and Vice Versa

        this.changeMinus = () => {
            if (this.toggle) {
                this.first = (Number( this.removeComa(this.first) ) * (-1)).toString();
                return;
            }
            this.second = (Number( this.removeComa(this.second) ) * (-1)).toString();
        };

        this.bringToPower = () => {
            if (this.toggle) {
                this.first = ( Math.pow(Number( this.removeComa(this.first) ), 2) ).toString();
                this.first = this.addComa(this.first);
            }
        };

        // Divide 1 by this.first

        this.divideOneByFirst = () => {
            if (this.toggle) {
                this.first = ( 1 / Number( this.removeComa(this.first) )).toString();
                this.first = this.addComa(this.first);
            }
        };

        this.getSquareRoot = () => {
            if (this.toggle) {
                this.first = ( Math.pow(Number( this.removeComa(this.first) ), 0.5) ).toString();
                this.first = this.addComa(this.first);
            }
        };
    }
});

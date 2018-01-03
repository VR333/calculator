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

        this.addComa = (operand) => {
            if (this.toggle) {
                if ( this.first.replace(/,/g, '').length % 3 === 0 ) {
                    this.first = this.first + ','
                }
                return;
            }

            if ( this.second.replace(/,/g, '').length % 3 === 0 ) {
                this.second = this.second + ','
            }
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

          if (this.first.replace(/,/g, '').length < 16) {
              this.addComa();
              this.first = this.first.concat(firstOperand);
          }
        };

        // Set value for this.second variable

        this.setSecondOperand = secondOperand => {
            if (this.second == '' || this.second == '0') {
                this.second = secondOperand;
                return;
            }
            if (this.second.replace(/,/g, '').length < 16) {
                this.addComa();
                this.second = this.second.concat(secondOperand);
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
        };

        this.multiple = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) * Number(this.second.replace(/,/g, '')) ).toString();
        };

        this.minus = () => {
            this.first =  ( Number(this.first.replace(/,/g, '')) - Number(this.second.replace(/,/g, '')) ).toString();
        };

        this.divide = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) / Number(this.second.replace(/,/g, '')) ).toString();
        };

        this.module = () => {
            this.first = ( Number(this.first.replace(/,/g, '')) % Number(this.second.replace(/,/g, '')) ).toString();
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
                return;
            }

            if (this.second.length === 1) {
                this.second = '';
                return;
            }
            this.second = this.second.slice(0, -1);
        };

        // Change minus to plus and Vice Versa

        this.changeMinus = () => {
            if (this.toggle) {
                this.first = (Number(this.first) * (-1)).toString();
                return;
            }
            this.second = (Number(this.second) * (-1)).toString();
        };

        this.bringToPower = () => {
            if (this.toggle) {
                this.first = ( Math.pow(Number(this.first), 2) ).toString();
            }
        };

        // Divide 1 by this.first

        this.divideOneByFirst = () => {
            if (this.toggle) {
                this.first = ( 1 / Number(this.first) ).toString();
            }
        };

        this.getSquareRoot = () => {
            if (this.toggle) {
                this.first = ( Math.pow(Number(this.first), 0.5) ).toString();
            }
        };
    }
});

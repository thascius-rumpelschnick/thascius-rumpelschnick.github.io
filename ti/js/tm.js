var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Machine from './machine.js';
var ErgTm = /** @class */ (function (_super) {
    __extends(ErgTm, _super);
    function ErgTm(word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = 'q15'; }
        var _this = _super.call(this, word, accept) || this;
        _this.blank = '0';
        _this.fail = 'F';
        _this.left = 'l';
        _this.right = 'r';
        _this.halt = 'h';
        _this.reject = 'q14';
        _this.transitions = {
            q0: { B: [_this.blank, 'q1', _this.right] },
            q1: { T: ['T', 'q2', _this.right], P: ['P', 'q2', _this.right] },
            q2: { B: [_this.blank, 'q3', _this.right] },
            q3: { T: [_this.blank, 'q4', _this.right], P: [_this.blank, 'q6', _this.right] },
            q4: { S: [_this.blank, 'q4', _this.right], X: [_this.blank, 'q5', _this.right] },
            q5: { X: [_this.blank, 'q6', _this.right], S: [_this.blank, 'q8', _this.right] },
            q6: { T: [_this.blank, 'q6', _this.right], V: [_this.blank, 'q7', _this.right] },
            q7: { P: [_this.blank, 'q5', _this.right], V: [_this.blank, 'q8', _this.right] },
            q8: { E: [_this.blank, 'q9', _this.right] },
            q9: { T: ['T', 'q10', _this.right], P: ['P', 'q10', _this.right] },
            q10: { E: [_this.blank, 'q11', _this.right] },
            q11: { 0: [_this.blank, 'q11', _this.left], T: [_this.blank, 'q12', _this.left], P: [_this.blank, 'q13', _this.left] },
            q12: { 0: [_this.blank, 'q12', _this.left], T: [_this.blank, 'q15', _this.halt] },
            q13: { 0: [_this.blank, 'q13', _this.left], P: [_this.blank, 'q15', _this.halt] }
        };
        _this.processedWord = _this.word;
        return _this;
    }
    ErgTm.init = function (word) {
        return new ErgTm(word);
    };
    ErgTm.prototype.execute = function () {
        this.prepareWordForTape();
        var i = 0;
        while (i < this.processedWord.length && (this.state !== this.accept)) {
            var transition = this.getTransition(i);
            if (transition) {
                this.writeToTape(transition[0], i);
                this.changeState(transition[1]);
                i = this.moveHead(transition[2], i);
            }
            else {
                this.writeToTape(this.fail, i);
                this.changeState(this.reject);
                break;
            }
        }
        this.logResult();
        return this.accept === this.state;
    };
    ErgTm.prototype.getTransition = function (position) {
        return this.transitions[this.state][this.processedWord[position]];
    };
    ErgTm.prototype.writeToTape = function (sign, position) {
        this.processedWord = this.processedWord.split('').fill(sign, position, position + 1).join('');
    };
    ErgTm.prototype.moveHead = function (direction, position) {
        return (this.left === direction) ? --position : ++position;
    };
    ErgTm.prototype.prepareWordForTape = function () {
        this.prepareWord();
        // To simulate an endlessly ongoing tape filled with blanks on the right side of our word
        this.processedWord = this.word + this.blank;
    };
    ErgTm.prototype.logResult = function () {
        console.log("Final State: " + this.state, "Written word: " + this.processedWord);
    };
    return ErgTm;
}(Machine));
var tm;
var input = document.getElementById('word');
var submit = document.getElementById('submit');
// submit.addEventListener('click', () => tm = ErgTm.init(input.value))
tm = ErgTm.init('BTBPVVETE');
console.log("Accepted: " + tm.execute());
tm = ErgTm.init('BPBTSSXXTVVEPE');
console.log("Accepted: " + tm.execute());
tm = ErgTm.init('BTBPVVETEE');
console.log("Accepted: " + tm.execute());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLGNBQWMsQ0FBQTtBQUVsQztJQUFvQix5QkFBTztJQTJCdkIsZUFBWSxJQUFpQixFQUFFLE1BQXNCO1FBQXpDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQXJELFlBQ0ksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUd0QjtRQTlCZ0IsV0FBSyxHQUFXLEdBQUcsQ0FBQTtRQUNuQixVQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFVBQUksR0FBVyxHQUFHLENBQUE7UUFDbEIsV0FBSyxHQUFXLEdBQUcsQ0FBQTtRQUNuQixVQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFlBQU0sR0FBVyxLQUFLLENBQUE7UUFJN0IsaUJBQVcsR0FBVztZQUM1QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUc7WUFDL0QsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUc7WUFDN0UsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVB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
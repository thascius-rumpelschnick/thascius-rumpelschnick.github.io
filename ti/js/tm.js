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
import AbstractMachine from './machine.js';
import Renderer from './renderer.js';
var ErgTm = /** @class */ (function (_super) {
    __extends(ErgTm, _super);
    function ErgTm(renderer, word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = 'q15'; }
        var _this = _super.call(this, renderer, word, accept) || this;
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
    ErgTm.init = function (word, nodes) {
        return new ErgTm(new Renderer(nodes), word);
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
}(AbstractMachine));
var tm;
var input = document.getElementById('word');
var submit = document.getElementById('submit');
// submit.addEventListener('click', () => tm = ErgTm.init(input.value))
var nodes = {
    0: {
        node: 'body > svg > g > ellipse:nth-child(1)',
        text: 'body > svg > g > g:nth-child(2) > switch > foreignObject > div > div > div'
    },
    1: {
        node: 'body > svg > g > ellipse:nth-child(5)',
        text: 'body > svg > g > g:nth-child(6) > switch > foreignObject > div > div > div'
    },
    2: {
        node: 'body > svg > g > ellipse:nth-child(11)',
        text: 'body > svg > g > g:nth-child(12) > switch > foreignObject > div > div > div'
    },
    3: {
        node: '',
        text: ''
    },
    4: {
        node: '',
        text: ''
    },
    5: {
        node: '',
        text: ''
    },
    6: {
        node: '',
        text: ''
    },
    7: {
        node: '',
        text: ''
    },
    8: {
        node: '',
        text: ''
    },
    9: {
        node: '',
        text: ''
    },
    10: {
        node: '',
        text: ''
    },
    11: {
        node: '',
        text: ''
    },
    12: {
        node: '',
        text: ''
    },
    13: {
        node: '',
        text: ''
    },
    14: {
        node: '',
        text: ''
    },
    15: {
        node: '',
        text: ''
    },
    16: {
        node: '',
        text: ''
    },
    17: {
        node: '',
        text: ''
    },
    18: {
        node: '',
        text: ''
    },
    19: {
        node: '',
        text: ''
    }
};
// Accept
tm = ErgTm.init('BTBPVVETE', nodes);
console.log("Accepted: " + tm.execute());
// tm = ErgTm.init('BPBTSSXXTVVEPE', nodes)
// console.log(`Accepted: ${tm.execute()}`)
// Abort
// tm = ErgTm.init('BTBPVVETEE', nodes)
// console.log(`Accepted: ${tm.execute()}`)
// fsm = ErgFsm.init('BBBPVVETEE', nodes)
// console.log(`Accepted: ${fsm.execute()}`)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLGNBQWMsQ0FBQTtBQUMxQyxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUE7QUFFcEM7SUFBb0IseUJBQWU7SUE0Qi9CLGVBQVksUUFBa0IsRUFBRSxJQUFpQixFQUFFLE1BQXNCO1FBQXpDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQXpFLFlBQ0ksa0JBQU0sUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FHaEM7UUE5QmdCLFdBQUssR0FBVyxHQUFHLENBQUE7UUFDbkIsVUFBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixVQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFdBQUssR0FBVyxHQUFHLENBQUE7UUFDbkIsVUFBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixZQUFNLEdBQVcsS0FBSyxDQUFBO1FBSTdCLGlCQUFXLEdBQVc7WUFDNUIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMs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
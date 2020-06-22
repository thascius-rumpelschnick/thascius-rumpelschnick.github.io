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
            this.renderer.setActive(this.state);
            var transition = this.getTransition(i);
            if (transition) {
                this.renderer.setAccepted(this.state, this.processedWord[i]);
                this.writeToTape(transition[0], i);
                this.changeState(transition[1]);
                i = this.moveHead(transition[2], i);
            }
            else {
                this.renderer.setRejected(this.state, this.word[i]);
                this.writeToTape(this.fail, i);
                this.changeState(this.reject);
                break;
            }
        }
        if (this.accept === this.state) {
            this.renderer.setAccepted(this.state, null);
        }
        else {
            this.renderer.setRejected(this.state, null);
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
var nodes = {
    0: {
        node: '#tm > g > ellipse:nth-child(17)',
        text: '#tm > g > g:nth-child(18) > switch > foreignObject > div > div > div'
    },
    1: {
        node: '#tm > g > ellipse:nth-child(23)',
        text: '#tm > g > g:nth-child(24) > switch > foreignObject > div > div > div'
    },
    2: {
        node: '#tm > g > ellipse:nth-child(27)',
        text: '#tm > g > g:nth-child(28) > switch > foreignObject > div > div > div'
    },
    3: {
        node: '#tm > g > ellipse:nth-child(35)',
        text: '#tm > g > g:nth-child(36) > switch > foreignObject > div > div > div'
    },
    4: {
        node: '#tm > g > ellipse:nth-child(45)',
        text: '#tm > g > g:nth-child(46) > switch > foreignObject > div > div > div'
    },
    5: {
        node: '#tm > g > ellipse:nth-child(61)',
        text: '#tm > g > g:nth-child(62) > switch > foreignObject > div > div > div'
    },
    6: {
        node: '#tm > g > ellipse:nth-child(53)',
        text: '#tm > g > g:nth-child(54) > switch > foreignObject > div > div > div'
    },
    7: {
        node: '#tm > g > ellipse:nth-child(67)',
        text: '#tm > g > g:nth-child(68) > switch > foreignObject > div > div > div'
    },
    8: {
        node: '#tm > g > ellipse:nth-child(63)',
        text: '#tm > g > g:nth-child(64) > switch > foreignObject > div > div > div'
    },
    9: {
        node: '#tm > g > ellipse:nth-child(83)',
        text: '#tm > g > g:nth-child(84) > switch > foreignObject > div > div > div'
    },
    10: {
        node: '#tm > g > ellipse:nth-child(81)',
        text: '#tm > g > g:nth-child(82) > switch > foreignObject > div > div > div'
    },
    11: {
        node: '#tm > g > ellipse:nth-child(91)',
        text: '#tm > g > g:nth-child(92) > switch > foreignObject > div > div > div'
    },
    12: {
        node: '#tm > g > ellipse:nth-child(109)',
        text: '#tm > g > g:nth-child(110) > switch > foreignObject > div > div > div'
    },
    13: {
        node: '#tm > g > ellipse:nth-child(107)',
        text: '#tm > g > g:nth-child(108) > switch > foreignObject > div > div > div'
    },
    14: {
        node: '#tm > g > ellipse:nth-child(101)',
        text: '#tm > g > g:nth-child(104) > switch > foreignObject > div > div > div'
    },
    15: {
        node: '#tm > g > ellipse:nth-child(111)',
        text: '#tm > g > g:nth-child(114) > switch > foreignObject > div > div > div'
    }
};
var tm;
var run = function () {
    tm = ErgTm.init(word.value, nodes);
    tm.setSpeed(speed.value);
    tm.execute();
};
var word = document.getElementById('word');
var speed = document.getElementById('speed');
var submit = document.getElementById('submit');
// Clear value by clicking into input
word.addEventListener('click', function (event) { return event.target.value = ''; });
submit.addEventListener('click', run);
var testStrings = [
    // Accept
    'BTBPVVETE',
    'BPBTSSXXTVVEPE',
    // Abort
    'BTBPTVVETEE',
    'BBBPVVETEE'
];
// for (let i: number = 0; i < testStrings.length; i++) {
//     if (i === 0) {
//         fsm = ErgFsm.init(testStrings[i], nodes)
//         console.log(`Accepted: ${fsm.execute()}`)
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvdG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLGNBQWMsQ0FBQTtBQUMxQyxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUE7QUFFcEM7SUFBb0IseUJBQWU7SUE0Qi9CLGVBQVksUUFBa0IsRUFBRSxJQUFpQixFQUFFLE1BQXNCO1FBQXpDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQXpFLFlBQ0ksa0JBQU0sUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FHaEM7UUE5QmdCLFdBQUssR0FBVyxHQUFHLENBQUE7UUFDbkIsVUFBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixVQUFJLEdBQVcsR0FBRyxDQUFBO1FBQ2xCLFdBQUssR0FBVyxHQUFHLENBQUE7UUFDbkIsVUFBSSxHQUFXLEdBQUcsQ0FBQTtRQUNsQixZQUFNLEdBQVcsS0FBSyxDQUFBO1FBSTdCLGlCQUFXLEdBQVc7WUFDNUIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMs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
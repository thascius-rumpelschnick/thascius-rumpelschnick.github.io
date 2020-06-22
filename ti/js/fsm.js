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
var ErgFsm = /** @class */ (function (_super) {
    __extends(ErgFsm, _super);
    function ErgFsm(renderer, word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = 'q19'; }
        var _this = _super.call(this, renderer, word, accept) || this;
        _this.transitions = {
            q0: { B: 'q1' },
            q1: { T: 'q2', P: 'q9' },
            q2: { B: 'q3' },
            q3: { T: 'q4', P: 'q6' },
            q4: { S: 'q4', X: 'q5' },
            q5: { X: 'q6', S: 'q8' },
            q6: { T: 'q6', V: 'q7' },
            q7: { P: 'q5', V: 'q8' },
            q8: { E: 'q16' },
            q9: { B: 'q10' },
            q10: { T: 'q11', P: 'q13' },
            q11: { S: 'q11', X: 'q12' },
            q12: { X: 'q13', S: 'q15' },
            q13: { T: 'q13', V: 'q14' },
            q14: { P: 'q12', V: 'q15' },
            q15: { E: 'q17' },
            q16: { T: 'q18' },
            q17: { P: 'q18' },
            q18: { E: 'q19' },
            q19: {}
            // q19: { B: 'q20', E: 'q20', P: 'q20', S: 'q20', T: 'q20', V: 'q20', X: 'q20' }
        };
        return _this;
    }
    ErgFsm.init = function (word, nodes) {
        return new ErgFsm(new Renderer(nodes), word);
    };
    ErgFsm.prototype.execute = function () {
        this.prepareWord();
        for (var i = 0; i < this.word.length; i++) {
            this.renderer.setActive(this.state);
            var transition = this.getTransition(i);
            if (transition) {
                this.renderer.setAccepted(this.state, this.word[i], this.transitions[this.state]);
                this.changeState(transition);
            }
            else {
                this.renderer.setRejected(this.state, this.word[i], this.transitions[this.state]);
                this.changeState('q0');
                break;
            }
        }
        if (this.accept === this.state) {
            this.renderer.setAccepted(this.state, null, null);
        }
        // else {
        //     this.renderer.setRejected(this.state, null, null)
        // }
        this.logResult();
        return this.accept === this.state;
    };
    ErgFsm.prototype.getTransition = function (position) {
        return this.transitions[this.state][this.word[position]];
    };
    ErgFsm.prototype.logResult = function () {
        console.log("Final State: " + this.state, "Written word: " + this.word);
    };
    return ErgFsm;
}(AbstractMachine));
// Script
var nodes = {
    0: {
        node: '#fsm > g > ellipse:nth-child(1)',
        text: '#fsm > g > g:nth-child(2) > switch > foreignObject > div > div > div'
    },
    1: {
        node: '#fsm > g > ellipse:nth-child(5)',
        text: '#fsm > g > g:nth-child(6) > switch > foreignObject > div > div > div'
    },
    2: {
        node: '#fsm > g > ellipse:nth-child(11)',
        text: '#fsm > g > g:nth-child(12) > switch > foreignObject > div > div > div'
    },
    3: {
        node: '#fsm > g > ellipse:nth-child(17)',
        text: '#fsm > g > g:nth-child(18) > switch > foreignObject > div > div > div'
    },
    4: {
        node: '#fsm > g > ellipse:nth-child(21)',
        text: '#fsm > g > g:nth-child(22) > switch > foreignObject > div > div > div'
    },
    5: {
        node: '#fsm > g > ellipse:nth-child(43)',
        text: '#fsm > g > g:nth-child(44) > switch > foreignObject > div > div > div'
    },
    6: {
        node: '#fsm > g > ellipse:nth-child(25)',
        text: '#fsm > g > g:nth-child(26) > switch > foreignObject > div > div > div'
    },
    7: {
        node: '#fsm > g > ellipse:nth-child(51)',
        text: '#fsm > g > g:nth-child(52) > switch > foreignObject > div > div > div'
    },
    8: {
        node: '#fsm > g > ellipse:nth-child(47)',
        text: '#fsm > g > g:nth-child(48) > switch > foreignObject > div > div > div'
    },
    9: {
        node: '#fsm > g > ellipse:nth-child(27)',
        text: '#fsm > g > g:nth-child(28) > switch > foreignObject > div > div > div'
    },
    10: {
        node: '#fsm > g > ellipse:nth-child(31)',
        text: '#fsm > g > g:nth-child(32) > switch > foreignObject > div > div > div'
    },
    11: {
        node: '#fsm > g > ellipse:nth-child(35)',
        text: '#fsm > g > g:nth-child(36) > switch > foreignObject > div > div > div'
    },
    12: {
        node: '#fsm > g > ellipse:nth-child(57)',
        text: '#fsm > g > g:nth-child(58) > switch > foreignObject > div > div > div'
    },
    13: {
        node: '#fsm > g > ellipse:nth-child(39)',
        text: '#fsm > g > g:nth-child(40) > switch > foreignObject > div > div > div'
    },
    14: {
        node: '#fsm > g > ellipse:nth-child(61)',
        text: '#fsm > g > g:nth-child(62) > switch > foreignObject > div > div > div'
    },
    15: {
        node: '#fsm > g > ellipse:nth-child(65)',
        text: '#fsm > g > g:nth-child(66) > switch > foreignObject > div > div > div'
    },
    16: {
        node: '#fsm > g > ellipse:nth-child(151)',
        text: '#fsm > g > g:nth-child(152) > switch > foreignObject > div > div > div'
    },
    17: {
        node: '#fsm > g > ellipse:nth-child(155)',
        text: '#fsm > g > g:nth-child(156) > switch > foreignObject > div > div > div'
    },
    18: {
        node: '#fsm > g > ellipse:nth-child(71)',
        text: '#fsm > g > g:nth-child(72) > switch > foreignObject > div > div > div'
    },
    19: {
        node: '#fsm > g > ellipse:nth-child(77)',
        text: '#fsm > g > g:nth-child(80) > switch > foreignObject > div > div > div'
    }
};
var fsm;
var run = function () {
    fsm = ErgFsm.init(word.value, nodes);
    fsm.setSpeed(speed.value);
    fsm.execute();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2ZzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxlQUFlLE1BQU0sY0FBYyxDQUFBO0FBQzFDLE9BQU8sUUFBUSxNQUFNLGVBQWUsQ0FBQTtBQUVwQztJQUFxQiwwQkFBZTtJQTBCaEMsZ0JBQVksUUFBa0IsRUFBRSxJQUFpQixFQUFFLE1BQXNCO1FBQXpDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQXpFLFlBQ0ksa0JBQU0sUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FDaEM7UUExQlMsaUJBQVcsR0FBVztZQUM1QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ2YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUU7WUFDZixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUU7WUFDeEIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTtZQUN4QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUU7WUFDeEIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7WUFDaEIsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtZQUNoQixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUs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
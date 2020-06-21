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
var ErgFsm = /** @class */ (function (_super) {
    __extends(ErgFsm, _super);
    function ErgFsm(word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = 'q15'; }
        var _this = _super.call(this, word, accept) || this;
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
        return _this;
    }
    ErgFsm.init = function (word) {
        return new ErgFsm(word);
    };
    ErgFsm.prototype.execute = function () {
        this.prepareWord();
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
}(Machine));
var fsm;
var input = document.getElementById('word');
var submit = document.getElementById('submit');
// submit.addEventListener('click', () => tm = ErgTm.init(input.value))
fsm = ErgFsm.init('BTBPVVETE');
console.log("Accepted: " + fsm.execute());
fsm = ErgFsm.init('BPBTSSXXTVVEPE');
console.log("Accepted: " + fsm.execute());
fsm = ErgFsm.init('BTBPVVETEE');
console.log("Accepted: " + fsm.execute());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnNtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2ZzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFBO0FBRWxDO0lBQXFCLDBCQUFPO0lBbUJ4QixnQkFBWSxJQUFpQixFQUFFLE1BQXNCO1FBQXpDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGNBQXNCO1FBQXJELFlBQ0ksa0JBQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUN0QjtRQW5CUyxpQkFBVyxHQUFXO1lBQzVCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztZQUMvRCxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztZQUM3RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztZQUNqRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0MsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFL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
var Renderer = /** @class */ (function () {
    function Renderer(nodes) {
        this.seconds = 500;
        this.multiplier = 0;
        this.nodes = nodes;
        this.type = 'fsm';
        this.prepareNodes();
    }
    Renderer.prototype.prepareNodes = function () {
        var _loop_1 = function (key, entry) {
            var node = document.querySelector(entry.node);
            var text = document.querySelector(entry.text);
            var classes = node.classList.toString().split(' ');
            classes.forEach(function (value) { if (value)
                node.classList.remove(value); });
            node.classList.add('g-transition');
            text.textContent = 'q' + key;
        };
        for (var _i = 0, _a = Object.entries(this.nodes); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], entry = _b[1];
            _loop_1(key, entry);
        }
    };
    Renderer.prototype.setSeconds = function (seconds) {
        this.seconds = seconds;
    };
    Renderer.prototype.setType = function (type) {
        this.type = type;
    };
    Renderer.prototype.setActive = function (state) {
        var parsedState = this.parseStateToInt(state);
        if (!this.containsData(parsedState))
            return;
        var node = document.querySelector(this.nodes[parsedState].node);
        var text = document.querySelector(this.nodes[parsedState].text);
        this.animate(node, text, state, 'n-active');
    };
    Renderer.prototype.setAccepted = function (state, character) {
        var parsedState = this.parseStateToInt(state);
        if (!this.containsData(parsedState))
            return;
        var node = document.querySelector(this.nodes[parsedState].node);
        var text = document.querySelector(this.nodes[parsedState].text);
        this.animate(node, text, character, 'n-accept');
    };
    Renderer.prototype.setRejected = function (state, character) {
        var parsedState = this.parseStateToInt(state);
        if (!this.containsData(parsedState))
            return;
        var node = document.querySelector(this.nodes[parsedState].node);
        var text = document.querySelector(this.nodes[parsedState].text);
        this.animate(node, text, character, 'n-reject');
    };
    Renderer.prototype.animate = function (node, text, character, className) {
        setTimeout(function (node, text, character) {
            node.classList.remove('n-active', 'n-accept', 'n-reject');
            node.classList.add(className);
            if (null !== character)
                text.textContent = character;
        }, this.seconds * (++this.multiplier), node, text, character);
    };
    Renderer.prototype.parseStateToInt = function (state) {
        return parseInt(state.substring(1));
    };
    Renderer.prototype.containsData = function (index) {
        return ('undefined' !== typeof this.nodes[index] ||
            'undefined' !== typeof this.nodes[index].node ||
            'undefined' !== typeof this.nodes[index].text);
    };
    Renderer.prototype.clearSeconds = function () {
        this.seconds = 0;
    };
    return Renderer;
}());
export default Renderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFXSSxrQkFBWSxLQUFhO1FBSGYsWUFBTyxHQUFXLEdBQUcsQ0FBQTtRQUNyQixlQUFVLEdBQVcsQ0FBQyxDQUFBO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFBO1FBRWpCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRVMsK0JBQVksR0FBdEI7Z0NBQ2MsR0FBRyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckQsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFckQsSUFBSSxPQUFPLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDNUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssSUFBSyxJQUFJLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDLEFBQUQsQ0FBQyxDQUFBO1lBRW5FLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTs7UUFSaEMsS0FBeUIsVUFBMEIsRUFBMUIsS0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBMUIsY0FBMEIsRUFBMUIsSUFBMEI7WUFBMUMsSUFBQSxXQUFZLEVBQVgsR0FBRyxRQUFBLEVBQUUsS0FBSyxR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
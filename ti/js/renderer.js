var Renderer = /** @class */ (function () {
    function Renderer(nodes) {
        this.tableRows = null;
        this.seconds = 500;
        this.multiplier = 0;
        this.nodes = nodes;
        this.tableRows = document.querySelectorAll('#transitions tr');
        this.prepareNodes();
        this.prepareRows();
    }
    Renderer.prototype.prepareNodes = function () {
        var _loop_1 = function (key, entry) {
            var node = document.querySelector(entry.node);
            var text = document.querySelector(entry.text);
            var classes = node.classList.toString().split(' ');
            classes.forEach(function (value) {
                if (value)
                    node.classList.remove(value);
            });
            node.classList.add('g-transition');
            text.textContent = 'q' + key;
        };
        for (var _i = 0, _a = Object.entries(this.nodes); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], entry = _b[1];
            _loop_1(key, entry);
        }
    };
    Renderer.prototype.prepareRows = function () {
        this.tableRows.forEach(function (row) {
            var classes = row.classList.toString().split(' ');
            classes.forEach(function (value) {
                if (value)
                    row.classList.remove(value);
            });
            row.classList.add('g-transition');
        });
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
        this.animateTable(state, null, 't-active', null);
    };
    Renderer.prototype.setAccepted = function (state, character, transition) {
        if (character === void 0) { character = null; }
        if (transition === void 0) { transition = null; }
        var parsedState = this.parseStateToInt(state);
        if (!this.containsData(parsedState))
            return;
        var node = document.querySelector(this.nodes[parsedState].node);
        var text = document.querySelector(this.nodes[parsedState].text);
        character = ('0' === character) ? 'blank' : character;
        this.animate(node, text, character, 'n-accept');
        this.animateTable(state, character, 't-accept', transition);
    };
    Renderer.prototype.setRejected = function (state, character, transition) {
        if (character === void 0) { character = null; }
        if (transition === void 0) { transition = null; }
        var parsedState = this.parseStateToInt(state);
        if (!this.containsData(parsedState))
            return;
        var node = document.querySelector(this.nodes[parsedState].node);
        var text = document.querySelector(this.nodes[parsedState].text);
        character = ('0' === character) ? 'blank' : character;
        this.animate(node, text, character, 'n-reject');
        this.animateTable(state, character, 't-reject', transition);
    };
    Renderer.prototype.animate = function (node, text, character, className) {
        setTimeout(function (node, text, character) {
            node.classList.remove('n-active', 'n-accept', 'n-reject');
            node.classList.add(className);
            if (null !== character)
                text.textContent = character;
        }, this.seconds * (++this.multiplier), node, text, character, className);
    };
    Renderer.prototype.animateTable = function (state, character, className, transition) {
        var _this = this;
        if (transition === void 0) { transition = null; }
        setTimeout(function (state, className, character, transition) {
            _this.prepareRows();
            // ToDo: needs recursive implementation  
            var found = false;
            _this.tableRows.forEach(function (row) {
                if (!found && (null !== row.firstElementChild) && state === row.firstElementChild.innerText && (null !== transition)) {
                    row.childNodes.forEach(function (child) {
                        if ((null !== child.innerText) && (transition[character] === child.innerText)) {
                            row.classList.add(className);
                            found = true;
                        }
                    });
                }
                else if ((null !== row.firstElementChild) && state === row.firstElementChild.innerText) {
                    row.classList.add(className);
                }
            });
        }, this.seconds * this.multiplier, state, className, character, transition);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFVSSxrQkFBWSxLQUFhO1FBTGYsY0FBUyxHQUFhLElBQUksQ0FBQTtRQUUxQixZQUFPLEdBQVcsR0FBRyxDQUFBO1FBQ3JCLGVBQVUsR0FBVyxDQUFDLENBQUE7UUFHNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFFUywrQkFBWSxHQUF0QjtnQ0FDYyxHQUFHLEVBQUUsS0FBSztZQUNoQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM3QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU3QyxJQUFJLE9BQU8sR0FBYSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM1RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztnQkFDbEIsSUFBSSxLQUFLO29CQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzNDLENBQUMsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBOztRQVZoQyxLQUF5QixVQUEwQixFQUExQixLQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFB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
var AbstractMachine = /** @class */ (function () {
    function AbstractMachine(renderer, word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = null; }
        this.state = 'q0';
        this.renderer = null;
        this.transitions = null;
        this.renderer = renderer;
        this.word = word;
        this.accept = accept;
    }
    AbstractMachine.prototype.changeState = function (newState) {
        this.state = newState;
    };
    AbstractMachine.prototype.prepareWord = function () {
        this.word = this.word.toUpperCase().trim();
    };
    AbstractMachine.prototype.setSpeed = function (speed) {
        var seconds = [1500, 1000, 250];
        this.renderer.setSeconds(seconds[parseInt(speed) - 1]);
    };
    return AbstractMachine;
}());
export default AbstractMachine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFjaGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9tYWNoaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBV0kseUJBQVksUUFBa0IsRUFBRSxJQUFpQixFQUFFLE1BQXFCO1FBQXhDLHFCQUFBLEVBQUEsU0FBaUI7UUFBRSx1QkFBQSxFQUFBLGFBQXFCO1FBTjlELFVBQUssR0FBVyxJQUFJLENBQUE7UUFFcEIsYUFBUSxHQUFhLElBQUksQ0FBQTtRQUV6QixnQkFBVyxHQUFXLElBQUksQ0FBQTtRQUdoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBTVMscUNBQVcsR0FBckIsVUFBc0IsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7SUFDekIsQ0FBQztJQUVTLHFDQUFXLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzlDLENBQUM7SUFFTSxrQ0FBUSxHQUFmLFVBQWdCLEtBQVU7UUFDdEIsSUFBTSxPQUFPLEdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDIn0=
var Machine = /** @class */ (function () {
    function Machine(word, accept) {
        if (word === void 0) { word = ''; }
        if (accept === void 0) { accept = null; }
        this.state = 'q0';
        this.renderer = null;
        this.transitions = null;
        this.word = word;
        this.accept = accept;
    }
    Machine.prototype.changeState = function (newState) {
        this.state = newState;
    };
    Machine.prototype.prepareWord = function () {
        this.word = this.word.toUpperCase().trim();
    };
    return Machine;
}());
export default Machine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFjaGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9tYWNoaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBVUksaUJBQVksSUFBaUIsRUFBRSxNQUFxQjtRQUF4QyxxQkFBQSxFQUFBLFNBQWlCO1FBQUUsdUJBQUEsRUFBQSxhQUFxQjtRQU4xQyxVQUFLLEdBQVcsSUFBSSxDQUFBO1FBRXBCLGFBQVEsR0FBUSxJQUFJLENBQUE7UUFFcEIsZ0JBQVcsR0FBVyxJQUFJLENBQUE7UUFHaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQU1TLDZCQUFXLEdBQXJCLFVBQXNCLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3pCLENBQUM7SUFFUyw2QkFBVyxHQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxDQUFDO0lBRUwsY0FBQztBQUFELENBQUMsQUEzQkQsSUEyQkMifQ==
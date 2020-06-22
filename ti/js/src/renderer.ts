export default class Renderer {

    protected type: string

    protected nodes: object
    protected current: object
    protected previous: object

    protected seconds: number = 500
    protected multiplier: number = 0

    constructor(nodes: object) {
        this.nodes = nodes
        this.type = 'fsm'

        this.prepareNodes()
    }

    protected prepareNodes(): void {
        for (let [key, entry] of Object.entries(this.nodes)) {
            let node: object = document.querySelector(entry.node)
            let text: object = document.querySelector(entry.text)

            let classes: string[] = node.classList.toString().split(' ')
            classes.forEach((value) => if (value) node.classList.remove(value))
            
            node.classList.add('g-transition')
            text.textContent = 'q' + key
        }
    }

    public setSeconds(seconds: number): void {
        this.seconds = seconds
    }

    public setType(type: string) {
        this.type = type
    }

    public setActive(state: string): void {
        const parsedState: number = this.parseStateToInt(state)

        if (!this.containsData(parsedState)) return

        const node = document.querySelector(this.nodes[parsedState].node)
        const text = document.querySelector(this.nodes[parsedState].text)

        this.animate(node, text, state, 'n-active')
    }

    public setAccepted(state: string, character: string): void {
        const parsedState: number = this.parseStateToInt(state)

        if (!this.containsData(parsedState)) return

        const node = document.querySelector(this.nodes[parsedState].node)
        const text = document.querySelector(this.nodes[parsedState].text)

        this.animate(node, text, character, 'n-accept')
    }

    public setRejected(state: string, character: string): void {
        const parsedState: number = this.parseStateToInt(state)

        if (!this.containsData(parsedState)) return

        const node: any = document.querySelector(this.nodes[parsedState].node)
        const text: any = document.querySelector(this.nodes[parsedState].text)

        this.animate(node, text, character, 'n-reject')

    }

    protected animate(node: any, text: any, character: string, className: string): void {
        setTimeout((node, text, character) => {
            node.classList.remove('n-active', 'n-accept', 'n-reject')
            node.classList.add(className)
            if (null !== character) text.textContent = character
        },
            this.seconds * (++this.multiplier),
            node,
            text,
            character
        )
    }

    protected parseStateToInt(state: string): number {
        return parseInt(state.substring(1))
    }

    protected containsData(index: number): boolean {
        return (
            'undefined' !== typeof this.nodes[index] ||
            'undefined' !== typeof this.nodes[index].node ||
            'undefined' !== typeof this.nodes[index].text
        )
    }

    public clearSeconds(): void {
        this.seconds = 0;
    }

}
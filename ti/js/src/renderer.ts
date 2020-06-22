export default class Renderer {

    protected type: string

    protected nodes: object
    protected tableRows: NodeList = null

    protected seconds: number = 500
    protected multiplier: number = 0

    constructor(nodes: object) {
        this.nodes = nodes
        this.tableRows = document.querySelectorAll('#transitions tr')
        this.prepareNodes()
        this.prepareRows()
    }

    protected prepareNodes(): void {
        for (let [key, entry] of Object.entries(this.nodes)) {
            let node = document.querySelector(entry.node)
            let text = document.querySelector(entry.text)

            let classes: string[] = node.classList.toString().split(' ')
            classes.forEach((value) => {
                if (value) node.classList.remove(value)
            })

            node.classList.add('g-transition')
            text.textContent = 'q' + key
        }
    }

    protected prepareRows(): void {
        this.tableRows.forEach((row: any) => {
            let classes: string[] = row.classList.toString().split(' ')
            classes.forEach((value) => {
                if (value) row.classList.remove(value)
            })

            row.classList.add('g-transition')
        })
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
        this.animateTable(state, null, 't-active', null)
    }

    public setAccepted(state: string, character: string = null, transition: object = null): void {
        const parsedState: number = this.parseStateToInt(state)

        if (!this.containsData(parsedState)) return

        const node = document.querySelector(this.nodes[parsedState].node)
        const text = document.querySelector(this.nodes[parsedState].text)

        character = ('0' === character) ? 'blank' : character

        this.animate(node, text, character, 'n-accept')
        this.animateTable(state, character, 't-accept', transition)
    }

    public setRejected(state: string, character: string = null, transition: object = null): void {
        const parsedState: number = this.parseStateToInt(state)

        if (!this.containsData(parsedState)) return

        const node: any = document.querySelector(this.nodes[parsedState].node)
        const text: any = document.querySelector(this.nodes[parsedState].text)

        character = ('0' === character) ? 'blank' : character

        this.animate(node, text, character, 'n-reject')
        this.animateTable(state, character, 't-reject', transition)
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
            character,
            className
        )
    }

    protected animateTable(state: string, character: string, className: string, transition: object = null): void {      
        setTimeout((state, className, character, transition) => {
            this.prepareRows()     
            // ToDo: needs recursive implementation  
            let found: boolean = false    
            this.tableRows.forEach((row: any) => {
                if (!found && (null !== row.firstElementChild) && state === row.firstElementChild.innerText && (null !== transition)) {
                    row.childNodes.forEach((child) => {
                            if ((null !== child.innerText) && (transition[character] === child.innerText)) {
                                row.classList.add(className)    
                                found = true                            
                            }
                    })
                } else if ((null !== row.firstElementChild) && state === row.firstElementChild.innerText) {
                    row.classList.add(className)
                }   
            })            
        },
            this.seconds * this.multiplier,
            state,
            className,
            character,
            transition
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
export default abstract class Machine {
    protected readonly accept: string

    protected word: string
    protected state: string = 'q0'

    protected renderer: any = null

    protected transitions: object = null

    constructor(word: string = '', accept: string = null) {
        this.word = word
        this.accept = accept
    }

    abstract execute(): boolean

    abstract logResult(): void

    protected changeState(newState: string): void {
        this.state = newState
    }

    protected prepareWord(): void {
        this.word = this.word.toUpperCase().trim()
    }
    
}

import Renderer from "./renderer"

export default abstract class AbstractMachine {

    protected readonly accept: string

    protected word: string
    protected state: string = 'q0'

    protected renderer: Renderer = null

    protected transitions: object = null

    constructor(renderer: Renderer, word: string = '', accept: string = null) {
        this.renderer = renderer
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

    public setSpeed(speed: any) {
        const seconds: object = [1500, 1000, 250]
        this.renderer.setSeconds(seconds[parseInt(speed) - 1])
    }
    
}

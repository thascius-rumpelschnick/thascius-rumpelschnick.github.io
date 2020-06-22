import AbstractMachine from './machine.js'
import Renderer from './renderer.js'

class ErgTm extends AbstractMachine {

    private readonly blank: string = '0'
    private readonly fail: string = 'F'
    private readonly left: string = 'l'
    private readonly right: string = 'r'
    private readonly halt: string = 'h'
    private readonly reject: string = 'q14'

    private processedWord: string

    protected transitions: object = {
        q0: { B: [this.blank, 'q1', this.right] },
        q1: { T: ['T', 'q2', this.right], P: ['P', 'q2', this.right] },
        q2: { B: [this.blank, 'q3', this.right] },
        q3: { T: [this.blank, 'q4', this.right], P: [this.blank, 'q6', this.right] },
        q4: { S: [this.blank, 'q4', this.right], X: [this.blank, 'q5', this.right] },
        q5: { X: [this.blank, 'q6', this.right], S: [this.blank, 'q8', this.right] },
        q6: { T: [this.blank, 'q6', this.right], V: [this.blank, 'q7', this.right] },
        q7: { P: [this.blank, 'q5', this.right], V: [this.blank, 'q8', this.right] },
        q8: { E: [this.blank, 'q9', this.right] },
        q9: { T: ['T', 'q10', this.right], P: ['P', 'q10', this.right] },
        q10: { E: [this.blank, 'q11', this.right] },
        q11: { 0: [this.blank, 'q11', this.left], T: [this.blank, 'q12', this.left], P: [this.blank, 'q13', this.left] },
        q12: { 0: [this.blank, 'q12', this.left], T: [this.blank, 'q15', this.halt] },
        q13: { 0: [this.blank, 'q13', this.left], P: [this.blank, 'q15', this.halt] }
    }

    constructor(renderer: Renderer, word: string = '', accept: string = 'q15') {
        super(renderer, word, accept)
        this.processedWord = this.word
        
    }

    static init(word: string, nodes: object): ErgTm {
        return new ErgTm(new Renderer(nodes), word)
    }

    public execute(): boolean {
        this.prepareWordForTape()

        let i: number = 0
        while (i < this.processedWord.length && (this.state !== this.accept)) {
            this.renderer.setActive(this.state)
            let transition = this.getTransition(i)
            if (transition) {
                this.renderer.setAccepted(this.state, this.word[i], this.transitions[this.state])
                this.writeToTape(transition[0], i)
                this.changeState(transition[1])
                i = this.moveHead(transition[2], i)
            } else {
                this.renderer.setRejected(this.state, this.word[i], this.transitions[this.state])
                this.writeToTape(this.fail, i)
                this.changeState(this.reject)
                break
            }
        }

        if (this.accept === this.state) {            
            this.renderer.setAccepted(this.state)
        } else {
            this.renderer.setRejected(this.state)
        }

        this.logResult()

        return this.accept === this.state
    }

    private getTransition(position: number): object {
        return this.transitions[this.state][this.processedWord[position]]
    }

    private writeToTape(sign: string, position: number): void {
        this.processedWord = this.processedWord.split('').fill(sign, position, position + 1).join('')
    }

    private moveHead(direction: string, position: number): number {
        return (this.left === direction) ? --position : ++position
    }

    private prepareWordForTape(): void {
        this.prepareWord()
        // To simulate an endlessly ongoing tape filled with blanks on the right side of our word
        this.processedWord = this.word + this.blank
    }

    logResult(): void {
        console.log(`Final State: ${this.state}`, `Written word: ${this.processedWord}`)
    }

}

const nodes = {
    0: {
        node: '#tm > g > ellipse:nth-child(17)',
        text: '#tm > g > g:nth-child(18) > switch > foreignObject > div > div > div'
    },
    1: {
        node: '#tm > g > ellipse:nth-child(23)',
        text: '#tm > g > g:nth-child(24) > switch > foreignObject > div > div > div'
    },
    2: {
        node: '#tm > g > ellipse:nth-child(27)',
        text: '#tm > g > g:nth-child(28) > switch > foreignObject > div > div > div'
    },
    3: {
        node: '#tm > g > ellipse:nth-child(35)',
        text: '#tm > g > g:nth-child(36) > switch > foreignObject > div > div > div'
    },
    4: {
        node: '#tm > g > ellipse:nth-child(45)',
        text: '#tm > g > g:nth-child(46) > switch > foreignObject > div > div > div'
    },
    5: {
        node: '#tm > g > ellipse:nth-child(61)',
        text: '#tm > g > g:nth-child(62) > switch > foreignObject > div > div > div'
    },
    6: {
        node: '#tm > g > ellipse:nth-child(53)',
        text: '#tm > g > g:nth-child(54) > switch > foreignObject > div > div > div'
    },
    7: {
        node: '#tm > g > ellipse:nth-child(67)',
        text: '#tm > g > g:nth-child(68) > switch > foreignObject > div > div > div'
    },
    8: {
        node: '#tm > g > ellipse:nth-child(63)',
        text: '#tm > g > g:nth-child(64) > switch > foreignObject > div > div > div'
    },
    9: {
        node: '#tm > g > ellipse:nth-child(83)',
        text: '#tm > g > g:nth-child(84) > switch > foreignObject > div > div > div'
    },
    10: {
        node: '#tm > g > ellipse:nth-child(81)',
        text: '#tm > g > g:nth-child(82) > switch > foreignObject > div > div > div'
    },
    11: {
        node: '#tm > g > ellipse:nth-child(91)',
        text: '#tm > g > g:nth-child(92) > switch > foreignObject > div > div > div'
    },
    12: {
        node: '#tm > g > ellipse:nth-child(109)',
        text: '#tm > g > g:nth-child(110) > switch > foreignObject > div > div > div'
    },
    13: {
        node: '#tm > g > ellipse:nth-child(107)',
        text: '#tm > g > g:nth-child(108) > switch > foreignObject > div > div > div'
    },
    14: {
        node: '#tm > g > ellipse:nth-child(101)',
        text: '#tm > g > g:nth-child(104) > switch > foreignObject > div > div > div'
    },
    15: {
        node: '#tm > g > ellipse:nth-child(111)',
        text: '#tm > g > g:nth-child(114) > switch > foreignObject > div > div > div'
    }
}

let tm: ErgTm;
const run = () => {
    tm = ErgTm.init(word.value, nodes);
    tm.setSpeed(speed.value)
    tm.execute()
}

const word: any = document.getElementById('word')
const speed: any = document.getElementById('speed')
const submit: any = document.getElementById('submit')

// Clear value by clicking into input
word.addEventListener('click', (event) => event.target.value = '')
submit.addEventListener('click', run)

const testStrings = [
    // Accept
    'BTBPVVETE',
    'BPBTSSXXTVVEPE',
    // Abort
    'BTBPTVVETEE',
    'BBBPVVETEE'
]

// for (let i: number = 0; i < testStrings.length; i++) {
//     if (i === 0) {
//         fsm = ErgFsm.init(testStrings[i], nodes)
//         console.log(`Accepted: ${fsm.execute()}`)
//     }
// }

import AbstractMachine from './machine.js'
import Renderer from './renderer.js'

class ErgFsm extends AbstractMachine {

    protected transitions: object = {
        q0: { B: 'q1' },
        q1: { T: 'q2', P: 'q9' },
        q2: { B: 'q3' },
        q3: { T: 'q4', P: 'q6' },
        q4: { S: 'q4', X: 'q5' },
        q5: { X: 'q6', S: 'q8' },
        q6: { T: 'q6', V: 'q7' },
        q7: { P: 'q5', V: 'q8' },
        q8: { E: 'q16' },
        q9: { B: 'q10' },
        q10: { T: 'q11', P: 'q13' },
        q11: { S: 'q11', X: 'q12' },
        q12: { X: 'q13', S: 'q15' },
        q13: { T: 'q13', V: 'q14' },
        q14: { P: 'q12', V: 'q15' },
        q15: { E: 'q17' },
        q16: { T: 'q18' },
        q17: { P: 'q18' },
        q18: { E: 'q19' },
        q19: {}
        // q19: { B: 'q20', E: 'q20', P: 'q20', S: 'q20', T: 'q20', V: 'q20', X: 'q20' }
    }

    constructor(renderer: Renderer, word: string = '', accept: string = 'q19') {
        super(renderer, word, accept)
    }

    static init(word: string, nodes: object): ErgFsm {
        return new ErgFsm(new Renderer(nodes), word)
    }

    public execute(): boolean {
        this.prepareWord()

        for (let i: number = 0; i < this.word.length; i++) {
            this.renderer.setActive(this.state)
            let transition = this.getTransition(i)
            if (transition) {
                this.renderer.setAccepted(this.state, this.word[i], this.transitions[this.state])
                this.changeState(transition)
            } else {
                this.renderer.setRejected(this.state, this.word[i], this.transitions[this.state])
                this.changeState('q0')
                break
            }
        }        

        if (this.accept === this.state) {            
            this.renderer.setAccepted(this.state, null, null)
        } 
        // else {
        //     this.renderer.setRejected(this.state, null, null)
        // }

        this.logResult()

        return this.accept === this.state
    }

    private getTransition(position: number): string {
        return this.transitions[this.state][this.word[position]]
    }

    logResult(): void {
        console.log(`Final State: ${this.state}`, `Written word: ${this.word}`)
    }

}

// Script
const nodes = {
    0: {
        node: '#fsm > g > ellipse:nth-child(1)',
        text: '#fsm > g > g:nth-child(2) > switch > foreignObject > div > div > div'
    },
    1: {
        node: '#fsm > g > ellipse:nth-child(5)',
        text: '#fsm > g > g:nth-child(6) > switch > foreignObject > div > div > div'
    },
    2: {
        node: '#fsm > g > ellipse:nth-child(11)',
        text: '#fsm > g > g:nth-child(12) > switch > foreignObject > div > div > div'
    },
    3: {
        node: '#fsm > g > ellipse:nth-child(17)',
        text: '#fsm > g > g:nth-child(18) > switch > foreignObject > div > div > div'
    },
    4: {
        node: '#fsm > g > ellipse:nth-child(21)',
        text: '#fsm > g > g:nth-child(22) > switch > foreignObject > div > div > div'
    },
    5: {
        node: '#fsm > g > ellipse:nth-child(43)',
        text: '#fsm > g > g:nth-child(44) > switch > foreignObject > div > div > div'
    },
    6: {
        node: '#fsm > g > ellipse:nth-child(25)',
        text: '#fsm > g > g:nth-child(26) > switch > foreignObject > div > div > div'
    },
    7: {
        node: '#fsm > g > ellipse:nth-child(51)',
        text: '#fsm > g > g:nth-child(52) > switch > foreignObject > div > div > div'
    },
    8: {
        node: '#fsm > g > ellipse:nth-child(47)',
        text: '#fsm > g > g:nth-child(48) > switch > foreignObject > div > div > div'
    },
    9: {
        node: '#fsm > g > ellipse:nth-child(27)',
        text: '#fsm > g > g:nth-child(28) > switch > foreignObject > div > div > div'
    },
    10: {
        node: '#fsm > g > ellipse:nth-child(31)',
        text: '#fsm > g > g:nth-child(32) > switch > foreignObject > div > div > div'
    },
    11: {
        node: '#fsm > g > ellipse:nth-child(35)',
        text: '#fsm > g > g:nth-child(36) > switch > foreignObject > div > div > div'
    },
    12: {
        node: '#fsm > g > ellipse:nth-child(57)',
        text: '#fsm > g > g:nth-child(58) > switch > foreignObject > div > div > div'
    },
    13: {
        node: '#fsm > g > ellipse:nth-child(39)',
        text: '#fsm > g > g:nth-child(40) > switch > foreignObject > div > div > div'
    },
    14: {
        node: '#fsm > g > ellipse:nth-child(61)',
        text: '#fsm > g > g:nth-child(62) > switch > foreignObject > div > div > div'
    },
    15: {
        node: '#fsm > g > ellipse:nth-child(65)',
        text: '#fsm > g > g:nth-child(66) > switch > foreignObject > div > div > div'
    },
    16: {
        node: '#fsm > g > ellipse:nth-child(151)',
        text: '#fsm > g > g:nth-child(152) > switch > foreignObject > div > div > div'
    },
    17: {
        node: '#fsm > g > ellipse:nth-child(155)',
        text: '#fsm > g > g:nth-child(156) > switch > foreignObject > div > div > div'
    },
    18: {
        node: '#fsm > g > ellipse:nth-child(71)',
        text: '#fsm > g > g:nth-child(72) > switch > foreignObject > div > div > div'
    },
    19: {
        node: '#fsm > g > ellipse:nth-child(77)', // ['#fsm > g > ellipse:nth-child(78)', ],
        text: '#fsm > g > g:nth-child(80) > switch > foreignObject > div > div > div'
    }
}

let fsm: ErgFsm;
const run = () => {
    fsm = ErgFsm.init(word.value, nodes);
    fsm.setSpeed(speed.value)
    fsm.execute()
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

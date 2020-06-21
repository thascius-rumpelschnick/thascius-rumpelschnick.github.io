import Machine from './machine.js'

class ErgFsm extends Machine {

    protected transitions: object = {
        q0: { B: [this.blank, 'q1', this.right] },
        q1: { T: ['T', 'q2', this.right], P: ['P', 'q2', this.right], },
        q2: { B: [this.blank, 'q3', this.right] },
        q3: { T: [this.blank, 'q4', this.right], P: [this.blank, 'q6', this.right], },
        q4: { S: [this.blank, 'q4', this.right], X: [this.blank, 'q5', this.right] },
        q5: { X: [this.blank, 'q6', this.right], S: [this.blank, 'q8', this.right] },
        q6: { T: [this.blank, 'q6', this.right], V: [this.blank, 'q7', this.right] },
        q7: { P: [this.blank, 'q5', this.right], V: [this.blank, 'q8', this.right] },
        q8: { E: [this.blank, 'q9', this.right] },
        q9: { T: ['T', 'q10', this.right], P: ['P', 'q10', this.right], },
        q10: { E: [this.blank, 'q11', this.right] },
        q11: { 0: [this.blank, 'q11', this.left], T: [this.blank, 'q12', this.left], P: [this.blank, 'q13', this.left], },
        q12: { 0: [this.blank, 'q12', this.left], T: [this.blank, 'q15', this.halt] },
        q13: { 0: [this.blank, 'q13', this.left], P: [this.blank, 'q15', this.halt] }
    }

    constructor(word: string = '', accept: string = 'q15') {
        super(word, accept)
    }

    static init(word: string): ErgFsm {
        return new ErgFsm(word)
    }

    public execute(): boolean {
        this.prepareWord()

        this.logResult()

        return this.accept === this.state
    }

    private getTransition(position: number): object {
        return this.transitions[this.state][this.word[position]]
    }

    logResult(): void {
        console.log(`Final State: ${this.state}`, `Written word: ${this.word}`)
    }

}

let fsm: ErgFsm;
const input: any = document.getElementById('word')
const submit: any = document.getElementById('submit')
// submit.addEventListener('click', () => tm = ErgTm.init(input.value))

fsm = ErgFsm.init('BTBPVVETE')
console.log(`Accepted: ${fsm.execute()}`)

fsm = ErgFsm.init('BPBTSSXXTVVEPE')
console.log(`Accepted: ${fsm.execute()}`)

fsm = ErgFsm.init('BTBPVVETEE')
console.log(`Accepted: ${fsm.execute()}`)
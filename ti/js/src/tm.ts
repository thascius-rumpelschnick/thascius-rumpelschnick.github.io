import Machine from './machine.js'

class ErgTm extends Machine {
    private readonly blank: string = '0'
    private readonly fail: string = 'F'
    private readonly left: string = 'l'
    private readonly right: string = 'r'
    private readonly halt: string = 'h'
    private readonly reject: string = 'q14'

    private processedWord: string

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
        this.processedWord = this.word
        
    }

    static init(word: string): ErgTm {
        return new ErgTm(word)
    }

    public execute(): boolean {
        this.prepareWordForTape()

        let i: number = 0
        while (i < this.processedWord.length && (this.state !== this.accept)) {
            let transition = this.getTransition(i)
            if (transition) {
                this.writeToTape(transition[0], i)
                this.changeState(transition[1])
                i = this.moveHead(transition[2], i)
            } else {
                this.writeToTape(this.fail, i)
                this.changeState(this.reject)
                break
            }
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

let tm: ErgTm;
const input: any = document.getElementById('word')
const submit: any = document.getElementById('submit')
// submit.addEventListener('click', () => tm = ErgTm.init(input.value))

tm = ErgTm.init('BTBPVVETE')
console.log(`Accepted: ${tm.execute()}`)

tm = ErgTm.init('BPBTSSXXTVVEPE')
console.log(`Accepted: ${tm.execute()}`)

tm = ErgTm.init('BTBPVVETEE')
console.log(`Accepted: ${tm.execute()}`)

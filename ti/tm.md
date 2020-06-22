# Embeddd Reber Grammar - Turing Machine

## Notes

tsc --inlineSourceMap --module ES6 --outDir ../ *.ts

## Prämissen

TM = (Q, E, T, d, q0, blank, F)

Q = {q1, q2, q3, q4, q5, ..., q16}

E = {B, E, P, S, T, V, X}

T = {B, E, P, S, T, V, X, 0, F}

d =

<table>
    <tbody>
        <tr>
            <th>
                aktueller
                Zustand
            </th>
            <th>
                geles.
                Symbol
            </th>
            <th>→</th>
            <th>
                schr.
                Symbol
            </th>
            <th>
                neuer
                Zustand
            </th>
            <th>
                Kopfrichtung
            </th>
        </tr>
        <tr>
            <td>s1</td>
            <td>1</td>
            <td>→</td>
            <td>0</td>
            <td>s2</td>
            <td>R
            </td>
        </tr>
    </tbody>
</table>

q0 = q0

blank = blank

F = {q15, q16}

## Testwörter

BP BP TE PE

### Valide

bpbtsssssxxttvpsepe
BPBTSSXXTVVEPE
BTBPVVETE
BTXXVPSE
BPVPXVPXVPXVVE
BTSXXVPSE

### Nicht-valide

BTSSPXSE
BPTVVB
BTXXVVSE
BPVSPSE
BTSSSE

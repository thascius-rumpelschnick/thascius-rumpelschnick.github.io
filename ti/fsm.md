# Embeddd Reber Grammar - Finite State Machine

<div class="row center">
           <div class="col s6 offset-s3">
            <table id="transitions" class="striped">
                <thead>
                    <tr>
                        <th>Zustand</th>
                        <th>Eingabe</th>
                        <th>Folgezustand</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>q0</td>
                        <td>B</td>
                        <td>q1</td>
                    </tr>
                    <tr>
                        <td>q1</th>
                        <td>T</td>
                        <td>q2</td>
                    </tr>
                    <tr>
                        <td>q1</td>
                        <td>P</td>
                        <td>q9</td>
                    </tr>
                    <tr>
                        <td>q2</td>
                        <td>B</td>
                        <td>q3</td>
                    </tr>
                    <tr>
                        <td>q3</td>
                        <td>T</td>
                        <td>q4</td>
                    </tr>
                    <tr>
                        <td>q3</td>
                        <td>P</td>
                        <td>q6</td>
                    </tr>
                    <tr>
                        <td>q4</td>
                        <td>S</td>
                        <td>q4</td>
                    </tr>
                    <tr>
                        <td>q4</td>
                        <td>X</td>
                        <td>q5</td>
                    </tr>
                    <tr>
                        <td>q5</td>
                        <td>X</td>
                        <td>q6</td>
                    </tr>
                    <tr>
                        <td>q5</td>
                        <td>S</td>
                        <td>q8</td>
                    </tr>
                    <tr>
                        <td>q6</td>
                        <td>T</td>
                        <td>q6</td>
                    </tr>
                    <tr>
                        <td>q6</td>
                        <td>V</td>
                        <td>q7</td>
                    </tr>
                    <tr>
                        <td>q7</td>
                        <td>P</td>
                        <td>q5</td>
                    </tr>
                    <tr>
                        <td>q7</td>
                        <td>V</td>
                        <td>q8</td>
                    </tr>
                    <tr>
                        <td>q8</td>
                        <td>E</td>
                        <td>q16</td>
                    </tr>
                    <tr>
                        <td>q9</td>
                        <td>B</td>
                        <td>q10</td>
                    </tr>
                    <tr>
                        <td>q10</td>
                        <td>T</td>
                        <td>q11</td>
                    </tr>
                    <tr>
                        <td>q10</td>
                        <td>P</td>
                        <td>q13</td>
                    </tr>
                    <tr>
                        <td>q11</td>
                        <td>S</td>
                        <td>q11</td>
                    </tr>
                    <tr>
                        <td>q11</td>
                        <td>X</td>
                        <td>q12</td>
                    </tr>
                    <tr>
                        <td>q12</td>
                        <td>X</td>
                        <td>q13</td>
                    </tr>
                    <tr>
                        <td>q12</td>
                        <td>S</td>
                        <td>q15</td>
                    </tr>
                    <tr>
                        <td>q13</td>
                        <td>T</td>
                        <td>q13</td>
                    </tr>
                    <tr>
                        <td>q13</td>
                        <td>V</td>
                        <td>q14</td>
                    </tr>
                    <tr>
                        <td>q14</td>
                        <td>P</td>
                        <td>q12</td>
                    </tr>
                    <tr>
                        <td>q14</td>
                        <td>V</td>
                        <td>q15</td>
                    </tr>
                    <tr>
                        <td>q15</td>
                        <td>E</td>
                        <td>q17</td>
                    </tr>
                    <tr>
                        <td>q16</td>
                        <td>T</td>
                        <td>q18</td>
                    </tr>
                    <tr>
                        <td>q17</td>
                        <td>P</td>
                        <td>q18</td>
                    </tr>
                    <tr>
                        <td>q18</td>
                        <td>E</td>
                        <td class="t-accept">q19</td>
                    </tr>
                </tbody>
            </table>
           </div>
        </div>
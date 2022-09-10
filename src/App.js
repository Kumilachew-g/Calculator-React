import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-', '.'];
  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '')
      || (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      /* eslint no-eval: 0 */
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i += 1) {
      digits.push(
        <button type="button" onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>,
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? (
            <span>
              (
              {result}
              )
            </span>
          ) : ''}
          {' '}
          {calc || '0'}
        </div>
        <div className="operators">
          <button type="button" onClick={() => updateCalc('/')}>
            /
          </button>
          <button type="button" onClick={() => updateCalc('*')}>
            *
          </button>
          <button type="button" onClick={() => updateCalc('+')}>
            +
          </button>
          <button type="button" onClick={() => updateCalc('-')}>
            -
          </button>

          <button type="button" onClick={deleteLast}>
            DEL
          </button>
        </div>
        <div className="digits">
          {createDigits()}
          <button type="button" onClick={() => updateCalc('0')}>
            0
          </button>
          <button type="button" onClick={() => updateCalc('.')}>
            .
          </button>
          <button type="button" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

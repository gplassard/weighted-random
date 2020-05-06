import React, {useState} from 'react';
import './App.css';

export type Item = {
  value: string
  weight: number
}

export type Error = {
  line: number
  label: string
}

function App() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<Error[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    const lines = value.split("\n").filter(s => s !== "");
    const accumulateErrors: Error[] = [];
    const accumulateItems: Item[] = [];

    for (let i = 0; i < lines.length; i++){
      const line = lines[i];
      const split = line.split(",");
      if (split.length !== 2) {
        accumulateErrors.push({line: i + 1, label: `Expected 2 values separated by a ',', found "${split[0]}"`})
      }
      else {
        try {
          accumulateItems.push({value: split[0], weight: parseInt(split[1].trim())})
        } catch {
          accumulateErrors.push({line: i + 1, label: `Expected a number after the ',', found "${split[1]}"`})
        }
      }
    }
    setItems(accumulateItems);
    setErrors(accumulateErrors);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Random weighted</h2>
        <form>
          <textarea value={value} onChange={e => setValue(e.target.value)}>

          </textarea>
          <div>{JSON.stringify(errors)}</div>
          <div>{JSON.stringify(items)}</div>
          <div>
            <button onClick={submit}>Pick a random weighted item</button>
          </div>
        </form>

      </header>
    </div>
  );
}

export default App;

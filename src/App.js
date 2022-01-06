import './App.css';
import React, {useState} from "react";
import Helper from './Helper.js';

function App() {
    // we will track the state of each grid cell input and dynamically update the word suggestions using this data.
    const grid = [
        [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ], [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ], [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ], [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ], [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ], [
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")],
            [useState("grey"), useState("")]
        ]
    ]

    const nextColour = (y, x) => {
        const current = grid[y][x][0][0]
        if (current === "grey") {
            grid[y][x][0][1]("green")
        } else if (current === "green") {
            grid[y][x][0][1]("yellow")
        } else {
            grid[y][x][0][1]("grey")
        }
    }

    // Grid JSX generation:
    let rows = [];
    for (let j = 0; j !== 6; j++) {
        let row = [];
        for (let i = 0; i!== 5; i++) {
            row.push(
                <input type="text" maxLength="1" name={j.toString() + i.toString()} key={j.toString() + i.toString()}
                            value={grid[j][i][1][0].toUpperCase()}
                            onChange={(event) =>
                                grid[j][i][1][1](event.target.value.toLowerCase())}
                            onClick={() => {
                                nextColour(j, i)
                            }}
                            className={grid[j][i][0][0]}/>
            )
        }
        row = [<div className="row" key={j.toString()}>{row}</div>]
        rows.push(row)
    }

    // Find and format words:
    let words = Helper.getMatches(grid).map((word) => <div className="word" key={word}>{word}</div>);

    return (
        <div className="App">
            <div className="grid">
                <form autoComplete="off" className="form">
                    {rows}
                </form>
            </div>
            <p>Based on this game state, some possible solutions are:</p>
            <div className="suggestions">
                {words}
            </div>
        </div>
    );
}

export default App;

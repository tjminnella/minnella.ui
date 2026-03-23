import { useState } from 'react';

const winning_combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export function Board() {
    const [state, setState] = useState({
        selections: Array(9).fill(null),
        activePlayer: "X"
    });
    const [msg, setMsg] = useState("");
    const HandleClick = (key:any) => {
        if (state.selections[key] || msg !== "") {
            return /* not a valid key or game ended */
        }
        setState(s => {
            const cp = [...s.selections];
            cp[key] = s.activePlayer;
            const draw = cp.every(x => x !== null);
            const winner = winning_combinations.some(
                combo => combo.every(
                    key => cp[key] === s.activePlayer));
            if (winner) {
                setMsg("Winner: " + s.activePlayer);
            } else if (draw) {
                setMsg("It's a Draw");
            }
            return {
                activePlayer: s.activePlayer === "X" ? "O" : "X",
                selections: cp
            };
        })
    }
    const reset = () => {
        setState({
            selections: Array(9).fill(null),
            activePlayer: "X"
        });
        setMsg("");
    }

    return <>
        <h1>Tic Tac Toe</h1>
        <div className="msg status">{msg}</div>
        <div className="squares">
            {state.selections.map((x, i) =>
                <button className="square" onClick={
                    () => HandleClick(i)} key={i}>{x}</button>
            )}
        </div>
        <button type="reset" id="reset"
            onClick={reset}>Reset</button>
    </>;
}
import './App.css'
import Calculator from "./components/Calculator/Calculator.tsx";
import Display from "./components/Display/Display.tsx";
import {useEffect, useState} from "react";

export type Operator = "*"  | "/";
export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export const operators: Operator[] = ["*", "/"];
export const digits: Digit[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function App() {

    const [calculations, setCalculation] = useState<(Operator | Digit)[]>([]);
    const [result, setResult] = useState<string>("");

    const handleAddDigit = (value) => {
        if (result) setResult("");
        setCalculation((prev) => {
            if ( prev.length === 0 || operators.includes(prev[prev.length-1]) )
                return [...prev, value];
            return [...prev.slice(0, -1), prev[prev.length-1] + value];
        });
    }

    const handleAddOperator = (value) => {
        if ( !calculations.length ) return;
        setCalculation((prev) => {
            if ( operators.includes(prev[prev.length-1]) )
                return [...prev.slice(0, -1), value];
            return [...prev, value];
        });
    }

    const handleClear = () => {
        setCalculation([]);
        setResult("");
    }

    const handleResult = () => {
        if ( !calculations.length ) return;
        if (operators.includes(calculations[calculations.length - 1]))
            setCalculation((prev) => prev.slice(0, -1));

        const resultOfExp = getResults();
        updateHistory(calculations, resultOfExp);
        setCalculation([]);
        setResult(resultOfExp.toString());
    }

    const getResults = () => {
        let counter = Number(calculations[0]);
        for (let i = 1; i < calculations.length; i += 2) {
            const operator = calculations[i];
            const secondOperand = calculations[i+1];

            switch (operator) {
                case "*":
                    counter = Number(counter) * Number(secondOperand);
                    break;
                case "/":
                    counter = Number(counter) / Number(secondOperand);
                    break;
                default:
                    break;
            }
        }
        return counter;
    }

    const updateHistory = (calculations, result) => {
        const calculationHistory = localStorage.getItem("calculationHistory");
        const history = JSON.parse(calculationHistory) || [];
        history.push({calculations, result});
        localStorage.setItem("calculationHistory", JSON.stringify(history));
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const key = event.key;
            if (digits.includes(key as Digit)) {
                handleAddDigit(key as Digit);
            } else if (operators.includes(key as Operator)) {
                handleAddOperator(key as Operator);
            } else if ( key === "Enter" || key === "=") {
                handleResult();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [calculations, result]);


    return (
        <div className={"main"}>
            <Display calculations={calculations} result={result}/>
            <Calculator
                handleAddDigit={handleAddDigit}
                handleAddOperator={handleAddOperator}
                handleClear={handleClear}
                handleResult={handleResult}
            />
        </div>
    )
}

export default App

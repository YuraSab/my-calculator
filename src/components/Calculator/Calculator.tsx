import styles from "./Calculator.module.scss";
import {CalculatorButton} from "../../ui/buttons/Buttons.tsx";
import {digits, operators} from "../../App.tsx";

const Calculator = ({handleAddDigit, handleAddOperator, handleClear, handleResult}) => {
    return (
        <div className={styles.main}>
            <div className={styles.empty_space}></div>
            <div className={styles.digits}>
                {[...digits].slice(7, 10).map((digit) => <CalculatorButton action={handleAddDigit} value={digit} key={digit}/>)}
                {[...digits].slice(4, 7).map((digit) => <CalculatorButton action={handleAddDigit} value={digit} key={digit}/>)}
                {[...digits].slice(1, 4).map((digit) => <CalculatorButton action={handleAddDigit} value={digit} key={digit}/>)}
                {[...digits].slice(0, 1).map((digit) => <CalculatorButton action={handleAddDigit} value={digit} key={digit}/>)}
            </div>
            <div className={styles.operators}>
                {operators.map((operator) => <CalculatorButton action={handleAddOperator} value={operator} key={operator}/>)}
                <CalculatorButton action={handleResult} value={"="} key={"="}/>
                <CalculatorButton action={handleClear} value={"C"} key={"C"}/>
            </div>
        </div>
    );
};

export default Calculator;
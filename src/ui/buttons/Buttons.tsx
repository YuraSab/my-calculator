import * as React from "react";
import {Digit, Operator} from "../../App.tsx";

type CalculatorButtonProps = {
    action: (value: Digit | Operator | "=" | "C") => void,
    value: Digit | Operator | "=" | "C",
    specialStyles?: React.CSSProperties;
}
export const CalculatorButton = ( {action, value, specialStyles}: CalculatorButtonProps ) => {
    return (
        <div onClick={() => action(value)} style={specialStyles}>
            {value}
        </div>
    )
}
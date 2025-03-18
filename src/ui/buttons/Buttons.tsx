import * as React from "react";

type CalculatorButtonProps = {
    action: (value: string | number) => void,
    value: string | number,
    specialStyles?: React.CSSProperties;
}
export const CalculatorButton = ( {action, value, specialStyles}: CalculatorButtonProps ) => {
    return (
        <div onClick={() => action(value)} style={specialStyles}>
            {value}
        </div>
    )
}
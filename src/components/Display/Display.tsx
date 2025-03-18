import styles from "./Display.module.scss";
import {Calculations} from "../../App.tsx";
type DisplayProps = {
    calculations: Calculations,
    result: string,
}
const Display = ({calculations, result}: DisplayProps) => {

    return (
        <div className={styles.display}>
            {calculations}
            {result && result}
        </div>
    );
};

export default Display;
import styles from "./Display.module.scss";

const Display = ({calculations, result}) => {

    return (
        <div className={styles.display}>
            {calculations}
            {result && result}
        </div>
    );
};

export default Display;
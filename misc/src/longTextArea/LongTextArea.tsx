import React from 'react';
import styles from './LongTextArea.module.css'

interface TextAreaProps {
    label: string;
    miRows: number;
    value: string;
    setValue: (value: string) => null;
    error: boolean;
    helper: string
}

const LongTextArea: React.FC<TextAreaProps> = ({ label, miRows, value, setValue, error, helper }) => {
    return (
        <>
            <textarea
                placeholder={label}
                rows={miRows}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.areaField}
            ></textarea>

            {error && <div style={{ color: 'red' }}>{helper}</div>}
        </>
    );
};

export default LongTextArea;
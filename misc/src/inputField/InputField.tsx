import React from 'react';

import styles from './InputField.module.css'

interface InputProps {
    label: string;
    type: string;
    value?: string | number;
    setValue: (value: string) => void;
    error?: boolean;
    helper?: string;
}

const InputField: React.FC<InputProps> = ({ label, type, value, setValue, error, helper }) => {
    return (
        <>
            <input
                placeholder={label}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.field}
            />
            {error && <div style={{ color: 'red' }}>{helper}</div>}
        </>
    );
};

export default InputField;
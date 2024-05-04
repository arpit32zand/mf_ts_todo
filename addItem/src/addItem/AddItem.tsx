import React, { useState } from 'react';

import styles from './AddItem.module.css'

import { useNavigate } from 'react-router-dom';

import LongTextArea from 'misc/LongTextArea';
import InputField from 'misc/InputField';

interface Task {
    id: number;
    title: string;
    note: string;
    completed: boolean;
}

const AddItem: React.FC = () => {
	const navigate = useNavigate()

	const [note, setNote] = useState<{ value: string; error: boolean }>({ value: '', error: false })
	const [title, setTitle] = useState<{ value: string; error: boolean }>({ value: '', error: false })

	const validate = (): boolean => {
        const nameRegex = /^[a-zA-Z\s'-]*$/;

        const isTitleValid: boolean = nameRegex.test(title.value);
        const isNoteValid: boolean = note.value.length >= 5 && note.value.length <= 264;

        setTitle({ ...title, error: !isTitleValid });
        setNote({ ...note, error: !isNoteValid });

        return isTitleValid && isNoteValid;
    };

	const handleAddItem = () => {
		if (validate()) {
			const newTask = {
				id: Date.now(),
				title: title.value,
				note: note.value,
				completed: false
			};
			const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
			
            setTitle({ value: '', error: false });
            setNote({ value: '', error: false });
			navigate('/')
		}
	}

	return (
		<div className={styles.container}>
			<span className={styles.heading}>
				You can add Task here
			</span>
			<div className={styles.inputContainer}>
				<InputField
					label={"Title"}
					value={title.value}
					setValue={(value: string) => setTitle({ value: value, error: false })}
					error={title.error}
					helper={'Invalid title format'}
				/>
				<LongTextArea
					label={"Note"}
					miRows={4}
					value={note.value}
					setValue={(value: string) => setNote({ value: value, error: false })}
					error={note.error}
					helper={'Note limit is 5-264 characters'}
				/>
			</div>
			<div className={styles.buttonContainer}>
				<button
					className={styles.cancelButton}
					onClick={() => navigate('/')}
				>
					Cancel
				</button>
				<button
					className={styles.button}
					onClick={handleAddItem}
				>
					Add +
				</button>
			</div>
		</div >
	);
};

export default AddItem;
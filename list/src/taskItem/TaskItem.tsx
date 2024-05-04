import React, { useState } from 'react';

import styles from './TaskItem.module.css'

import { MdDelete } from "react-icons/md";

export interface Task {
    id: number;
    title: string;
    note: string;
    completed: boolean;
}

export interface TodoItemProps {
    selectedTask: Task;
    taskList: Task[];
    completeTaskList: Task[];
    updateTasks: (updatedTasks: Task[]) => void;
    updateCompletedTasks: (updateCompletedTasks: Task[]) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ selectedTask, taskList, completeTaskList, updateTasks, updateCompletedTasks }) => {

    const [completed, setCompleted] = useState(selectedTask.completed);

    const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        const filteredTasks = taskList.filter(task => task.id !== selectedTask.id);
        updateTasks([...filteredTasks])
        localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
    }

    const handleTaskDone = (): void => {
        const updatedTasks = taskList;
        const updatedTask = { ...selectedTask, completed: true };
        const filteredTasks = updatedTasks.filter(task => task.id !== selectedTask.id);
        updateTasks([...filteredTasks])
        localStorage.setItem('tasks', JSON.stringify([...filteredTasks]));
        updateCompletedTasks([...completeTaskList ,updatedTask]);
        localStorage.setItem('completedTasks', JSON.stringify([...completeTaskList ,updatedTask]));
        setCompleted(true);
    }

    const handleTaskUncheck = (): void => {
        const updatedCompletedTasks = completeTaskList;
        const updatedCompletedTask = { ...selectedTask, completed: false };
        const filteredCompletedTasks = updatedCompletedTasks.filter(task => task.id !== selectedTask.id);
        updateCompletedTasks([...filteredCompletedTasks]);
        localStorage.setItem('completedTasks', JSON.stringify([...filteredCompletedTasks]));
        updateTasks([...taskList, updatedCompletedTask])
        localStorage.setItem('tasks', JSON.stringify([...taskList, updatedCompletedTask]));
        setCompleted(false);
    }

    return (
        <div
            className={!selectedTask.completed ? styles.container : styles.disableContainer}
        >
            <div className={styles.dataContainer}>
                <input
                    type='checkbox'
                    className={styles.check}
                    checked={completed}
                    onClick={e => e.stopPropagation()}
                    onChange={completed ? handleTaskUncheck : handleTaskDone}
                />
                <div className={styles.fieldContainer}>
                    <span
                        className={!selectedTask.completed ? styles.itemText : styles.doneItemText}
                    >
                        {selectedTask.title}
                    </span>
                    <span
                        className={!selectedTask.completed ? styles.itemText : styles.doneItemText}
                    >
                        {selectedTask.note}
                    </span>
                </div>
            </div>
            {!selectedTask.completed &&
                <div
                    className={styles.iconContainer}
                    onClick={e => handleDelete(e)}
                >
                    <MdDelete className={styles.icon} />
                </div>
            }
        </div>
    );
}

export default TodoItem;
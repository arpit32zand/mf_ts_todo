import React, { useEffect, useState } from 'react';

import styles from './TaskList.module.css'

import { useNavigate } from 'react-router-dom';

import TodoItem from '../taskItem/TaskItem';

export interface Task {
    id: number;
    title: string;
    note: string;
    completed: boolean;
}

const TaskList: React.FC = () => {

    const navigate = useNavigate()

    const [taskList, setTaskList] = useState<Task[]>([]);
    const [completeTaskList, setCompleteTaskList] = useState<Task[]>([]);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const storedTasks: string | null = localStorage.getItem('tasks');
        const storedCompletedTasks: string | null = localStorage.getItem('completedTasks');
        if (storedTasks) {
            const tasks: Task[] = JSON.parse(storedTasks);
            setTaskList([...tasks]);
        }
        if (storedCompletedTasks) {
            const tasks: Task[] = JSON.parse(storedCompletedTasks);
            setCompleteTaskList([...tasks]);
        }
    }, [setCompleteTaskList, setTaskList]);

    return (
        <div className={styles.container}>
            <span className={styles.heading}>
                TODO APP
            </span>
            <div className={styles.listContainer}>
                {(taskList.length && (filter === 'all' || filter === 'active')) ?
                    taskList.map((task) =>
                        <TodoItem
                            selectedTask={task}
                            key={task.id}
                            taskList={taskList}
                            completeTaskList={completeTaskList}
                            updateTasks={(tasks: Task[]) => setTaskList(tasks)}
                            updateCompletedTasks={(tasks: Task[]) => setCompleteTaskList(tasks)}
                        />
                    ) :
                    <span className={styles.heading2}>
                        Chill!! You have no task for now
                    </span>
                }
                {(completeTaskList.length > 0  && (filter === 'all' || filter === 'done')) && (
                    <>
                        <span className={styles.heading2} style={{ textAlign: 'center' }}>
                            Completed Task
                        </span>
                        {
                            completeTaskList.map((task) =>
                                <TodoItem
                                    selectedTask={task}
                                    key={task.id}
                                    taskList={taskList}
                                    completeTaskList={completeTaskList}
                                    updateTasks={(tasks: Task[]) => setTaskList(tasks)}
                                    updateCompletedTasks={(tasks: Task[]) => setCompleteTaskList(tasks)}
                                />
                            )
                        }
                    </>
                )}
            </div>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={() => navigate('/add-item')}
                >
                    Add Task
                </button>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={styles.filterDropdown}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div >
    );
};

export default TaskList;
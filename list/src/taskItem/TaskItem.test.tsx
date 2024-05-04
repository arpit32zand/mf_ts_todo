import React from "react"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { MemoryRouter } from "react-router-dom"

import TaskItem, { TodoItemProps } from "./TaskItem"

describe('Rendering todo list screen', () => {
    test('renders a checkbox', () => {

        const taskItemProps: TodoItemProps = {
            selectedTask: {
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            },
            taskList: [{
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            }],
            completeTaskList: [],
            updateTasks: () => { },
            updateCompletedTasks: () => { },
        }

        render(
            <MemoryRouter>
                <TaskItem {...taskItemProps} />
            </MemoryRouter>
        )
        const doneBox = screen.getByRole('checkbox')
        expect(doneBox).toBeInTheDocument()
    })

    test('renders a checkox capable of switching task status', async () => {
        const taskItemProps: TodoItemProps = {
            selectedTask: {
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            },
            taskList: [{
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            }],
            completeTaskList: [],
            updateTasks: () => { },
            updateCompletedTasks: () => { },
        }

        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <TaskItem {...taskItemProps} />
            </MemoryRouter>
        )
        const doneBox = screen.getByRole('checkbox')

        expect(doneBox).not.toBeChecked()

        await act(async () => {
            await user.click(doneBox)
        })
        expect(doneBox).toBeChecked()

        await act(async () => {
            await user.click(doneBox)
        })
        expect(doneBox).not.toBeChecked()
    })

    test('renders a checkox capable of switching task status', async () => {
        const taskItemProps: TodoItemProps = {
            selectedTask: {
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: true
            },
            taskList: [],
            completeTaskList: [{
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: true
            }],
            updateTasks: () => { },
            updateCompletedTasks: () => { },
        }

        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <TaskItem {...taskItemProps} />
            </MemoryRouter>
        )
        const doneBox = screen.getByRole('checkbox')

        expect(doneBox).toBeChecked()

        await act(async () => {
            await user.click(doneBox)
        })
        expect(doneBox).not.toBeChecked()

        await act(async () => {
            await user.click(doneBox)
        })
        expect(doneBox).toBeChecked()
    })

    test('completes a task on clicked an unchecked checkbox', async () => {
        const user = userEvent.setup()

        const taskItemProps: TodoItemProps = {
            selectedTask: {
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            },
            taskList: [{
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: false
            }],
            completeTaskList: [],
            updateTasks: jest.fn(),
            updateCompletedTasks: jest.fn(),
        }

        render(
            <MemoryRouter>
                <TaskItem {...taskItemProps} />
            </MemoryRouter>
        )

        const doneBox = screen.getByRole('checkbox');

        await act(async () => {
            await user.click(doneBox)
        })

        expect(taskItemProps.updateTasks).toHaveBeenCalledWith([]);

        expect(taskItemProps.updateCompletedTasks).toHaveBeenCalledWith([{
            id: 123,
            title: 'Demo',
            note: 'Demo Note',
            completed: true
        }]);
    })

    test('marks a task incomplete on clicking checked checkbox', async () => {
        const user = userEvent.setup()

        const taskItemProps: TodoItemProps = {
            selectedTask: {
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: true
            },
            taskList: [],
            completeTaskList: [{
                id: 123,
                title: 'Demo',
                note: 'Demo Note',
                completed: true
            }],
            updateTasks: jest.fn(),
            updateCompletedTasks: jest.fn(),
        }

        render(
            <MemoryRouter>
                <TaskItem {...taskItemProps} />
            </MemoryRouter>
        )

        const doneBox = screen.getByRole('checkbox')

        await act(async () => {
            await user.click(doneBox)
        })

        expect(taskItemProps.updateCompletedTasks).toHaveBeenCalledWith([]);

        expect(taskItemProps.updateTasks).toHaveBeenCalledWith([{
            id: 123,
            title: 'Demo',
            note: 'Demo Note',
            completed: false
        }]);
    })
})
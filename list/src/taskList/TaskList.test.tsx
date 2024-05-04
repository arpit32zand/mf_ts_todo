import React from "react"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { MemoryRouter } from "react-router-dom"

import TaskList from "./TaskList"
import { Task } from "./TaskList"

describe('Rendering todo list screen', () => {
    test('renders heading', () => {
        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        )
        const heading = screen.getByText(/TODO APP/i)
        expect(heading).toBeInTheDocument()
    })

    test('renders "Add Task" button', () => {
        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        )
        const addButton = screen.getByRole('button', { name: /add task/i })
        expect(addButton).toBeInTheDocument()
    })

    test('renders "Chill Text" when No Task', () => {

        const localStorageMock = {
            getItem: jest.fn().mockReturnValueOnce(JSON.stringify([]))
        };

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        )

        const chillText = screen.queryByText(/Chill!! You have no task for now/i)

        expect(chillText).toBeInTheDocument()
    })

    test('does not render "Chill Text" when Task is present in local storage', () => {

        const mockTasks: Task[] = [{ 
            id: 123,
            title: "Demo",
            note: "Demo Note",
            completed: false
        }];
        const mockCompletedTasks: Task[] = [];
        jest.spyOn(localStorage, 'getItem')
            .mockImplementation((key) => {
                if (key === 'tasks') return JSON.stringify(mockTasks);
                if (key === 'completedTasks') return JSON.stringify(mockCompletedTasks);
                return null;
            });

        render(
            <MemoryRouter>
                <TaskList />
            </MemoryRouter>
        )

        const chillText = screen.queryByText(/Chill!! You have no task for now/i)

        expect(chillText).not.toBeInTheDocument()
    });

    test('render completed list of task if present', () => {
        
        const mockTasks: Task[] = [];
        const mockCompletedTasks: Task[] = [{ 
            id: 123,
            title: "Demo",
            note: "Demo Note",
            completed: true
        }];
        jest.spyOn(localStorage, 'getItem')
            .mockImplementation((key) => {
                if (key === 'tasks') return JSON.stringify(mockTasks);
                if (key === 'completedTasks') return JSON.stringify(mockCompletedTasks);
                return null;
            });

        render(
                <MemoryRouter>
                    <TaskList />
                </MemoryRouter>
        )

        const completedHead = screen.queryByText(/Completed Task/i)

        expect(completedHead).toBeInTheDocument()
    })
})
import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TaskList from 'list/TaskList'
import AddItem from 'addItem/AddItem'

jest.mock('list/TaskList', () => ({
    __esModule: true,
    default: () => <div>Mocked TaskList</div>,
}));

jest.mock('addItem/AddItem', () => ({
    __esModule: true,
    default: () => <div>Mocked AddItem</div>,
}));

describe('App Routing', () => {
    test('renders TaskList component at the root URL', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                </Routes>
            </BrowserRouter>
        );

        const taskListElement = screen.getByText(/Mocked TaskList/i);
        expect(taskListElement).toBeInTheDocument();
    });

    test('renders AddItem component at /add-item URL', () => {
        render(
            <BrowserRouter>
                <Routes location="/add-item">
                    <Route path="/add-item" element={<AddItem />} />
                </Routes>
            </BrowserRouter>
        );

        const taskListElement = screen.getByText(/Mocked AddItem/i);
        expect(taskListElement).toBeInTheDocument();
    });
});
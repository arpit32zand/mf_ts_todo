import React from "react"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { MemoryRouter } from "react-router-dom"

import AddItem from "./AddItem"

jest.mock('misc/LongTextArea', () => ({
    __esModule: true,
    default: ({ label, miRows, value, setValue }: any) => (
        <textarea
            placeholder={label}
            rows={miRows}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        ></textarea>
    ),
}));

jest.mock('misc/InputField', () => ({
    __esModule: true,
    default: ({ label, value, setValue }: any) => (
        <input
            placeholder={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    ),
}));

describe('Rendering Add Item screen', () => {
    test('renders heading', () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <AddItem />
            </MemoryRouter>
        )
        const heading = screen.getByText(/you can add Task here/i)
        expect(heading).toBeInTheDocument()
    })

    test('renders "Add" button', () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        )
        const addButton = screen.getByRole('button', { name: /add +/i })
        expect(addButton).toBeInTheDocument()
    })

    test('renders "cancel" button', () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        )
        const cancelButton = screen.getByRole('button', { name: /cancel/i })
        expect(cancelButton).toBeInTheDocument()
    })

    test('renders input field for "Title"', () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        )
        const inputField = screen.getByPlaceholderText(/title/i);
        expect(inputField).toBeInTheDocument();
    });

    test('renders textarea field for "Note"', () => {
        render(
            <MemoryRouter>
                <AddItem />
            </MemoryRouter>
        )
        const textareaField = screen.getByPlaceholderText(/Note/i);
        expect(textareaField).toBeInTheDocument();
    });
})
import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import TaskList from 'list/TaskList'
import AddItem from 'addItem/AddItem'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<TaskList />} />
      <Route path='/add-item' element={<AddItem />} />
    </Routes>
  </BrowserRouter>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
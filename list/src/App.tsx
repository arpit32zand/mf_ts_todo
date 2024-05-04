import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => (
  <div>List</div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
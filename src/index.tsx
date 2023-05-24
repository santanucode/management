import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './root/Root'
import 'bootstrap/dist/css/bootstrap.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {TaskListProvider} from "./contexts/TaskListProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TaskListProvider>
            <App/>
        </TaskListProvider>
    </StrictMode>,
)

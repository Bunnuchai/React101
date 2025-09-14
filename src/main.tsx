import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import RoyalForm from './components/ParliamentForm'
import ParliamentForm from './components/ParliamentForm'
//import App from './App.tsx'
//import TouchList from './components/TodoList.tsx'
//import Course from './components/Course.tsx'

//import TodoListHookForm from './components/TodoListHookForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<TodoListHookForm />*/}
    {/*<App />*/}
    {/*<TouchList />*/}
    <ParliamentForm />
    {/*<Course />*/}
  </StrictMode>,
)



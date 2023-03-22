import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import AppProvider from './context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TodoComponent from './components/todo';
import Done from './components/done';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ToastContainer />
        <Router>
          <Routes>
            <Route path='/todo' element={<TodoComponent />} />
            <Route path='/done' element={<Done />} />
            <Route path='/' element={<App/>} />
          </Routes>
        </Router>
    </AppProvider>
  </React.StrictMode>,
)

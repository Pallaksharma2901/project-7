import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Form from './Form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from './UserList'
import EditForm from './EditForm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserList />}></Route>
      <Route path='/add' element={<Form />}></Route>
      <Route path='/edit/:id' element={<EditForm />}></Route>
    </Routes>
  </BrowserRouter>
)

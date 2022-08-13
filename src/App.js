import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import './App.css'

import { Sidebar } from "./components/sidebar"
import Layout from "./pages/panel/layout"
import Index from "./pages/panel/index"
import Rooms from "./pages/panel/rooms"
import Login from "./pages/panel/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="rooms" element={<Rooms />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App

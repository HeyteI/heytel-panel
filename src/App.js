import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import './App.css'

import Layout from "./pages/panel/layout"
import Index from "./pages/panel/index"
import Rooms from "./pages/panel/rooms"
import Login from "./pages/panel/login"
import AuthContext from "./context/AuthProvider";


function App() {
  const user = useContext(AuthContext);

  if (Object.keys(user.auth).length === 0) {
    return <Login></Login>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="reservations" element={<Rooms />} />
          <Route path="invoices" element={<Rooms />} />
          <Route path="cameras" element={<Rooms />} />
          <Route path="restaurant" element={<Rooms />} />
          <Route path="notifications" element={<Rooms />} />
          <Route path="settings" element={<Rooms />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

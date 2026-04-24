import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import DashBoard from './components/DashBoard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; 

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Show from "./pages/Show";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Home />} />

          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="show/:id" element={<Show />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
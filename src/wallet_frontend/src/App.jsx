import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomerDashboard from './components/Customer';
import AgentDashboard from './components/Agent';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute component={Dashboard} allowedRoles={['Admin']} />
      ),
    },
    {
      path: "/customer",
      element: (
        <ProtectedRoute component={CustomerDashboard} allowedRoles={['Customer']} />
      ),
    },
    {
      path: "/agent",
      element: (
        <ProtectedRoute component={AgentDashboard} allowedRoles={['Agent']} />
      ),
    },
   
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;

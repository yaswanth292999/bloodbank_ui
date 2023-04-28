import React, { createContext, useContext, useState } from "react";
import PrivateRoutes from "./privateRoutes";
import LoginPage from "./login";
import NavBar from "./navbar/navBar";
import { Sidebar } from "./sidebar/sidebar";
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

type UserContextType = {
  isUserLoggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [isUserLoggedIn, setLogin] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ isUserLoggedIn, setLogin }}>
        <NavBar />
        <main className="bloodBank">
          <Sidebar />
          <PrivateRoutes />
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="login" element={<LoginPage />} />
          </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

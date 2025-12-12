import React from "react";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

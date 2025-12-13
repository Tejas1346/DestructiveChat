import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { socket } from "./lib/socket";

const App = () => {
  useEffect(()=>{
    if(!socket.connected){
      socket.connect();
    }
    return ()=>{
      socket.disconnect();
    }
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:roomCode" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Button } from "./components/ui/button";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="bg-[#fdfaff] min-h-screen flex items-center justify-center min-w-xs  overflow-auto">
      <HomePage></HomePage>
    </div>
  );
};

export default App;

import { Clock, LogOut, Send, Share2, Users } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageComponent from "@/components/MessageComponent";
const ChatPage = () => {
  const { roomId } = useParams();
  
  
  return (
    <div className="w-full bg-slate-200 ">
        <div className="max-w-7xl border-2 border-slate-100 mx-auto h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="w-full border-2 rounded-md border-slate-50 flex flex-col md:flex-row md:items-center justify-between p-3 bg-white">
        <div className="p-3 pb-1 ">
          <h2 className="md:text-2xl text-xl">Room Name</h2>
          <div className="flex items-center py-3 gap-4">
            <div className="flex items-center gap-2">
              <Users />
              <span className="text-sm md:text-lg">You As Username</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock />
              <span className="text-sm md:text-lg">Expires in Time</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center ">
          <Button className="md:py-7 py-2 flex-1  md:text-xl md:[&_svg:not([class*='size-'])]:size-5.5 ">
            <Share2 /> Share Code
          </Button>
          <Button
            variant={"outline"}
            className="md:py-7 py-2 flex-1 md:text-xl text-slate-700 md:[&_svg:not([class*='size-'])]:size-5.5"
          >
            <LogOut /> Leave Room
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-3 ">
        <MessageComponent/>
        <MessageComponent isSent={true}/>
        <MessageComponent/>
        
      </main>

      <footer className="p-4 pb-4 px-6 bg-white border-1 border-slate-200 ">
        <div className="flex items-center gap-2 bg-slate-100 ">
          <Input className="py-5 md:py-6 md:text-xl flex-1" />
          <Button className="py-5.5 md:py-6.5 md:text-lg md:[&_svg:not([class*='size-'])]:size-5 md:has-[>svg]:px-4 ">
            <Send /> Send
          </Button>
        </div>
        <p className="text-center mt-2 text-sm md:text-lg text-slate-500">
          Messages self destruct after 5mins
        </p>
      </footer>
    </div>
    </div>
  );
};

export default ChatPage;

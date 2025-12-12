import CreateRoomModal from "@/components/CreateRoomModal";
import JoinRoomModal from "@/components/JoinRoomModal";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { LogIn, MessageSquarePlus } from "lucide-react";
import React, { useState } from "react";

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  return (
    <div className="bg-[#fdfaff] min-h-screen flex items-center justify-center min-w-xs  overflow-auto">
      <div className="px-6 min-w-xs">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-7xl mb-6 text-indigo-600">
            Self-Destructing Chat Rooms
          </h1>
          <p className="text-slate-600 text-lg md:text-3xl">
            Create or join temporary chat rooms that automatically expire
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            size={"lg"}
            className="flex items-center md:py-8 md:text-xl 
            md:[&_svg:not([class*='size-'])]:size-6"
          >
            <MessageSquarePlus /> Create Room
          </Button>
          <Button
            onClick={() => setIsJoinRoomModalOpen(true)}
            size={"lg"}
            className=" text-[#4f39f6]  bg-[#fdfaff]
            border-solid border-2 border-[#4f39f6] hover:bg-blue-50
            md:py-8  md:text-xl md:[&_svg:not([class*='size-'])]:size-6 "
          >
            <LogIn /> Join Room
          </Button>
        </div>

        <CreateRoomModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
        />
        <JoinRoomModal
          open={isJoinRoomModalOpen}
          onOpenChange={setIsJoinRoomModalOpen}
        />
      </div>
    </div>
  );
};

export default HomePage;

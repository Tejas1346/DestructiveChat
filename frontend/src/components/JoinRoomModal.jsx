import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { socket } from "@/lib/socket";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getRoomByCode } from "@/api/theApi";
import toast, { Toaster } from "react-hot-toast";
const JoinRoomModal = ({ open, onOpenChange }) => {
  const [roomCode, setRoomCode] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!roomCode.trim() || !userName.trim()) return;

    //TODO Join room

    const room = await getRoomByCode(roomCode);
    if (!room) {
      toast.error("No room found", {
        duration: 2000,
      });
      return;
    }
    console.log(roomCode);
    sessionStorage.setItem("userName", userName);

    navigate(`/chat/${roomCode}`);

    setRoomCode("");
    setUserName("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Toaster />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Join Room</DialogTitle>
        </DialogHeader>
        <hr />
        <div>
          <label className="text-slate-600">Room Code</label>
          <Input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="md:text-2xl py-6 mt-2 text-center text-bold"
          />
        </div>
        <div>
          <label>Your Name</label>
          <Input
            className="md:text-lg mt-2 py-5"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="border-solid border-2 rounded-md p-4 bg-blue-50 border-blue-200">
          <p className="text-blue-800 text-lg">
            Ask the room creator to share their Room Code with you.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 lg:p-6 lg:text-xl">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="flex-1 lg:p-6 lg:text-xl">
            Join Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoomModal;

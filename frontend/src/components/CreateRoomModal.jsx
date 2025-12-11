import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const CreateRoomModal = ({ open, onOpenChange }) => {
  const durations = [
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "120", label: "2 hour" },
  ];
  const [roomName, setRoomName] = useState("");
  const [selDuration, setSelDuration] = useState("30");
  const handleSubmit = () => {
    if (roomName.trim() === "") return;

    //Create Room

    setRoomName("");
    setSelDuration("30");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className="min-w-4xl w-auto overflow-auto"
    >
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg">Create New Room</DialogTitle>
        </DialogHeader>
        <hr />
        <div>
          <label className="text-slate-600 ">Room Name</label>
          <Input
            className="mt-1 md:py-5 md:text-lg "
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-slate-600">Room Duration</label>
          <div className="grid grid-cols-2 mt-2 gap-2">
            {durations.map((duration) => (
              <Button
                key={duration.value}
                variant="outline"
                onClick={() => setSelDuration(duration.value)}
                className={
                  selDuration === duration.value
                    ? "border-2 py-6 text-md border-indigo-600 text-indigo-600 bg-indigo-50 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50"
                    : "py-6 text-md border-2 "
                }
              >
                {duration.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="bg-amber-100 p-3 rounded-lg">
          <p className="text-amber-800 text-lg">
            The room will automatically expire after 30 mins.All messages will
            be lost after that
          </p>
        </div>
        <DialogFooter className="flex w-full justify-around">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 lg:p-6 lg:text-lg">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="flex-1 lg:p-6 lg:text-lg">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;

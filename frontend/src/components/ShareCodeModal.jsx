import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { useParams } from "react-router-dom";

const ShareCodeModal = ({ open, onOpenChange }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { roomCode } = useParams();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Share Room Code</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="flex-1 text-center md:text-2xl text-lg bg-blue-100 py-3 border-2 border-blue-500 rounded-lg md:py-4`">
            {roomCode}
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(roomCode);
              setIsClicked(true);
              setTimeout(() => {
                setIsClicked(false);
              }, 1500);
            }}
            className="md:py-8 py-6 has-[>svg]:px-5 md:[&_svg:not([class*='size-'])]:size-6"
          >
            {isClicked ? <Check /> : <Copy />}
          </Button>
        </div>
        {isClicked ? (
          <div className="flex items-center gap-1 justify-center animate-in">
            <Check color="#7f22fe"/>
            <p className="text-center text-indigo-600 text-lg md:text-xl">
               Copied to clipboard
            </p>
          </div>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareCodeModal;

import { Clock, LogOut, Send, Share2, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageComponent from "@/components/MessageComponent";
import { socket } from "@/lib/socket";
import axiosInstance from "@/api/axiosInstance";
import { getMessagesByRoom, getRoomByCode } from "@/api/theApi";
import ShareCodeModal from "@/components/ShareCodeModal";
import toast, { Toaster } from "react-hot-toast";
const ChatPage = () => {
  const { roomCode } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId,setUserId]=useState(null);
  const [roomData, setRoomData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const userIdRef = useRef(null);
  const roomDataRef = useRef(null);
  const [isShareCodeOpen,setIsShareCodeOpen]=useState(false);
  const navigate = useNavigate();

  //Send Message
  const sendMessage = async () => {
    const room = roomData;

    socket.emit("send-message", {
      roomId: room.id,
      text: text,
      senderId: userId,
      userName: userName,
    });
    console.log(userId);
    setText("");
  };

  //Leave Room
  const leaveRoom = async () => {
    const room = roomData;
    socket.emit("leave-room", {
      roomId: room.id,
      userId: userId,
    });
    
    navigate("/");
  };

  //load the page
  useEffect(() => {
    const loadRoomData = async () => {
      try {
        const room = await getRoomByCode(roomCode);
        //Throw an error if no room
        if (!room) {
          throw new Error("Room Not Found");
        }
        setRoomData(room);
        roomDataRef.current = room;
        setTimeLeft(room.ttl);
        const userName = sessionStorage.getItem("userName");

        //accessing the link directly
        if (!userName) {
          navigate("/");
          return;
        }
        setUserName(userName);
        // Fetch message history
        const messages = await getMessagesByRoom(room.id);
        setMessages(messages);
        const existingUserId=sessionStorage.getItem('userId')||"";

        socket.once("user-joined", ({ userId }) => {
         
          setUserId(userId); 
          userIdRef.current = userId; 
          sessionStorage.setItem("userId", userId); 
        });


        socket.emit("join-room", {
          roomId: room.id,
          userName: userName,
          existingUserId:existingUserId
        });
        
        
        // if(!existingUserId) sessionStorage.setItem('userId',userId); 
      } catch (error) {
        console.error("Error in loading room:", error.message);
        navigate("/");
      }
    };

    loadRoomData();
    // Leaves the room when component is dismounted
    return () => {
      const room = roomDataRef.current;
      // No room bug
      // Check if the room exists as the user may go to a invalid room and it needs room
      if (room) {
        
        socket.emit("leave-room", {
          roomId: room.id,
          userId: userId,
        });
        
      }
    };
  }, []);

  // whenever someone sends a message update the messages
  useEffect(() => {
    //add listener when component mounts
    socket.on("recieve-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("room-joined",({user})=>{
      console.log(user);
      toast(`${user.name} joined`,{
        style:{
          color:'#28a745'
        }
      })
    })


    socket.on("room-left",({user})=>{
      toast(`${user.name} left`,{
        style:{
          color:"#991b1b"
        }
      })
    })
    //removes the listener
    return () => {
      socket.off("recieve-message");
      socket.off("room-joined");
      socket.off("room-left");
    };
  }, []);

  //roomData in dependency array to make sure roomData is set
  useEffect(() => {
    if (!roomData) return;

    const updateTimer = () => {
      const now = Date.now();
      const expiresAt = roomData.expiresAt;
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000));

      setTimeLeft(remaining);

      // Redirect when time expires
      if (remaining <= 0) {
        alert("Room has expired!");
        socket.emit("leave-room", {
          roomId: roomData.id,
          userId: userId,
        });
        navigate("/");
      }
    };

    // Reset the timer every second
    // updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [roomData]);

  //Format the time
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full bg-slate-200 ">
      <div className="max-w-7xl border-2 border-slate-100 mx-auto h-screen bg-slate-100 flex flex-col">
        {/* Header */}
        <header className="w-full border-2 rounded-md border-slate-50 flex flex-col md:flex-row md:items-center justify-between p-3 bg-white">
          <div className="p-3 pb-1 ">
            <h2 className="md:text-2xl text-indigo-700 text-xl">{roomDataRef.current?roomDataRef.current.name:"Room"}</h2>
            <div className="flex items-center py-3 gap-4">
              <div className="flex items-center gap-2">
                <Users />
                <span className="text-sm md:text-lg">You As {userName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock />
                <span className="text-sm md:text-lg">
                  Expires in {hours}:{minutes}:{seconds}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center ">
            <Button onClick={()=>setIsShareCodeOpen(true)} className="md:py-7 py-2 flex-1  md:text-xl md:[&_svg:not([class*='size-'])]:size-5.5 ">
              <Share2 /> Share Code
            </Button>
            <Button
              onClick={leaveRoom}
              variant={"outline"}
              className="md:py-7 py-2 flex-1 md:text-xl text-slate-700 md:[&_svg:not([class*='size-'])]:size-5.5"
            >
              <LogOut /> Leave Room
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 ">
          <Toaster />
          {messages.map((msg) => (
            <MessageComponent
              key={msg.id}
              message={msg}
              isSent={msg.senderId === userId}
            />
          ))}
        </main>
          
        <footer className="p-4 pb-4 px-6 bg-white border border-slate-200 ">
          <div className="flex items-center gap-2 bg-slate-100 ">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="py-5 md:py-6 md:text-xl flex-1"
            />
            <Button
              onClick={sendMessage}
              className="py-5.5 md:py-6.5 md:text-lg md:[&_svg:not([class*='size-'])]:size-5 md:has-[>svg]:px-4 "
            >
              <Send /> Send
            </Button>
          </div>
          <p className="text-center mt-2 text-sm md:text-lg text-slate-500">
            Messages self destruct along with the room
          </p>
        </footer>
      </div>
      <ShareCodeModal open={isShareCodeOpen} onOpenChange={setIsShareCodeOpen}/>
    </div>
  );
};

export default ChatPage;

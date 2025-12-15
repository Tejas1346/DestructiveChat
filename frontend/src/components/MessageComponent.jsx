import React from "react";

const MessageComponent = ({ isSent, message }) => {
  const timestamp = new Date(message.createdAt);
  const time = timestamp.toLocaleString([],{
    hour:"2-digit",
    minute:"2-digit"
  })
  if (isSent) {
    return (
      <div className="flex flex-col w-full mt-3 items-end  ">
        <p className="text-sm md:text-xl px-4 bg-indigo-500 text-white p-3 rounded-xl w-fit  max-w-[70%] sm:max-w-[60%]">
          {message.text}
        </p>
        <p className="text-sm md:text-lg px-2 mt-1 text-slate-600">
          {time}
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full mt-3 ">
        <p className="text-slate-600 px-2 text-sm md:text-lg max-w-[40%] w-fit">
          {message.userName}
        </p>
        <p className="text-sm md:text-xl p-3 px-5 mt-1 bg-white rounded-xl w-fit max-w-[60%] ">
          {message.text}
        </p>
        <p className="text-sm md:text-lg px-3 mt-1 text-slate-600">
          {time}
        </p>
      </div>
    );
  }
};

export default MessageComponent;

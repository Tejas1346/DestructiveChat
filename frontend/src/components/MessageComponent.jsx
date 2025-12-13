import React from "react";

const MessageComponent = ({ isSent,message }) => {
  if (isSent) {
    return (
      <div className="flex flex-col w-full mt-3 items-end  ">
        <p className="text-sm md:text-lg bg-indigo-500 text-white p-3 rounded-xl w-fit  max-w-[70%] sm:max-w-[60%]">{message.text}</p>
        <p className="text-sm md:text-lg px-2 mt-1 text-slate-600">{message.createdAt}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full mt-3 ">
        <p className="text-slate-600 px-2 text-sm md:text-lg max-w-[40%] w-fit">
          {message.userName}
        </p>
        <p className="text-sm md:text-lg p-3 mt-1 bg-white rounded-xl w-fit max-w-[60%] ">
          {message.text}
        </p>
        <p className="text-sm md:text-lg px-2 mt-1 text-slate-600">{message.createdAt}</p>
      </div>
    );
  }
};

export default MessageComponent;

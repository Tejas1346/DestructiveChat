import axiosInstance from "./axiosInstance";

export const createRoom = async ({ name, ttl }) => {
  try {
    const response = await axiosInstance.post("/rooms", { name, ttl });
    return response.data
  } catch (error) {
    console.log("Error in creating room",error.message);
  }
};

export const getRoomByCode = async(roomCode)=>{
  try {
    console.log(roomCode);
    const response = await axiosInstance.get(`/rooms/${roomCode}`);
    return response.data;
  } catch (error) {
    console.log("Error in getting room by code",error.message);
  }
}

export const getMessagesByRoom = async(roomId)=>{
  try {
    const response = await axiosInstance.get(`/messages/${roomId}`);
    return response.data;
  } catch (error) {
    console.log("Error in getMessagesByRoom",error.message);
  }
}

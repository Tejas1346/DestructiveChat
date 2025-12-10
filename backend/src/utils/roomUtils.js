export const getRemainingTTL =(room)=>{
    const ttl = room.ttl;
    if(!ttl) return 0;
    return Math.floor((room.expiresAt-Date.now())/1000);
}
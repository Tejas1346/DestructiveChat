import NodeCache from "node-cache";

export const roomStore = new NodeCache({
    stdTTL:3600,
    checkPeriod:10,
    useClones:false,
    
})
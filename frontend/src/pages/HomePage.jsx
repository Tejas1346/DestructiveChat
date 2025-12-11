import CreateRoomModal from '@/components/CreateRoomModal'
import { Button } from '@/components/ui/button'
import { Dialog } from '@radix-ui/react-dialog'
import { LogIn, MessageSquarePlus } from 'lucide-react'
import React, { useState } from 'react'

const HomePage = () => {
  const [isCreateModalOpen,setIsCreateModalOpen]=useState(false)
  return (
    <div className='px-6'>

        <div className='text-center mb-8'>
            <h1 className='text-3xl lg:text-6xl mb-6 text-indigo-600'>Self-Destructing Chat Rooms</h1>
            <p className='text-slate-600 text-lg lg:text-2xl'>Create or join temporary chat rooms that automatically expire</p>
        </div>

        <div className='flex items-center justify-center gap-5'>
            <Button onClick={()=>setIsCreateModalOpen(true)} size={'lg'}  className="flex items-center lg:py-8 lg:text-xl 
            lg:[&_svg:not([class*='size-'])]:size-6">
               <MessageSquarePlus/> Create Room</Button>
            <Button size={'lg'}  className=" text-[#4f39f6]  bg-[#fdfaff]
            border-solid border-2 border-[#4f39f6] hover:bg-blue-50
            lg:py-8 lg:text-xl lg:[&_svg:not([class*='size-'])]:size-6 ">
               <LogIn/> Join Room</Button>
        </div>

        <CreateRoomModal
          open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}
        />
    </div>
  )
}

export default HomePage
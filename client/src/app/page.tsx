import React from 'react';
import MusicPlayer from '@/components/player/MusicPlayer';

const Page: React.FC = () => {
  return (
      <div className="h-screen w-full flex flex-col justify-between text-white">
        <p>Welcome Back</p> 
        <MusicPlayer />
      </div>
  )
}

export default Page;
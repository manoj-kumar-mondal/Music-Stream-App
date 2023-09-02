import React from 'react';
import Image from 'next/image';
import {
	BsFillVolumeDownFill,
	BsFillVolumeUpFill,
	BsFillVolumeMuteFill,
} from 'react-icons/bs';
import { PiQueueFill } from 'react-icons/pi';
import SongController from './SongController'
import Slider from './Slider'

const MusicPlayer: React.FC = () => {
	return (
		<div className="w-full p-3 flex justify-between items-center bg-black text-white">
			<div className="w-[22%] flex items-center p-2 space-x-2">
        <Image 
          src="/images/music.jpg"
          alt="Song"
          width={56}
          height={0}
          className="h-full w-14"
        />
        <div className="flex px-2 flex-col text-sm">
          <h1 className="font-semibold text-gray-500">Apna Bana Le Piya</h1>
          <p className="text-gray-300 text-xs font-light">Arijit Singh</p>
        </div>
			</div>

			<SongController />

      <div className="w-[22%] h-full px-4 flex items-center">
        <div className="w-full flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-100 hover:scale-105">
            <PiQueueFill className="text-2xl"/>
          </button>
          <div className="flex items-center w-2/3 space-x-2">
            <button className="text-gray-400 hover:text-gray-100 hover:scale-105">
              <BsFillVolumeUpFill className="text-xl"/>
            </button>
            <Slider className="w-full" />
          </div>
        </div>
      </div>
		</div>
	)
}

export default MusicPlayer
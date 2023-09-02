'use client'

import React, { useState } from 'react';
import {
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
	BsFillPlayCircleFill,
	BsFillPauseCircleFill
} from 'react-icons/bs';
import Slider from './Slider';

const SongController: React.FC = () => {
	const [buttonPressed, setButtonPressed] = useState(false);

	const handleClick = () => {
		setButtonPressed(state => !state);
	}

	return (
		<div className="flex flex-col px-5 py-2 items-center space-y-2 w-1/2 h-full">
			<div className="flex py-2 space-x-6 ">
				<button>
					<BsFillSkipStartCircleFill className="action-btn-1" />
				</button>

				<button onClick={handleClick}>
					{
						buttonPressed ?
						<BsFillPlayCircleFill 
							className="action-btn-2
								active:translate-y-[1px] hover:scale-110 transition" 
						/> :
						<BsFillPauseCircleFill 
							className="action-btn-2
								active:translate-y-[1px] hover:scale-110 transition" 
						/>
					}
				</button>

				<button>
					<BsFillSkipEndCircleFill className="action-btn-1" />
				</button>
			</div>
			<div className="w-full flex items-center justify-center space-x-5">
				<div className="text-xs text-slate-400">
					02:34
				</div>
				<Slider className="w-3/4"/>
				<div className="text-xs text-slate-400">
					7:37
				</div>
			</div>
		</div>
	)
}

export default SongController;
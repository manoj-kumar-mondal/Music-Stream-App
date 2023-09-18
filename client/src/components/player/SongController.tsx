'use client'

import React, { useEffect, useState, useRef } from 'react';
import {
	BsFillSkipStartCircleFill,
	BsFillSkipEndCircleFill,
	BsFillPlayCircleFill,
	BsFillPauseCircleFill
} from 'react-icons/bs';
import Slider from './Slider';
import { useAppDispatch } from '@/redux/hooks';
import { actionDownloadSong } from '@/redux/actions/stream.action';
// import { getSong } from '@/redux/actions/stream.action';

const SongController: React.FC = () => {
	const [buttonPressed, setButtonPressed] = useState(false);
	const [state, setState] = useState(false);
	const ref = useRef<HTMLAudioElement | null>(null);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		setButtonPressed(state => !state);
		ref.current?.play();
	}

	const handlePrevClick = () => {
		// dispatch(actionDownloadSong('sdifbdsoibf'));
	}

	const handleNextClick = () => {
		setState(curr => !curr);
	}

	// useEffect(() => {
	// 	ref.current = new Audio('http://localhost:4000/stream/download/kuchv');
	// 	console.log(ref.current);
	// 	// console.log(ref.current.);
		
	// 	return () => {
	// 		ref.current = null
	// 	}

	// }, [state]);

	return (
		<div className="flex flex-col px-5 py-2 items-center space-y-2 w-1/2 h-full">
			<div className="flex py-2 space-x-6 ">
				<button onClick={handlePrevClick}>
					<BsFillSkipStartCircleFill className="action-btn-1" />
				</button>

				<button onClick={handleClick}>
					{
						buttonPressed ?
						<BsFillPauseCircleFill 
							className="action-btn-2
								active:translate-y-[1px] hover:scale-110 transition" 
						/> :
						<BsFillPlayCircleFill 
							className="action-btn-2
								active:translate-y-[1px] hover:scale-110 transition" 
						/>
					}
				</button>

				<button onClick={handleNextClick}>
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
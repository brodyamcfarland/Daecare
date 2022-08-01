import { useState, useRef, useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillFastBackward, AiFillFastForward } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import {songs} from '../components/SongList';

const AudioPlayer = () => {
    // state
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0); //below slider
    const [currentTime, setCurrentTime] = useState<number>(0); //above slider
    const [currentTrack, setCurrentTrack] = useState<any>(songs[0]);

    // references
    const audioPlayer = useRef<any>();   // reference our audio component
    const progressBar = useRef<any>();   // reference our progress bar
    const animationRef = useRef<any>();  // reference the animation

    useEffect(() => {
        if(isPlaying === true) {
            audioPlayer.current.play();
            changeRange();
            setCurrentTime(0);
        }
    },[currentTrack])

    useEffect(() => {
        if (audioPlayer.current !== undefined, progressBar.current !== undefined) {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        }
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backTen = () => {
        progressBar.current.value = Number(progressBar.current.value) - 10;
        changeRange();
    }

    const forwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value) + 10;
        changeRange();
    }

    const nextSong = () => {
        const index = songs.findIndex(x=>x.title == currentTrack.title);
        if (index == songs.length - 1)
        {
        progressBar.current.value = 0;
        setCurrentTrack(songs[0])
        }
        else
        {
        setCurrentTrack(songs[index + 1])
        }
        changeRange();
        setCurrentTime(0);
    }

    const prevSong = () => {
        const index = songs.findIndex(x => x.title === currentTrack.title);
        if (index === 0) {
            setCurrentTrack(songs[songs.length - 1]);
        } else {
            setCurrentTrack(songs[index - 1]);
        }
        changeRange();
    }

  return (
    <div className='mt-3 pt-4 bg-gradient-to-b from-gray-900 to-[#000000] max-w-[30rem] items-center justify-center m-auto border-[1px] rounded-2xl'>
        <audio ref={audioPlayer} src={currentTrack.mp3} preload="metadata"></audio>
        <div className='flex flex-row items-center justify-center gap-8'>
            <button className='text-[10px]' onClick={prevSong}><BiSkipPrevious className='text-[2.2rem] border-[3px] border-gray-900 bg-black rounded-full hover:bg-gray-700 duration-700'/> Back</button>
            <button className='text-[10px]' onClick={backTen}><AiFillFastBackward className='text-[2.5rem] border-[3px] border-gray-900 bg-black rounded-full hover:bg-gray-700 duration-700'/> Reverse</button>
            <button onClick={togglePlayPause} className='p-4 text-[2rem] rounded-full border-[3px] border-gray-900 bg-black hover:bg-gray-700 duration-700'>
            {isPlaying ? <FaPause className='fill-red-600'/> : <FaPlay className='fill-green-600' />}
            </button>
            <button className='text-[10px]' onClick={forwardTen}><AiFillFastForward className='text-[2.5rem] border-[3px] border-gray-900 bg-black rounded-full hover:bg-gray-700 duration-700'/> Forward</button>
            <button className='text-[10px]' onClick={nextSong}><BiSkipNext className='text-[2.2rem] border-[3px] border-gray-900 bg-black rounded-full hover:bg-gray-700 duration-700'/> Next</button>
        </div>

        {/* current time */}
        <div className='text-[13px] text-gray-400 pt-4'>{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div>
            <input type="range" step='0.001' className='bg-black' defaultValue="0" ref={progressBar} onChange={changeRange}/>
        </div>

        {/* duration */}
        <div className='text-[15px]'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        <div className='pt-4'>{currentTrack.title}</div>
        <div>{currentTrack.artist}</div>
        <div className='flex flex-row gap-3 justify-left pl-10 ml-10 text-[.7rem] pt-10'>
            <span className='min-w-[3rem] '>Song</span>
            <span className='min-w-[5rem] pl-12'>Album</span>
        </div>
        <div className='p-3 text-left'>
            {songs.map((song, index) => (
                    <div className='bg-[#13314d] hover:bg-[#0a1a29] duration-500 hover:opacity-100 opacity-70 shadow-inset justify-left flex flex-row gap-5 p-2 border-[1px] rounded-xl mb-3 hover:cursor-pointer' key={index}
                                    onClick={() => setCurrentTrack(songs[index])}>
                        <ul className='min-w-[3rem]'>{songs[index].artwork}</ul>
                        <ul className='min-w-[5rem]'>{songs[index].title}</ul>
                        <ul>{songs[index].album}</ul>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default AudioPlayer
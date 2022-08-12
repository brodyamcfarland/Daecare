import { useState, useRef, useEffect } from 'react';
import {songs} from '../components/SongList';

const AudioPlayer = () => {
    // state
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0); //below slider
    const [currentTime, setCurrentTime] = useState<number>(0); //above slider
    const [currentTrack, setCurrentTrack] = useState<any>(songs[0]);
    const [menuToggle, setMenuToggle] = useState<boolean>(false);

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
        if (audioPlayer.current !== undefined && null, progressBar.current !== undefined && null) {
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

    const nextSong = () => {
        const index = songs.findIndex(x => x.title == currentTrack.title);
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

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    }

  return (
    <div className='z-50 bg-ipod bg-no-repeat bg-contain bg-center mt-3 pt-4 max-w-[30rem] h-[52.5rem] items-center justify-center m-auto rounded-2xl'>
        <audio ref={audioPlayer} src={currentTrack.mp3} preload="metadata"/>
        {(menuToggle) ? (
            <div className='relative w-[25.5rem] h-[19.5rem] top-5 m-auto'>
                <div className='flex flex-row gap-6 justify-left pl-[4rem] text-[.7rem]'>
                    <span className='min-w-[3rem] '>Song</span>
                    <span className='min-w-[5rem] pl-12'>Album</span>
                </div>
                <div className='text-left h-[18.2rem] overflow-y-auto no-scrollbar'>
                    {songs.map((song, index) => (
                        <div className='bg-[#13314d] hover:bg-[#0a1a29] w-[24rem] duration-500 mb-4 hover:opacity-100 opacity-70 shadow-inset justify-left flex flex-row gap-5 p-2 border-[1px] rounded-xl m-auto hover:cursor-pointer'
                             key={song.id}
                             onClick={() => setCurrentTrack(songs[index])}>
                            <img className='max-w-7 max-h-7 rounded-lg' src={songs[index].artwork}/>
                            <ul className='min-w-[5rem]'>{songs[index].title}</ul>
                            <ul>{songs[index].album}</ul>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className='relative w-[25.5rem] h-[19rem] top-8 m-auto'>
                <img className='max-w-[16rem] max-h-[12rem] m-auto mt-2 object-contain rounded-xl' src={currentTrack.artwork}/>
                <div className='pt-1'>{currentTrack.artist} - {currentTrack.title}</div>
                <div className='text-[13px] text-gray-400 pt-1'>{calculateTime(currentTime)}</div>
                <input type="range" step='0.001' className='bg-black' defaultValue="0" ref={progressBar} onChange={changeRange}/>
            </div>
        )}
        <div className='w-[30rem] h-[24rem] mt-5'>
            <div className='relative'>
                <button className='absolute text-[10px] top-[10.7rem] left-[5.5rem] hover:bg-[#00000013] p-12 rounded-full' onClick={prevSong}/>
                <button onClick={togglePlayPause} className='absolute top-[17.4rem] right-[12rem] p-12 text-[2rem] rounded-full hover:bg-[#00000013]'/>
                <button className='absolute text-[10px] top-[10.7rem] right-[5.5rem] hover:bg-[#00000013] p-12 rounded-full' onClick={nextSong}/>
                <button onClick={toggleMenu} className='absolute top-[4.4rem] right-[12rem] p-12 text-[2rem] rounded-full hover:bg-[#00000013]'/>                
            </div>
        </div>
    </div>
    
  )
}

export default AudioPlayer
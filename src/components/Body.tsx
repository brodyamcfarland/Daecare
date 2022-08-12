import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';
import VideoPlayer from './VideoPlayer';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { RiCellphoneFill } from 'react-icons/ri';
import { FaVideo } from 'react-icons/fa';

const Body = () => {

  const [showAudioPlayer,setShowAudioPlayer] = useState<boolean>(true);
  const [showChatBox,setShowChatBox] = useState<boolean>(false);
  const [showVideoPlayer,setShowVideoPlayer] = useState<boolean>(false);

  const showAudio = () => {
    setShowChatBox(false);
    setShowVideoPlayer(false);
    setShowAudioPlayer(true);
  }

  const showChat = () => {
    setShowVideoPlayer(false);
    setShowAudioPlayer(false);
    setShowChatBox(true);
  }

  const showVideo = () => {
    setShowChatBox(false);
    setShowAudioPlayer(false);
    setShowVideoPlayer(true);
  }

  return (
    <div className='flex flex-col text-center items-center min-h-screen pt-3 select-none'>
        <div className='flex flex-row gap-14'>
          <button className='p-auto rounded-full w-14 h-14 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showAudio}
          >
          <MdOutlineQueueMusic size={25} className='m-auto'/>
          </button>
          <button className='rounded-full w-14 h-14 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showChat}
          >
          <RiCellphoneFill size={25} className='m-auto'/></button>
          <button className='rounded-full w-14 h-14 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showVideo}
          >
          <FaVideo size={25} className='m-auto'/>
          </button>
        </div>
        {showAudioPlayer && (<AudioPlayer />)}
        {showChatBox && (<ChatBox />)}
        {showVideoPlayer && (<VideoPlayer />)}
    </div>
  )
}

export default Body
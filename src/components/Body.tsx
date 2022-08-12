import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';
import VideoPlayer from './VideoPlayer';

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
    <div className='flex flex-col text-center items-center min-h-screen'>
        <div className='flex flex-row gap-8'>
          <button className='p-3 rounded-full px-5 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showAudio}
          >
          Audio
          </button>
          <button className='p-3 rounded-full px-5 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showChat}
          >
          Messenger</button>
          <button className='p-3 rounded-full px-5 bg-blue-800 opacity-50 hover:opacity-100 duration-300'
                  onClick={showVideo}
          >
          Video
          </button>
        </div>
        {showAudioPlayer && (<AudioPlayer />)}
        {showChatBox && (<ChatBox />)}
        {showVideoPlayer && (<VideoPlayer />)}
    </div>
  )
}

export default Body
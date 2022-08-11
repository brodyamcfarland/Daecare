import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';
import VideoPlayer from './VideoPlayer';

const Body = () => {
  return (
    <div className='text-center items-center justify-center m-auto'>     
        <AudioPlayer />
        <ChatBox />
        <VideoPlayer />
    </div>
  )
}

export default Body
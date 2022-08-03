import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';

const Body = () => {
  return (
    <div className='text-center items-center justify-center m-auto'>     
        <AudioPlayer />
        <div className='bg-motorola bg-no-repeat min-h-screen bg-center'>
          <ChatBox />
        </div>
    </div>
  )
}

export default Body
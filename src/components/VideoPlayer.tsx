import ReactPlayer from 'react-player';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { videos } from '../components/VideoList';

const VideoPlayer = () => {

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft = slider!.scrollLeft - 391;
  }

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft = slider!.scrollLeft + 391;
  }

  return (
    <div className="absolute top-0 sm:top-[2rem] md:top-[10rem] z-50 w-[50.5rem] scale-[45%] sm:scale-[60%] md:scale-[100%]">
        <div className='bg-desktop z-50 w-[50.5rem] bg-no-repeat h-[48rem] bg-center items-center justify-center m-auto rounded-2xl'>
            <div className="z-10 w-[24.2rem] relative top-[6%] left-[24.6%]">
                      <div className='z-10 flex flex-row gap-2 overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide' id='slider'>
                        {videos.map((item, id) => (
                            <div key={id} className='w-full h-full'>
                              <ReactPlayer
                                light
                                width='385px'
                                height='270px'
                                url={item.video}
                                playing
                                volume={.1}
                                previewTabIndex={1}
                                controls
                              />
                            </div>
                        ))}
                      </div>
              <div className='flex flex-row px-4 pb-1 justify-between'>
                  <button className='opacity-60 hover:opacity-100 duration-500'>
                    <AiOutlineLeftCircle onClick={slideLeft} size={38}/>
                  </button>
                  <button className='opacity-60 hover:opacity-100 duration-500'>
                    <AiOutlineRightCircle onClick={slideRight} size={38}/>
                  </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default VideoPlayer
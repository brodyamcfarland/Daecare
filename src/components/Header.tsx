import {RiSoundcloudFill} from 'react-icons/ri';
import {GrInstagram} from 'react-icons/gr';
import {MdOutlineMail} from 'react-icons/md';
import LOGO from '../assets/DaecareLogo.png';


const Header = () => {
  return (
    <div>
      <div className='flex-row flex bg-gradient-to-t from-transparent to-[#0f6fff6e] py-3 px-2 shadow-lg'>
          <div className='justify-left flex-1'>
              <img className='text-[1.8rem] w-[15rem] sm:w-[20]' src={LOGO}/>
          </div>
          <div className='flex flex-row pr-3 gap-1 md:gap-10 justify-center items-center opacity-80'>
              <a href='/' target='_blank' className='w-20 h-20 rounded-full hover:bg-[#ff784342] duration-300 scale-[70%] md:scale-[85%]'>
                <RiSoundcloudFill className='mx-auto mt-3 fill-white text-[3.1rem] hover:fill-orange-500 duration-300 '/>
              </a>
              <a href='/' target='_blank' className='w-20 h-20 rounded-full hover:bg-[#ff494948] duration-300 scale-[70%] md:scale-[85%]'>
                <GrInstagram className='mx-auto mt-[1.25rem] fill-white text-[2.5rem] hover:fill-red-500 duration-300 '/>
              </a>
              <a href='/' target='_blank' className='w-20 h-20 rounded-full hover:bg-[#62d2ff2d] duration-300 scale-[70%] md:scale-[85%]'>
                <MdOutlineMail className='mx-auto mt-[1.1rem] fill-white text-[2.8rem] hover:fill-blue-200 duration-300 '/>
              </a>
          </div>
      </div>
    </div>
  )
}

export default Header
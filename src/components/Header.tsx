import React from 'react'
import {RiSoundcloudFill} from 'react-icons/ri'
import {GrInstagram} from 'react-icons/gr'
import {MdOutlineMail} from 'react-icons/md'


const Header = () => {
  return (
    <div className='min-h-[5rem] border-b-[1px]'>
        <div className='flex flex-row justify-left pl-3 sm:justify-center sm:pl-0 pt-4'>
            <span className='text-[1.8rem]'>DaeCare</span>
        </div>
        <div className='absolute flex flex-row top-5 right-10 gap-5 sm:gap-10 justify-center items-center'>
            <a href='/' target='_blank'><RiSoundcloudFill className='fill-white text-[2.5rem] hover:fill-red-500 duration-300'/></a>
            <a href='/' target='_blank'><GrInstagram className='fill-white text-[1.5rem] hover:fill-red-500 duration-300'/></a>
            <a href='/' target='_blank'><MdOutlineMail className='fill-white text-[1.9rem] hover:fill-red-500 duration-300'/></a>
        </div>
    </div>
  )
}

export default Header
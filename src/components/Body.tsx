import React from 'react'
import AudioPlayer from './AudioPlayer'
import ChatBox from './ChatBox'

const Body = () => {
  return (
    <div className='text-center items-center justify-center m-auto'>
        <AudioPlayer />
        <ChatBox />
    </div>
  )
}

export default Body
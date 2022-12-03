import React, { useContext } from 'react'
import Cam from '../image/Cam.png';
import Add from '../image/Add.webp';
import More from '../image/More.png';
import Messages from './Messages';
import Input from './Input'
import { ChatContext } from '../context/ChatContext';

function Chat() {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img className='cam' src={Cam} alt='' />
          <img className='add' src={Add} alt='' />
          <img className='more' src={More} alt='' />
        </div>
      </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat
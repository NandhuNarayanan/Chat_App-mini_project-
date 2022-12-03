import React, { useContext, useState } from 'react';
import Attach from '../image/attach.png';
import AddImg from '../image/AddImg.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {

  const [text , setText] = useState("")
  const [image , setImage] = useState(null)

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

const handleSend = async() =>{

  if (image) {

    const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
         // setErr(true)
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              })
            })
            
          });
        }
      );
    
  }else{
    await updateDoc(doc(db, "chats", data.chatId),{
      messages: arrayUnion({
        id:uuid(),
        text,
        senderId:currentUser.uid,
        date: Timestamp.now(),
      })
    })
  }

  await updateDoc(doc(db, "userChats" , currentUser.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId+ ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats" , data.user.uid),{
    [data.chatId + ".lastMessage"]:{
      text,
    },
    [data.chatId+ ".date"]: serverTimestamp(),
  });


  setText("")
  setImage(null)
}
  return (
    <div className='input'>
      <input type='text' placeholder='Type something...' onChange={e=>setText(e.target.value)} 
      value={text} />
      <div className='send'>
        <img src={Attach} alt=''/>
        <input type='file' style={{display:'none'}} id='file' onChange={e=>setImage(e.target.files[0])} />
        <label htmlFor='file'>

          <img src={AddImg} alt='' />

        </label>
        <button onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default Input
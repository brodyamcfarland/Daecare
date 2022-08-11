import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "@firebase/firestore";
import { db } from "../db/Firebase";
import { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import { ImArrowRight2 } from 'react-icons/im';

const ChatBox = () => {
    //States
    const [input, setInput] = useState<string>("");
    const [name, setName] = useState<string>('');
    const [posts, setPosts] = useState<Array<any>>([]);
 
    //Send Post
    const sendPost = async (event: any) => {
        if (input.length > 0) {
          event.preventDefault();
          resetInputs();
          await addDoc(collection(db, "messages"), {
              Name: name,
              text: input,
              timestamp: serverTimestamp(),
          })
        }
    };

    //clear inputs
    const resetInputs = () => {
      setInput('');
      setName('');
    }

    //UseEffect
    useEffect(
      () =>
        onSnapshot(
          query(collection(db, "messages"), orderBy("timestamp", "desc")),
          (snapshot:any) => {
            setPosts(snapshot.docs);
          }
          
        ),
      [db]
    );

  return (
    <div className='bg-motorola bg-no-repeat min-h-screen bg-center'>
      <div className="relative max-w-[23.3rem] min-h-[28rem] m-auto rounded-2xl top-[20.2rem] right-[1px] select-none">
          <div className="border-b-[1px] h-[24rem] max-h-[30rem] overflow-y-auto no-scrollbar">
          {posts.map((post) => (  
                <ChatMessages
                  key={post.postId}
                  post={post.data()}/>
          ))}
          </div>
          <div className="flex flex-row p-3 min-h-[3rem] rounded-2xl">
              <input className="bg-gray-800 pl-2 max-w-[6.5rem] border active:border duration-500 rounded-tl-2xl rounded-bl-2xl opacity-70 focus:opacity-100"
                    placeholder="Enter Name"
                    onChange={(e)=> setName(e.target.value)}/>
              <input className="bg-gray-900 max-h-[6rem] flex-grow active:border duration-500 pl-2 border opacity-70 focus:opacity-100"
                        value={input}
                        onChange={(e)=> setInput(e.target.value)}
                        placeholder='Say something...'
                        maxLength={180}/>
              <br/>
              <button className="h-10 w-10 hover:bg-green-800 duration-500 border-[1px] active:border pr-1 rounded-tr-2xl rounded-br-2xl pl-2"
                      onClick={sendPost}><ImArrowRight2 className=""/></button>
          </div>
      </div>
    </div>
  )
}

export default ChatBox;
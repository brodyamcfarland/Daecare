import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../db/Firebase";
import { useState } from "react";

const ChatBox = () => {
    //States
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
 
    //Send Post
    const sendPost = async (event: any) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        const docRef = await addDoc(collection(db, "messages"), {
            Name: name,
            text: input,
            timestamp: serverTimestamp(),
        }
    )};

  return (
    <div className="mt-4 max-w-[30rem] min-h-[40rem] m-auto border rounded-2xl">
        <header className="pt-2 pb-2 border-b-[1px]">Message Board</header>
        <div className="border-b-[1px] min-h-[30rem]">Messages will show here</div>
        <form className="flex p-3">
            <input className="max-h-[2rem] rounded-xl bg-gray-800 pl-2 mr-1"
                   placeholder="Enter Name"
                   onChange={(e)=> setName(e.target.value)}/>
            <textarea className="bg-gray-900 min-h-[6rem] flex-grow rounded-2xl active:border duration-500 pl-2"
                      value={input}
                      onChange={(e)=> setInput(e.target.value)}
                      placeholder='Say something to Davey'
                      maxLength={180}/>
            <br/>
            <button className="rounded-full border ml-3 pb-1.5 h-7 w-7 hover:bg-green-800 duration-500"
                    onClick={sendPost}> + </button>
        </form>
    </div>
  )
}

export default ChatBox;
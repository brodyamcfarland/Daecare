interface Props {
    post: any;
}


const ChatMessages = ({post}: Props) => {
    //Slice this up to show full timestamp
    const convertTimeStamp = post?.timestamp?.toDate().toLocaleDateString();

  return (
    <>
        <div className="text-left pl-3 text-[12px]">{(post.Name.length === 0) ? ("Anonymous"):(post.Name)}</div>
        <div className="flex flex-row border-[1px] min-h-[3rem] rounded-2xl m-2 bg-[#0d0e53] opacity-70 hover:opacity-100 duration-200 pl-3 items-center">
            <div className="">{post.text}</div>
        </div>
        <div className="text-right pr-3 text-[10px]">{convertTimeStamp}</div>
    </>
  )
}

export default ChatMessages
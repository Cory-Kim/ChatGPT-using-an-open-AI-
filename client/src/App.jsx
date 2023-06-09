import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { fetchResponse } from './api';


function App()
{

  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () =>
    {
      return fetchResponse(chat);
    },
    onSuccess: (data) => console.log(data)
  })

  const sendMessage = async (message) =>
  {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  }

  return (
    <div className='bg-[#071526] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle' >
      {/* gradient */}
      <div className='gradient-01 z-0 absolute'></div>
      <div className='gradient-02 z-0 absolute'></div>

      {/* Header */}
      <div className='uppercase font-bold text-2xl text-center mb-3'>ChatGPT</div>

      {/* Body */}
      <div className='h-[90%] overflow w-full max-w-4xl min-w-[20rem] py-8 self-center px-4'>
        <ChatBody chat={chat} />
      </div>

      {/* Input */}
      <div className='w-full max-w-4xl min-w-[20rem] self-center'>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default App

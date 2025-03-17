import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
function App()
{
  const [input, setInput]= useState('')
  const [chat, setChat]= useState([])
  const API_KEY= import.meta.env.VITE_GEMINI_API_KEY
  const handleInput = async () => 
  {
    try
    {
      const genAI = new GoogleGenerativeAI(API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = input;
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setChat([...chat, 
        {
          userText: input,
          aiText: result.response.text(),
        }, 
      ])
      setInput(' ')
    }  
    catch (err)
    {
      console.log(err)
    }
  }
  return (
  <div className=" relative-h-screen flex flex-col justify-center items-center">
    <div className=" absolute inset-0">
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>
    <div className="chat h-3/4">
      {
        chat.map((val, i)=>(
          <div key={i}>
          <h2 className="text-2xl text-gray-500">{val.userText}</h2>
          <p className="text-blue-500 text-justify">{val.aiText}</p>
          </div>
        ))
      }
    </div>
    <div className="input fixed bottom-0 my-5">
    <input onChange={(e)=>setInput(e.target.value)} className="text-3xl rounded-2xl border border-blue-700 py-5" type="text" value={input} placeholder="Ask Me Something" />
    <button onClick={handleInput} className="bg-blue-700 text-white ms-2 p-5 text-center text-2xl rounded-4xl"> Send </button>
    <button onClick={()=>setChat([])} className="bg-blue-700 text-white ms-2 p-5 text-center text-2xl rounded-4xl"> Clear </button>
    </div>
  </div>
  )
}
export default App;
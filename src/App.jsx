import React,{useState,useCallback,useEffect,useRef} from 'react'

export default function App() {
  const[length,setLength]=useState(8)
  const[number ,setNumber]=useState(false)
  const[char,setChar]=useState(false)
  const[password,setPasword]=useState("")
//password generating code
  const passwordGenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(number) str +="0123456789"
if(char) str+="!@#$%^&*(){}[]-+="
for (let i = 1; i <= length; i++) {
  let char=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
}
setPasword(pass)
},[length,number,char,setPasword])
useEffect(()=>{
  passwordGenerator()
},[length,number,char,passwordGenerator])
//copy button code
const passwordRef=useRef(null)
const copyPassToClip=useCallback(()=>{
  passwordRef.current?.select(); //slect the copied text
  passwordRef.current?.setSelectionRange(0,101)  //select numbers of character
  window.navigator.clipboard.writeText(password) //responsible for copy to clipboard
},[password])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray text-xxl' >
      <h1 className='text-center text-white my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input 
    type="text" 
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
    ref={passwordRef} //refernce attribute used in copy code

    />
    <button 
    onClick={copyPassToClip}
    className="bg-violet-500 hover:bg-violet-600 text-white">Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range"
     min={6}
     max={100}
     value={length}
     className='cursor-pointer'
     onChange={(e)=>{setLength(e.target.value)}}
    
     />
     <label >Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input 
      type="checkbox"
     defaultChecked={number}
     id="numberInput"
     onChange={()=>{setNumber(prev=>!prev);
    }}
     />
     <label htmlFor='numberInput'>Number</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input 
      type="checkbox"
     defaultChecked={char}
     id="charInput"
     onChange={()=>{setChar(prev=>!prev);
    }}
     />
     <label htmlFor='charInput'>Character</label>
    </div>
    </div>
    </div>
    

    </>
  )
}

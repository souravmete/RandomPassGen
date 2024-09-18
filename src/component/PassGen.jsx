import React, { useCallback, useEffect } from 'react'

import { useState } from 'react';

export const PassGen = () => {

    const [length,setLength] = useState(0);
    const[numberallowed,setNumberAllowed] = useState(false);
    const[charallowed,setCharAllowed] = useState(false);
    const[password,setpassword] = useState("");

    const[copyAlert,setCopyAlert]=useState(false);
    
//  useCallback helps to memoize functions to optimize performance.
    const password_generator =useCallback(()=>{
      let pass='';
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numberallowed) str +='0123456789';

      if(charallowed)  str += "!@#$%^&*()_+-=[]{}~`";
      
      for(let i=1;i<=length;i++){
        const char = Math.floor(Math.random() * str.length + 1);          
        pass +=str.charAt(char);
      }

      setpassword(pass)

    },[length,numberallowed,charallowed])


    // useEffect runs side effects like data fetching after rendering, 

    useEffect(()=>{

      password_generator();
    },[length,numberallowed,charallowed,password_generator])


    const copyToClipBoard = () => {

      window.navigator.clipboard.writeText(password);
     setCopyAlert(true);
    }


    setTimeout(()=>{
      setCopyAlert(false);
     },6000)


  return (
    <>
    <div className={`w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-white bg-green-600  transition-opacity duration-1000 ease-in-out ${!copyAlert ? 'opacity-0' : 'opacity-100'}`} role="alert">
     <p>Passoword is Copied to Clipboard</p>
    </div> 

      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-orange-500 bg-amber-300">
          <h1 className="text-green-600 text-center">Random Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text"  className="outline-none w-full py-1 px-3" placeholder="password" value={password} readOnly/>
            <button className="outline-none bg-blue-700 text-white px-3 py-0.5 hover:bg-lime-400 hover:text-black" onClick={copyToClipBoard}>Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
             <div className="flex items-center gap-x-1">
              <input type="range" min={0} max={100} value={length} onChange={(e)=>setLength(e.target.value)} className="cursor-pointer"   />
              <label htmlFor="length">Length:{length}</label>
             </div>
             <div className="flex items-center gap-x-1">
              <input type="checkbox"  id="numberallowed" defaultChecked={numberallowed} onChange={(e)=>setNumberAllowed((prev)=>!prev)}/>
              <label htmlFor="numberInput">Numbers</label>
             </div>
             <div className="flex items-center gap-x-1">
              <input type="checkbox" id="charallowed" defaultChecked={charallowed} onChange={(e)=>setCharAllowed((prev)=>!prev)}/>
              <label htmlFor="CharInput">Character</label>
             </div>
          </div>
      </div>    
    </>
    
  )
}

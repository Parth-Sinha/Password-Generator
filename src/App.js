import { useCallback, useEffect, useState, useRef } from 'react';
import '../src/TailwindCss.css';
function App() {
  const [length, setLength] = useState(8);
  const [numericpresent, setNumericPresent] = useState(false);
  const [Characterpresent, setCharacterPresent] = useState(false);
  const maxlen = 100;
  const minlen = 1;
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numericpresent) Alphabets += "0123456789";
    if(Characterpresent) Alphabets += "~`!@#$%^&*()_-+=<>?,./][{}|";
    for(let i = 1; i<= length; i++){
      let character = Alphabets.charAt(Math.floor(Math.random()*(Alphabets.length))+1);
      pass += character;  
    }
    setPassword(pass);
  }, [length, numericpresent, Characterpresent, setPassword]);
  useEffect(()=>{passwordGenerator()}, [length, numericpresent, Characterpresent, passwordGenerator])

  // UseRef hook
  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password])
  return (
    <>
      <div className='bg-black h-screen flex justify-center'>
          <div className='bg-gray-800 h-fit w-fit mt-10 p-4 rounded-xl'>
            <div className='text-center text-white text-3xl mb-4 shadow-md font-semibold'>
              <h1>Password Generator</h1>
            </div>
            <div className=''>
              <div className='flex'>
                <input ref={passwordRef} readOnly value = {password} className = 'w-full rounded-lg shadow-black text-orange-700'>
                </input>
                <button className='bg-blue-800 rounded-md text-white w-fit py-1 px-2 mx-1' onClick={copyPasswordToClipboard}>Copy</button>
              </div>
              
              <div className='p-3 text-gray-300'>
                <input type='range' name='Length'className='' min = {minlen} max={maxlen} onChange={(e)=> setLength(e.target.value)}></input>
                <label htmlFor = 'Length' className='m-4'>Length : {length}</label>
                <input type='checkbox' name='Number' onChange={()=> setNumericPresent((numericpresent)=>!numericpresent)}/>
                  <label htmlFor="Number" className='m-1' />number  
                  <input type='checkbox' name='Character' onChange={()=> setCharacterPresent((Characterpresent)=>!Characterpresent)}/>
                  <label htmlFor="Character" className='m-1' />Character
              </div>
            </div>
              
          </div>
      </div>
    </>
  );
}

export default App;

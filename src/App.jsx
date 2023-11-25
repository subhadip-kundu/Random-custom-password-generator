import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState('Password');
  const [refresh, setRefresh] = useState(false);


  // useRef hook
  const passwordRef = useRef(null)  

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += '0123456789'
    }

    if (charAllowed) {
      str += "!@#$%&*_+"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed,refresh, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-3xl mx-auto  translate-y-2/3 shadow-md rounded-lg px-8 py-3 my-8 text-orange-500 bg-gray-600 ">
        <h1 className="text-5xl font-bold text-center mb-11 mt-4 text-green-100 ">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 text-2xl font-medium ">
          <input type="text" value={password} ref={passwordRef} className='outline-none w-full py-3 px-4 line-clamp-2' placeholder='Password....' readOnly />
          <button className='outline-none  bg-blue-700 text-white px-5 py-0.5 shrink-0 duration-500 focus:text-blue-600 focus:bg-white' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="flex gap-x-11 mt-10 mb-6 text-lg">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label className='w-16 box-border'>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {
              setnumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={() => {
              setcharAllowed((prev) => !prev)
            }} />
            <label htmlFor="characterInput">Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type='Reset' defaultChecked={refresh} id='refresh' className='h-8 w-20 text- rounded-2xl cursor-pointer bg-red-400 text-yellow-50' onClick={() => {
              setRefresh((prev) => !prev)
            }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

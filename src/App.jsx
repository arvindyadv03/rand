import { useRef } from "react"
import { useState, useCallback, useEffect } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setChar] = useState(false)
  const [password, setPassword] = useState("")

  const passref = useRef(null)
  const passgen = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"

    if (number) {
      str += "0123456789"
    }

    if (character) {
      str += "!@$%&*^_-=+)("
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, number, character, setPassword])

// passgen()

    const copypass = useCallback(()=>{
      let butt = document.getElementById("thisbut")
      passref.current?.select()
      window.navigator.clipboard.writeText(password)
      butt.innerHTML = "Copied"
    },[password])

useEffect(()=>{ passgen()}, [length, number, character, passgen])
  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 text-white bg-gray-800  px-9 py-3">
        <h1 className="text-white font-bold align-middle flex justify-center py-2 text-4xl mb-3">Password Generator  </h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4 gap-3">
          <input className="outline-none w-full py-1 px-3 text-violet-600" type="text" value={password} placeholder="Password" readOnly ref={passref} />
          <button id="thisbut" onClick={copypass} className="outline-none bg-red-700  py-1 px-3 text-white shrink-0">Copy</button>

        </div>
        <div className=" flex items-center gap-x-1">
          <input className="cursor-pointer" type="range" min={6} max={16}
            value={length}
            onChange={(e) => { setLength(e.target.value) }} />
          <label> Length :  {length}</label>


          <div className=" flex items-center gap-x-1">
            <input className="cursor-pointer" type="checkbox" min={6} max={16}
              value={length}
              onChange={() => { setNumber((prev) => !prev) }} />
            <label> Number</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input className="cursor-pointer" type="checkbox" min={6} max={16}
              value={length}
              onChange={() => { setChar((prev) => !prev) }} />
            <label> Character</label>
          </div>
        </div>



      </div>

    </>
  )
}


export default App

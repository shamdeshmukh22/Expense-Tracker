import { useRef , useState } from "react"

export default function IncDec() {
    var[data,setdata]=useState(0);
    var[time,settime]=useState(0);
  const intervalRef = useRef(null);

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        settime(prev => prev + 1);
      }, 1000);
    }
  }

  function stop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

    return (
        <>
        <h1>counter :{data}</h1>
        <button onClick={()=>setdata(data+1)}>increment</button>
        <button onClick={()=> (data>0) && setdata(data-1)}>decrement</button>

        <h1>{time}</h1>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={()=>settime(0)}>reset</button>
        </>
    )
    
}

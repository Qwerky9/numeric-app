import React,{ useState } from 'react';


let EPSILON = 0.01;

function Bisection() {
    const [Xl,setXl] = useState(0);
    const [Xr,setXr] = useState(0);

    const onSetXl = e =>{
        const value = e.target.value;
        setXl(value);
    }

    const onSetXr = e =>{
        const value = e.target.value;
        setXr(value);
    }


  return (
    <div className='bisection'>
        <h1>Bisection</h1>
        <div>
            <label>Function</label>
            <input/>
        </div>
        <div>
            <label>Xl</label>
            <input/>
        </div>
        <div>
            <label>Xr</label>
            <input/>
        </div>
        <div>
            <button>Enter</button>
        </div>
    </div>
  );
}

export default Bisection;

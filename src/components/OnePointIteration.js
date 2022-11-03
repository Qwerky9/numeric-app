import React, { useState } from 'react'

function OnePointIteration() {
  var Parser = require('expr-eval').Parser;
  var fx = 'x';
  var er = 'e';
  var x = 'x';
  
  //input string function
  const [func, setfunc] = useState('')
  const [err, seterr] = useState('')
  const [x1, setx1] = useState('')
  const ansround = []
  const ansx = []
  const ansfx = []
  const anser = []
  const submit = e => {
    e.preventDefault()
    fx = func
    er = err
    x = x1

    let ER = parseFloat(er);
    let X = parseFloat(x);
    Onepoint(fx,ER,X)
  }

  function Onepoint(Func,Err,X){
    
    var parser = new Parser();
    var expr = parser.parse(Func);
    let Er = 100.0

    let xnew = 0
    let i=0
    let t=""
    while(Er>Err){
      ansround.push(i)
      ansx.push(X.toFixed(6))
      let fxx =  expr.evaluate({ x: X })
      xnew = fxx
      Er = Math.abs((xnew-X)/xnew)*100.0
      ansfx.push(fxx.toFixed(6))
      anser.push(Er.toFixed(6))
      X=xnew
      
      t+="Iteration: "+ansround[i]+" |X= "+ansx[i]+", Fx= "+ansfx[i]+", Error="+anser[i]+"%"
      t+="<br/>"
      document.getElementById("ans").innerHTML = t
      i++
      /*console.log("Round:"+i)
      console.log("X="+X+" Fxx="+fxx)
      console.log("Error="+Er)*/
    }
  }
  return (
    <div className='onepointiteration'>
      <h1>One-Point Iteration Method</h1>
      <form onSubmit={submit}>
        <label>Function</label>
            <input type="function" onChange={event => setfunc(event.target.value)} value={func} /><br/><br/>   

            <label>X1</label>
            <input type="x1" onChange={event => setx1(event.target.value)} value={x1} /><br/><br/>    

            <label>Error</label>
            <input type="err" onChange={event => seterr(event.target.value)} value={err} /><br/><br/>   

        <button>submit</button>
      </form><br/><br/>    
      <p id='ans'></p>
    </div>
  );
}

export default OnePointIteration;
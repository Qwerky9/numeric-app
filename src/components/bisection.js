import React,{ useState } from 'react';

function Bisection() {
    var Parser = require('expr-eval').Parser;
    var fx = 'x';
    var er = 'e';
    var l = 'l';
    var r = 'r';


    //input function and stuff
    const [xl,setXl] = useState('')
    const [xr,setXr] = useState('')
    const [func,setFunc] = useState('')
    const [error,setError] = useState('')

    const submit = e =>{
        e.preventDefault()
        fx = func
        er = error
        l = xl
        r = xr

    let ER = parseFloat(er);
    let L = parseFloat(l);
    let R = parseFloat(r);
    Bisec(fx,ER,L,R)
    }
    function Bisec(Func,Err,xl,xr){
        var parser = new Parser();
        var expr = parser.parse(Func);
        let fxl = expr.evaluate({x:xl})
        let fxr =  expr.evaluate({ x: xr })
        let xm = (xl+xr)/2.0;
        let fxm =  expr.evaluate({ x: xm })
        let Er = 100.0;
        if((fxr*fxm)<0){
            xl=xm
        }
        else{ xr=xm }
        let xnew = 0
    let i=0
    while(Er>Err){
      xm = (xl+xr)/2.0;
      fxm =  expr.evaluate({ x: xm })
      fxl =  expr.evaluate({ x: xl })
      fxr =  expr.evaluate({ x: xr })
      if((fxr*fxm)<=0){
        xnew=xl
        xl=xm
      }
      else{ 
        xnew=xr
        xr=xm 
      }
      Er = Math.abs((xm-xnew)/xm)*100.0
      let finalexm = expr.evaluate({x:xm})
      i++
      document.getElementById("r").innerHTML = "Iteration:"+i;
      document.getElementById("xl").innerHTML = "Xl="+xl+", Fxl="+fxl;
      document.getElementById("xr").innerHTML = "Xr="+xr+", Fxr="+fxr;
      document.getElementById("xm").innerHTML = "Xm="+xm+", Fxl="+fxm;
      document.getElementById("er").innerHTML = "Error="+Er+"%";
      document.getElementById("result").innerHTML = "Result="+finalexm;
    }
  }


  return (
    <div className='bisection'>
        <h1>Bisection</h1>
        <form onSubmit={submit}>
            <label>Function</label>
            <input type="function" onChange={event => setFunc(event.target.value)} value={func} /><br/><br/>   

            <label>Xl</label>
            <input type="Xl" onChange={event => setXl(event.target.value)} value={xl} /><br/><br/>   

            <label>Xr</label>
            <input type="Xr" onChange={event => setXr(event.target.value)} value={xr} /><br/><br/>   

            <label>Error</label>
            <input type="error" onChange={event => setError(event.target.value)} value={error} /><br/><br/>   

            <button>submit</button>
        </form><br/><br/>   
      <p id='r'></p>
      <p id='xl'></p>
      <p id='xr'></p>
      <p id='xm'></p>
      <p id='er'></p>
      <p id='result'></p>
    </div>
  );
  }

export default Bisection;

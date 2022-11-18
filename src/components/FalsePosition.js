import React,{ useState } from 'react';
import ApexCharts from 'apexcharts'
const math = require('mathjs');
var xmarray = [];
var iarray = [];


function FalsePosition() {
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

    var xmgraph = xmarray;
    var igraph = iarray;

    var options = { //graph related
        chart: {
          type: 'line',
          width: '750'
        },
        series: [{
          name: "XM_value",
          data: xmgraph
        }],
        xaxis: {
          categories: igraph
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            }, 
            column: {
                colors: ['#f8f8f8', 'transparent'],
            }, 
            xaxis: {
              lines: {
                show: true
              }
            }
          },
          title: {
            text: 'False-position Graph',
            align: 'cebter',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false
        }
      }
      
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render(); //render chart (every time that state change)


    const ansround = []
    const ansxl = []
    const ansfxl = []
    const ansxr = []
    const ansfxr = []
    const ansx1 = []
    const ansfx1 = []
    const anser = []

    const submit = e =>{
        e.preventDefault()
        fx = func
        er = error
        l = xl
        r = xr
        ansround.splice(0)
        ansxl.splice(0)
        ansfxl.splice(0)
        ansxr.splice(0)
        ansfxr.splice(0)
        ansx1.splice(0)
        ansfx1.splice(0)
        anser.splice(0)

    let ER = parseFloat(er);
    let L = parseFloat(l);
    let R = parseFloat(r);
    falsep(fx,ER,L,R)
    }
    function falsep(Func,Err,xl,xr){
        var parser = new Parser();
        var expr = parser.parse(Func);

        let Er = 100.0;
        let xnew = 0
    let i=0
    let t=""
    while(Er>Err){
    let fxl =  expr.evaluate({ x: xl })
    let fxr =  expr.evaluate({ x: xr })
    let x1 =  ((xl*fxr)-(xr*fxl))/(fxr-fxl);
    let fx1 = expr.evaluate({x:x1})
    ansround.push(i)
      ansxl.push(xl.toFixed(6))
      ansfxl.push(fxl.toFixed(6))
      ansxr.push(xr.toFixed(6))
      ansfxr.push(fxr.toFixed(6))
      ansx1.push(x1.toFixed(6))
      ansfx1.push(fx1.toFixed(6))
      if((fxr*fx1)<=0){
        xnew=xl
        xl=x1
      }
      else{ 
        xnew=xr
        xr=x1
      }
      Er = Math.abs((x1-xnew)/x1)*100.0
      xmarray.push(x1.toFixed(6));
      iarray.push(i) //push to store in array (use for render graph)
      anser.push(Er.toFixed(6))
      t += "Iteration: "+ansround[i]+" |Xl= "+ansxl[i]+", Fxl= "+ansfxl[i]+", Xr="+ansxr[i]+", Fxr="+ansfxr[i]+", X1="+ansx1[i]+", Fx1="+ansfx1[i]+", Error="+anser[i]+"%";
      t += "<br>"
      document.getElementById("ans").innerHTML = t;
      i++
    }
  }


  return (
    <div className='falseposition'>
        <h1>False Position</h1>
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
      <p id='ans'></p>
    </div>
  );
  }

export default FalsePosition;

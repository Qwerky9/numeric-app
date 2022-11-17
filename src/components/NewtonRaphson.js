import React, {useState} from 'react'
import { create, all } from 'mathjs'
import ApexCharts from 'apexcharts'
var xarray = [];
var iarray = [];

function NewtonRaphson() {
  var Parser = require('expr-eval').Parser;
  var fx = 'x';
  var er = 'e';
  var x = 'x';
  
  //input string function
  const [func, setfunc] = useState('')
  const [err, seterr] = useState('')
  const [x1, setx1] = useState('')

  var xgraph = xarray;
    var igraph = iarray;

    var options = { //graph related
        chart: {
          type: 'line',
          width: '750'
        },
        series: [{
          name: "X value",
          data: xgraph
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
            text: 'Newton-Raphson Graph',
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
  const ansx = []
  const ansxn = []
  const ansfx = []
  const ansdfx = []
  const anser = []
  const config = { }
  const math = create(all, config)


  const submit = e => {
    e.preventDefault()
    fx = func
    er = err
    x = x1

    let ER = parseFloat(er);
    let X = parseFloat(x);
    iarray.splice(0,iarray.length) //clear array everytime user click calculate
    xarray.splice(0,xarray.length)
    Newtonrap(fx,ER,X)  
  }

  function Newtonrap(Func,Err,X){
    var parser = new Parser();
    var expr = parser.parse(Func);
    let Er = 100.0
    let dfx = math.derivative(Func,'x')
    let xnew = 0
    let i=0
    let t=""
    while(Er>Err){
      ansround.push(i)
      ansx.push(X.toFixed(6))

      let fxx = expr.evaluate({x:X})
      let Dx = dfx.evaluate({x:X})
      xnew = X-(fxx/Dx)
      Er = Math.abs((xnew-X)/xnew)*100.0
      X=xnew
            
      ansfx.push(fxx.toFixed(6))
      ansdfx.push(Dx.toFixed(6))
      ansxn.push(xnew.toFixed(6))
      anser.push(Er.toFixed(6))

      xarray.push(Dx.toFixed(6));
      iarray.push(i) //push to store in array (use for render graph)

      t+="Iteration: "+ansround[i]+" |X= "+ansx[i]+", Fx= "+ansfx[i]+", Dfx= "+ansdfx[i]+", Xnew= "+ansxn[i]+", Error="+anser[i]+"%"
      t+="<br/>"
      document.getElementById("ans").innerHTML = t
      
      i++
      /*console.log("Round:"+i)
      console.log("X="+X+" Fxx="+fxx)
      console.log("Error="+Er)
      console.log(dfx.evaluate({x:X}))*/
    }
  }
  return (
    <div className='newtonraphson'>
      <h1>Newton-Raphson Method</h1>
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
      <p id='chart'></p>
    </div>
  )
}

export default NewtonRaphson;
import React,{ useState } from 'react';
import ApexCharts from 'apexcharts'
import {Table} from 'antd';
var xmarray = [];
var iarray = [];
var dataTable=[]

const columns = [
  {
    title: 'Iteration',
    dataindex: 'iteration',
    key: 'iteration',
  },
  {
    title: 'Xl',
    dataindex: "xl",
    key: "xl",
  },
  {
    title: 'Xr',
    dataindex: "xr",
    key: "xr",
  },
  {
    title: 'X1',
    dataindex: "xm",
    key: "xm",
  },
  {
    title: 'Error',
    dataindex: "er",
    key: "er",
  },
]

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
            text: 'Bisection Graph',
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
    const ansxm = []
    const ansfxm = []
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
        ansxm.splice(0)
        ansfxm.splice(0)
        anser.splice(0)

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
    let t = ""
    while(Er>Err){
      dataTable=[]
      xm = (xl+xr)/2.0;
      fxm =  expr.evaluate({ x: xm })
      fxl =  expr.evaluate({ x: xl })
      fxr =  expr.evaluate({ x: xr })
      ansround.push(i)
      ansxl.push(xl.toFixed(6))
      ansfxl.push(fxl.toFixed(6))
      ansxr.push(xr.toFixed(6))
      ansfxr.push(fxr.toFixed(6))
      ansxm.push(xm.toFixed(6))
      ansfxm.push(fxm.toFixed(6))

      if((fxr*fxm)<=0){
        xnew=xl
        xl=xm
      }
      else{ 
        xnew=xr
        xr=xm 
      }
      xmarray.push(xm.toFixed(6));
      iarray.push(i) //push to store in array (use for render graph)
      Er = Math.abs((xm-xnew)/xm)*100.0
      anser.push(Er.toFixed(6))
      t += "Iteration: "+ansround[i]+" |Xl= "+ansxl[i]+", Fxl= "+ansfxl[i]+", Xr="+ansxr[i]+", Fxr="+ansfxr[i]+", X1="+ansxm[i]+", Fx1="+ansfxm[i]+", Error="+anser[i]+"%";
      t += "<br>"
      document.getElementById("ans").innerHTML = t;
      dataTable = [{
        iteration:i+1,
        xl:fxl,
        xr:fxr,
        xm:fxm,
        er:Er
      }]
      i++
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
        <p id = 'ans'></p>
      <p id = 'chart'></p>
      <Table dataSource={dataTable} columns={columns}/>
    </div>
  );
  }

export default Bisection;

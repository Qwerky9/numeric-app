import React,{ Component } from 'react'
import { useState } from 'react'
const math = require('mathjs');

//refactor code from class component to functional component

const Cramer = () => {
    var Size,detA;
    var array=[];
    var temparray = [];
    var answerarray = [];
    var detresult = []
    var matrix_A = [];
    var matrix_b = [];
    var result = [];
    var detAi = [];

    const [getSize, setSize] = useState('')
    var value,textt //api stuff

    var getValue = e => {//hale input event and pass value to function
        e.preventDefault();
        document.getElementById('matrix').innerHTML = ""//clear matrix each clicks
        Size = getSize
        
        console.log(Size)
        
        createMatrix(Size)
    }

    var getexam = e => {
      e.preventDefault();
      //get index 
      var d = document.getElementById("example")
      value = d.value;
      textt = d.options[d.selectedIndex].text;
      console.log(value)
      console.log(textt)
      //set value from api and set to input form
      if(value!=0) //if option is select get data from api


      //json-server --watch db.json --port xxxxx
      //อย่าลืมเรียก terminal แล้วรัน Server ก่อน
      //ดึงข้อมูลจาก  json server
      {
          fetch('http://localhost:3001/CramerExample') //
          .then(res => {
            console.log(res)
          return res.json(); //check respond
          })
          .then(data => {
          setSize(data[value].getSize)
        })
        .catch(err => console.log(err))
      }
      createMatrix(Size);
    }  

    function createMatrix(Size)
    {
      for(var row=1;row<=Size;row++)
      {
        for(var col=0;col<=Size;col++)
        {
          document.getElementById('matrix').innerHTML += '<input type="text" id="matrix_index_row'+row +'col'+(col+1)+'" name="" placeholder="---" size=3>';
        }
        document.getElementById('matrix').innerHTML += '<br/>'
      }
      document.getElementById('cal_button').innerHTML = ""//create button
      document.getElementById('cal_button').innerHTML += '<button onclick="calculate()">Calculate the matrix</button>'
      document.getElementById('cal_button').onclick = function(){calculate()};//button call calculate function
    }

    function calculate()
    {
      //clear output array
      document.getElementById('outputarray').innerHTML = ""

      //get array input
      for(var row=1;row<=Size;row++)
      {
        for(var col=0;col<=Size;col++)
        {
          var getvalue = parseFloat(document.getElementById('matrix_index_row'+row +'col'+(col+1)).value)
          temparray.push(getvalue) //get input from form then push to array
          console.log(temparray)
        }
        console.log("------")
        console.log(temparray)
        array.push(temparray) //push each row to main array
        temparray = []; // clear small array
      }
      console.log(array)
      //show array as output
      for(var i = 0;i<Size;i++)
      {
        document.getElementById('outputarray').innerHTML += "[ "
        for(var j = 0;j<Size;j++)
        {
            document.getElementById('outputarray').innerHTML += ""+array[i][j]+"a("+(j+1)+") "
        }
        document.getElementById('outputarray').innerHTML += " = " +array[i][Size]+" ] <br/>"
      }
      
        CramerruleCal();
        showoutput();

        array = [];
        answerarray = [];
        result = []
        detresult = [];
        detAi = [];
        matrix_A = []
        matrix_b = [];

    }

    function CramerruleCal()
    {
      //get array vaule
      var temparrayCalc = [];
      var ending_index = parseInt(Size)+1 //get index of last element from each row
      for(var row=1;row<=Size;row++)
      {
        //console.log(ending_index)
        var temp3 = document.getElementById('matrix_index_row'+(row)+'col'+(ending_index)).value //get-push for matrix B
        matrix_b.push(temp3)
        for(var col=0;col<Size;col++)
        {
          console.log("row = "+(row)+"col = "+(col+1));
          var temp2 = document.getElementById('matrix_index_row'+(row)+'col'+(col+1)).value //get-push matrix A
          temparrayCalc.push(temp2)
        }
        matrix_A.push(temparrayCalc)
        temparrayCalc = [];
      }
      detA = math.det(matrix_A);

        let temparr = matrix_A.map(a=>a.slice())
        for(let i=0 ; i<Size ; i++)
        {
          matrix_A = temparr.map(a=>a.slice()) 
          for(let j=0 ; j<Size ; j++)
          {
  
            matrix_A[j][i] = matrix_b[j]
          }
          detAi[i] = math.det(matrix_A);
          detresult[i] = math.det(matrix_A)/detA
          console.log(matrix_A)
        }
        console.log(detAi)
        console.log(detresult)

    }
    function showoutput()
    {
      var ans = ""//another array to store round-up value
      detresult.forEach(arr => result.push(arr.toFixed(6)))
      console.log(result)
      for(var times=0;times<Size;times++)
      {
        ans += "a("+(times+1)+") : "+detAi[times]+"/"+detA+" = "+result[times]+"<br/>"
      }
      document.getElementById('final').innerHTML = ans
      array.splice(0,array.length)
      answerarray.splice(0,answerarray.length)
      detresult.splice(0,detresult.length)
      detAi.splice(0,detAi.length)

    }

    

    
    

    

    return(<body>
        <div>
          <form onSubmit={getValue}>
            <div>
                <h1>&emsp;Cramer's Rule&emsp;</h1>
              <label htmlFor='Size'>&emsp;Size :&emsp;</label>
              <input 
                name='Size'
                placeholder='Ex: 4 for 4x4' 
                value = {getSize}
                onChange={event => setSize(event.target.value)}
                size='8'
              />
               <label htmlFor='example'>&emsp;example :&emsp;</label>
          <select name="example" id="example" onChange={getexam}>
                <option disabled selected value="0">Select โจทย์</option>
                <option value="1">ตัวอย่าง 1</option>
                </select>
            </div>
            <p></p>
            <p>
            <div>
            &emsp;<button>Submit</button>
            </div>
            </p>
            <p id = 'matrix'></p>
            <p id = 'cal_button'></p>
            <p id = 'outputarray'></p>
            <h3><p id = 'final'></p></h3>
          </form>
          </div>
          </body>
    )
}


export default Cramer
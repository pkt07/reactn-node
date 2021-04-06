var https = require('http');
const XLSX = require('xlsx');
var cors = require('cors')
var workbook = XLSX.readFile('./POC.xlsx');


const express = require('express')
const app = express()

app.use(cors())
 
app.get('/province', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var first_sheet_name = workbook.SheetNames[2];
  const dataFromSheet = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name],{defval:""});
    var response={}
    for(i=0;i<dataFromSheet.length;i++){
        
        //console.log(dataFromSheet[i][" Volume "])
       if(response[dataFromSheet[i]["Province"]]==null){
        response[dataFromSheet[i]["Province"]]=0;
       }
        response[dataFromSheet[i]["Province"]]=response[dataFromSheet[i]["Province"]]+dataFromSheet[i][" Volume "]


    }



    var data=[];
 for (var key in response) {
        if (response.hasOwnProperty(key)) {
           
            var tempobj={value:response[key], label:key};
            data.push(tempobj)
        }
    }


  let jsonres = {data}
  console.log(jsonres.data)
  res.write(JSON.stringify(jsonres));
  res.end();
})

 app.get('/city', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var first_sheet_name = workbook.SheetNames[2];
  const dataFromSheet = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name],{defval:""});
    var response={}
    for(i=0;i<dataFromSheet.length;i++){
        
        //console.log(dataFromSheet[i][" Volume "])
       if(response[dataFromSheet[i]["City"]]==null){
        response[dataFromSheet[i]["City"]]=0;
       }
        response[dataFromSheet[i]["City"]]=response[dataFromSheet[i]["City"]]+dataFromSheet[i][" Volume "]

    }
var data=[];
 for (var key in response) {
        if (response.hasOwnProperty(key)) {
           
            var tempobj={value:response[key], label:key};
            data.push(tempobj)
        }
    }
let jsonres = {data}
  console.log(jsonres.data)
  res.write(JSON.stringify(jsonres));
  res.end();
})

  app.get('/industry', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var first_sheet_name = workbook.SheetNames[2];
  const dataFromSheet = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name],{defval:""});
    var response={}
    for(i=0;i<dataFromSheet.length;i++){
        //console.log(dataFromSheet[i][" Volume "])
       if(response[dataFromSheet[i]["Industry"]]==null){
        response[dataFromSheet[i]["Industry"]]=0;
       }
        response[dataFromSheet[i]["Industry"]]=response[dataFromSheet[i]["Industry"]]+dataFromSheet[i][" Volume "]

    }
var data=[];
 for (var key in response) {
        if (response.hasOwnProperty(key)) {
           
            var tempobj={value:response[key], label:key};
            data.push(tempobj)
        }
    }
let jsonres = {data}
  console.log(jsonres.data)
  res.write(JSON.stringify(jsonres));
  res.end();
})

  app.get('/perchaseAmount', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var first_sheet_name = workbook.SheetNames[2];
  const dataFromSheet = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name],{defval:""});
    var response={}
    for(i=0;i<dataFromSheet.length;i++){
        
        //console.log(dataFromSheet[i][" Volume "])
       if(response[dataFromSheet[i]["transactiontimestamp"]]==null){
        response[dataFromSheet[i]["transactiontimestamp"]]=0;
       }
        response[dataFromSheet[i]["transactiontimestamp"]]=response[dataFromSheet[i]["transactiontimestamp"]]+dataFromSheet[i][" Volume "]

    }
var data=[];
let map = new Map();
 for (var key in response) {
  var tempobj={};
  
        if (response.hasOwnProperty(key)) {
           let d = response[key];
           let k = key.split('T')[0];
           let s = map.get(k)==undefined?d:map.get(k)+d;
           console.log(d,k,s)
           //tempobj={value:s, label:k};
           map.set(k,s);
            //data.push(tempobj)
        }
    }
map.forEach( (value, key, map) => {
   let  dat={value:value, label:key};
            data.push(dat) // cucumber: 500 etc
});
let jsonres = {data}
  console.log(jsonres.data)
  res.write(JSON.stringify(jsonres));
  res.end();
})

app.listen(8081)

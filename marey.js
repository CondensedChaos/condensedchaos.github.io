var line0 = new Error().lineNumber -1
var leftMenuBtn = document.getElementById("leftMenuBtn")
var sidNavLeft = document.getElementById("sidNavLeft")
var rightMenuBtn = document.getElementById("rightMenuBtn")
var sidNavRight = document.getElementById("sidNavRight")
var divcontainer = document.getElementById("container")
//var niterationsdiv = document.getElementById("niterationsdiv")
//var addTraindiv = document.getElementById("addTraindiv")
var graphcontrol = document.getElementById("graphcontrol")
var oldnumStations = []
var numStations = []
oldnumStations[0] = Number(document.getElementById("numOfStations0").value) //+1
numStations[0] = oldnumStations[0]
var lines = []
//lines= [[Line0],[Line1]...]
//lines[n] = [numTrainsE,numTrainsW,numTrains]
lines[0] = [1,1,2]
var linesorder = [0]
var sharedStations = 0
var sharedStationsTable = []
sharedStationsTable[0] = {numshared:0,sharedlist:[]}
//sharedStationsTable[0].numshared = 0
//sharedStationsTable[0].sharedlist = []
var numLines = 1
var numCircLines = 0
var numNonCircLines = 1
var cumulativeDistEast = []
cumulativeDistEast[0] = []
var distArray = []
distArray[0] = []
var timeArrayEast = []
timeArrayEast[0] = []
var stopLen
var numIterations
var circ = []
var trainsData = []
var numberOfTrainsE = 1
var numberOfTrainsW = 1
var numberOfSeries = 0
var nextSerie = 0
var stationNames = {}
var xaxisticks = []
trainsData[0] = [] //east trains array
trainsData[1] = [] //west trains array
trainsData[0][0] = null
trainsData[1][0] = null
var recurringdata = []
var sumoftimesarray = []
var options = {
    chart: {
      renderTo: "container",
      animation: false,
      marginLeft: 90,
      backgroundColor: "#000000",
      height : "35%",
      events: {
      load: function() {
          var ch = this;
          zoomButton = ch.renderer.button('Reset zoom', null, null, function() {
            ch.xAxis[0].setExtremes(null, null);
          }, {
            zIndex: 20
          }).attr({
            id: 'resetZoom',
            align: 'right',
            title: 'Reset zoom level 1:1'
          }).add().align({
            align: 'right',
            x: -70,
            y: 2
          }, false, null);
        }
      }
    },
    title: {
        text: 'Marey Chart',
        style: {
          color: '#FFFFFF'
        }
    },
    yAxis: {
    title: {
      text: "",
      offset: 1
    },
    labels: {
      enabled: false
    },
    reversed: true,
    lineWidth: 1,
    gridLineWidth: 0,
    endOnTick: false,
    startOnTick: false,
    plotLines: []
    
  },
  xAxis: {
    title: {
      text: "Time(seconds)",
      style: {
        color: '#FFFFFF'
      }
    },
    labels :{
      style: {
        color: '#FFFFFF'
      }
    },
    tickPositioner: function () {
    //let ticks = this.series[0].yData;
    //let ticks = this.series[0].xData.sort((a,b)=>a-b)
    let tempticks = []
    let ticks = []
    //ticks = this.series[0].xData.sort((a,b)=>a-b)
    for(let i=0;i<options.series.length;i++){
      tempticks[i] = this.series[i].xData.sort((a,b)=>a-b)
      ticks[i] = []
      for(index=0;index<tempticks[i].length;index++){
        //if( index % 2 == 0){
          ticks[i].push(tempticks[i][index])
        //}
      }
    }
    let result = [];
    
    for(let j=0;j<ticks.length;j++){
      for (let index = 0; index < ticks[j].length; index++) {
        let value = ticks[j][index]
        result.push(value);
      }
    }
    result = result.sort((a,b)=>a-b)
    xaxisticks = [...new Set(result)];
    result = []
    
    for(let i=1;i<=xaxisticks.length; i++){
      //if(i<(xaxisticks.length -1)){
        if(Math.abs(xaxisticks[i-1] - xaxisticks[i]) >6 ){
          result.push(xaxisticks[i])
        }
      //}
    }
    
    
    //result = xaxisticks
    return result;
  },
    reversed: false,
    lineWidth: 1,
    gridLineWidth: 0,
    endOnTick: false,
    startOnTick: false,
    //tickPositions:[],
    //minorTicks: true,
    plotLines: []
  },
  tooltip: {
    useHTML : true,
    shared:"true",
    followPointer:"true",
    //headerFormat: stationNames[point.y],
    //pointFormat: '<b>{series.name}</b> time: <b>{point.x}</b>s<br>'
  },
  legend : {
    itemStyle: {
      color: '#FFFFFF'
    },
    labelFormatter: function () {
       return this.name + ' (click to hide)';
    }
  },
  series: [
    //{name:'train1',data:[]},
    //{lineColor: 'red',name:'train2',data: []}
    ]
};
var chart

var cumulativeDistWest = []
cumulativeDistWest[0] = []
var timeArrayWest = []
timeArrayWest[0] = []

window.onload = function () {
 sidNavLeft.style.display = "none";
 sidNavRight.style.display = "none";
 document.getElementById("stationsincommonfield0").style.display = "none"
 document.getElementById("sharedstationsfield").style.display = "none"
 
 
 
  
 
 
 //document.getElementById("numOfStations").addEventListener('change', refreshNumStations);
 //let hideButton1 = document.getElementById("iterationAddButton");
 //hideButton1.style.display = "none";
 //let hideButton2 = document.getElementById("iterationSubstractButton");
 //hideButton2.style.display = "none";
 
 let div2 = document.getElementById("div2")
 div2.style.display = "none";
 
 let circularCheckBox = document.getElementById("circularCheckBox0");
 circular = circularCheckBox.checked;
 
 
 
 if(circular===true){
   //oldnumOfStations = oldnumOfStations + 1
   numStations[0] = numStations[0] + 1
   numCircLines = 1
   numNonCircLines = 0
   const timesDiv = document.getElementById("timesDiv0");
   let newTimeTxt = document.createElement("label");
   let timeTxtLabel = ''.concat( (numOfStations[0]-1)," back to 1 time:")
   newTimeTxt.innerHTML = timeTxtLabel
   newTimeTxt.id = ''.concat( (numOfStations[0]-1) ,"timel0")
   timesDiv.appendChild(newTimeTxt);
   newtxtField = document.createElement("input");
   newtxtField.type = "text"
   newtxtField.id = ''.concat( (numOfStations[0]-1) ,"time0")
   newtxtField.size = "4"
   timesDiv.appendChild(newtxtField);
   brElement = document.createElement("br")
   brElement.id = "".concat( (numOfStations[0]-1),"timebr0")
   timesDiv.appendChild(brElement)
 }
 
 //to show again use:
 //hideButton3.style.display = "inline";  
 
 //oninput="train1EspeedLabel.innerText = this.value" <---slider changes label
 
}

rightMenuBtn.onclick = function(){
  if(sidNavRight.style.display == "none"){
    sidNavRight.style.display = "inline";
    divcontainer.style.marginRight = "250px"
    graphcontrol.style.marginRight = "250px"
    if(graphcontrol.style.width == "100%"){
      graphcontrol.style.width = "70%"
    }else{
      graphcontrol.style.width = "40%"
    }
    //addTraindiv.style.marginRight = "250px"
    rightMenuBtn.innerHTML = "&#62;"
    rightMenuBtn.style.right = "250px"
    chart = Highcharts.chart(options)
  }else{
    sidNavRight.style.display = "none";
    divcontainer.style.marginRight = "0"
    graphcontrol.style.marginRight = "0"
    if(graphcontrol.style.width == "40%"){
      graphcontrol.style.width = "70%"
    }else{
      graphcontrol.style.width = "100%"
    }
    //addTraindiv.style.marginRight = "0"
    rightMenuBtn.innerHTML = "&#60;"
    rightMenuBtn.style.right = "10px"
    chart = Highcharts.chart(options)
  }
}

leftMenuBtn.onclick = function(){
  if(sidNavLeft.style.display == "none"){
    sidNavLeft.style.display = "inline";
    divcontainer.style.marginLeft = "250px"
    graphcontrol.style.marginLeft = "250px"
    if(graphcontrol.style.width == "100%"){
      graphcontrol.style.width = "70%"
    }else{
      graphcontrol.style.width = "40%"
    }
    //niterationsdiv.style.marginRight = "250px"
    leftMenuBtn.innerHTML = "&#60;"
    leftMenuBtn.style.left = "250px"
    chart = Highcharts.chart(options)
  }else{
    sidNavLeft.style.display = "none";
    divcontainer.style.marginLeft = "0"
    graphcontrol.style.marginLeft = "0"
    if(graphcontrol.style.width == "40%"){
      graphcontrol.style.width = "70%"
    }else{
      graphcontrol.style.width = "100%"
    }
    //niterationsdiv.style.marginRight = "0"
    leftMenuBtn.innerHTML = "&#62;"
    leftMenuBtn.style.left = "10px"
    chart = Highcharts.chart(options)
  }
}

function changeIterationsNum(elemId){
  
  let elem = document.getElementById(elemId)
  let elemMethod = elem.value
  
  if(elemMethod=="+"){
    numIterations++
  }else if(elemMethod=="-"){
    if(numIterations > 1){
      numIterations--
    }else{
      return
    }
  }
  
  document.getElementById("numIterations1").value = numIterations
  document.getElementById("numIterations").value = numIterations
  
  //initFormData(false)
  
  
  for(let i=1;i<=numberOfTrainsE;i++){
    redraw(i,"E")
  }
  
  for(let i=1;i<=numberOfTrainsW;i++){
    redraw(i,"W")
  }
  
  //Number(document.getElementById("numIterations").value)
}



function changeStopLen(elemId){

  elem = document.getElementById(elemId)

  let elemTrainNum = Number(elem.dataset.train)
  let elemDirection = elem.dataset.direction
  let elemStation = Number(elem.dataset.station)
  let elemMethod = elem.dataset.method
  
  
  
  let stopLenTxTid = "".concat("train",elemTrainNum,elemDirection,"station",elemStation,"stopValue")
  
  
  let stopLenTxT = document.getElementById(stopLenTxTid)
  
  let stopLen
  
  if(elemDirection == "E"){
    stopLen = trainsData[0][elemTrainNum][5][elemStation]
  }else{
    stopLen = trainsData[1][elemTrainNum][5][elemStation]
  }
  
  
  
  //let stopLen = stopLenTxT.value
  
  if(elemMethod==="+"){
    stopLen++
  }else if(elemMethod==="-"){
    if(stopLen >1){
      stopLen--
    }
  }
  
  
  
  stopLenTxT.innerHTML = "".concat(" ",stopLen," ")
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[], line]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  //example:
  //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], [...]]
  
  let trainLine
  let numOfStations
  let circular
  
  if(elemDirection == "E"){
    
    trainLine = trainsData[0][elemTrainNum][7]
    numOfStations = numStations[trainLine]
    circular = circ[trainLine]
    if(circular===true){
      if(elemStation===1){
        trainsData[0][elemTrainNum][5][1] = stopLen
        trainsData[0][elemTrainNum][5][numOfStations] = stopLen
      }else{
        trainsData[0][elemTrainNum][5][elemStation] = stopLen
      }
    }else{
      trainsData[0][elemTrainNum][5][elemStation] = stopLen
    }
  }else if(elemDirection == "W"){
    
    trainLine = trainsData[1][elemTrainNum][7]
    numOfStations = numStations[trainLine]
    circular = circ[trainLine]
    if(circular===true){
      if(elemStation===1){
        trainsData[1][elemTrainNum][5][1] = stopLen
        trainsData[1][elemTrainNum][5][numOfStations] = stopLen
      }else{
        trainsData[1][elemTrainNum][5][elemStation] = stopLen
      }
    }else{
      trainsData[1][elemTrainNum][5][elemStation] = stopLen
    }
  }
  
  
  
  
  redraw(elemTrainNum,elemDirection)
  
}

function recurringtrainsexecute(){
  //numberOfTrainsE = 0
  //numberOfTrainsW = 0
  //numberOfSeries = 0
  //nextSerie = 0
  //trainsData[0] = [] //east trains array
  //trainsData[1] = [] //west trains array
  //trainsData[0][0] = null
  //trainsData[1][0] = null
  
  //deleteTrain(elemId, recurring, tnum, dire)
  
  //if(numberOfTrainsE >=1){
    //for(let t=1;t<=numberOfTrainsE;t++){
      //deleteTrain(null, true, t, "E")
    //}
  //}
  //if(numberOfTrainsW >=1){
    //for(let t=1;t<=numberOfTrainsW;t++){
      //deleteTrain(null, true, t, "W")
    //}
  //}
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[], line]
  //recurringdata[line] = [recurringTimeEast, recurringTimeWest, notrainsEast. notrainsWest, linksliders, startE, startW]
  
  //options.series = []
  
  //lines[n] = [numTrainsE,numTrainsW,numTrains]
  //lines[0] = [1,1,2]
  
  
  
  numberOfTrainsE = 0
  numberOfTrainsW = 0
  numberOfSeries = 0
  nextSerie = 0
  trainsData = []
  trainsData[0] = [] //east trains array
  trainsData[1] = [] //west trains array
  trainsData[0][0] = null
  trainsData[1][0] = null
  options.series = []
  
  
  
  
  
  //numLines = 1
  
  let recurringnumtrainsE = []
  let recurringnumtrainsW = []
  
  for(let l=0;l<numLines;l++){
    lines[l] = [0,0,0]
    recurringnumtrainsE[l] = Math.trunc((sumoftimesarray[l] - recurringdata[l][5])/recurringdata[l][0])
    recurringnumtrainsW[l] = Math.trunc((sumoftimesarray[l] - recurringdata[l][6])/recurringdata[l][1])
  }
  
  
  
  let trainsEtable = document.getElementById("trainsETable")
  let trainsWtable = document.getElementById("trainsWTable")
  let sidnavleft = document.getElementById("sidNavLeftchild")
  let sidnavright = document.getElementById("sidNavRightchild")
  
  sidnavleft.removeChild(trainsEtable)
  sidnavright.removeChild(trainsWtable)
  trainsEtable = null
  trainsWtable = null
  trainsEtable = Object.assign(document.createElement("table"),{id:"trainsETable"})
  trainsWtable = Object.assign(document.createElement("table"),{id:"trainsWTable"})
  let Etr = Object.assign(document.createElement("tr"),{id:"train1Erow"})
  let Wtr = Object.assign(document.createElement("tr"),{id:"train1Wrow"})
  let Etd = Object.assign(document.createElement("td"),{id:"train1ECol"})
  let Wtd = Object.assign(document.createElement("td"),{id:"train1WCol"})
  
  Etr.appendChild(Etd)
  trainsEtable.appendChild(Etr)
  sidnavleft.appendChild(trainsEtable)
  
  Wtr.appendChild(Wtd)
  trainsWtable.appendChild(Wtr)
  sidnavright.appendChild(trainsWtable)
    
  //addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)
  //addStationsToTable(1,1,"E",0,false,l)
  //addStationsToTable(1,1,"W",0,false,l)
  
  //addTrain(recurring, tline, dire, startt, starts )
  for(let l=0;l<numLines;l++){
    let recurrsecondsE = recurringdata[l][0]
    let recurrsecondsW = recurringdata[l][0]
    let disableeast = recurringdata[l][2]
    let disablewest = recurringdata[l][3]
    let linksliders = recurringdata[l][4]
    if(disableeast === true){
      if(disablewest === false){
        
        //addStationsToTable(1,1,"W",recurringdata[l][6],false,l)
        addTrain(true, l, "W", recurringdata[l][6], 1 )
        for(let t=1;t<recurringnumtrainsW[l];t++){
          addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
        }
      }
    }else if(disablewest === true){
      if(disableeast === false){
        
        //addStationsToTable(1,1,"E",recurringdata[l][5],false,l)
        addTrain(true, l, "E", recurringdata[l][5], 1 )
        for(let t=1;t<recurringnumtrainsE[l];t++){
          addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
        }
      }
    }else if(disableeast === true){
      if(disablewest === true){
        
        return
      }
    }else if(linksliders===true){ //we verified that both W and E are more than 0 at this time, linksliders===true so they MUST be equal at this time we can reasonably assume
      
      ////addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)
      //addStationsToTable(1,1,"E",recurringdata[l][5],false,l)
      //addStationsToTable(1,1,"W",recurringdata[l][6],false,l)
      addTrain(true, l, "E", recurringdata[l][5], 1 )
      addTrain(true, l, "W", recurringdata[l][6], 1 )
      for(let t=1;t<recurringnumtrainsE[l];t++){
        addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
        addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
      }
    }else{ //sliders are not linked, recurring times might be different but trains numbers COULD be or not be equal but we verified that both trains numbers of E and W are more than 0 
      if(recurringnumtrainsE[l] == recurringnumtrainsW[l]){
        
        //addStationsToTable(1,1,"E",recurringdata[l][5],false,l)
        //addStationsToTable(1,1,"W",recurringdata[l][6],false,l)
        addTrain(true, l, "E", recurringdata[l][5], 1 )
        addTrain(true, l, "W", recurringdata[l][6], 1 )
        for(let t=1;t<recurringnumtrainsE[l];t++){
          addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
          addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
        }
      }else if(recurringnumtrainsE[l] > recurringnumtrainsW[l]){
        
        //addStationsToTable(1,1,"E",recurringdata[l][5],false,l)
        //addStationsToTable(1,1,"W",recurringdata[l][6],false,l)
        addTrain(true, l, "E", recurringdata[l][5], 1 )
        addTrain(true, l, "W", recurringdata[l][6], 1 )
        for(let t=1;t<recurringnumtrainsW[l];t++){
          addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
          addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
        }
        for(let t=(recurringnumtrainsW[l]);t<recurringnumtrainsE[l];t++){
          addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
        }
      }else if(recurringnumtrainsW[l] > recurringnumtrainsE[l] ){
        
        //addStationsToTable(1,1,"E",recurringdata[l][5],false,l)
        //addStationsToTable(1,1,"W",recurringdata[l][6],false,l)
        addTrain(true, l, "E", recurringdata[l][5], 1 )
        addTrain(true, l, "W", recurringdata[l][6], 1 )
        for(let t=1;t<recurringnumtrainsE[l];t++){
          addTrain(true, l, "E", recurringdata[l][5] + (t*recurrsecondsE), 1 )
          addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
        }
        for(let t=(recurringnumtrainsE[l]);t<recurringnumtrainsW[l];t++){
          addTrain(true, l, "W", recurringdata[l][6] + (t*recurrsecondsW), 1 )
        }
      }
    }
    
  }
  
}

function disablerecurring(elem){
  let elemId = document.getElementById(elem)
  let line = Number(elemId.dataset.line)
  let direction = elemId.dataset.direction
  
  let numtrainslblE = document.getElementById("recnumtrainsE" + String(line))
  let numtrainslblW = document.getElementById("recnumtrainsW" + String(line))
  
  //[recurringTimeEast, recurringTimeWest, notrainsEast. notrainsWest, linksliders, startE, startW]
  if(direction==="E"){
    if(recurringdata[line][2] === true){
      recurringdata[line][2] = false
      numtrainslblE.innerText = String(Math.trunc((sumoftimesarray[line] - recurringdata[line][5])/recurringdata[line][0])) + " Trains"
    }else{
      recurringdata[line][2] = true
      numtrainslblE.innerText = "0 Trains"
    }
  }else{
    if(recurringdata[line][3] === true){
      recurringdata[line][3] = false
      numtrainslblW.innerText = String(Math.trunc((sumoftimesarray[line] - recurringdata[line][6])/recurringdata[line][1])) + " Trains"
    }else{
      recurringdata[line][3] = true
      numtrainslblW.innerText = "0 Trains"
    }
  }
  
}

function linkrecurring(elem){
  let elemId = document.getElementById(elem)
  let line = Number(elemId.dataset.line)
  
  let sliderE = document.getElementById("recurringtrainsliderE" + String(line))
  let sliderW = document.getElementById("recurringtrainsliderW" + String(line))
  let labelE = document.getElementById("recurringtrainsLabelValueE" + String(line))
  let labelW = document.getElementById("recurringtrainsLabelValueW" + String(line))

  let numtrainslblE = document.getElementById("recnumtrainsE" + String(line))
  let numtrainslblW = document.getElementById("recnumtrainsW" + String(line))
  
  if(recurringdata[line][4] === true){
    recurringdata[line][4] = false
    
    let newmaxE = sumoftimesarray[line] - recurringdata[line][5]
    let newmaxW = sumoftimesarray[line] - recurringdata[line][6]
    sliderE.max = newmaxE
    sliderW.max = newmaxW
  }else{
    recurringdata[line][4] = true
    let newmaxE = sumoftimesarray[line] - recurringdata[line][5]
    sliderW.value = sliderE.value
    sliderW.max = newmaxE
    labelW.innerText = labelE.innerText
    recurringdata[line][1] =  recurringdata[line][0]
    
  }
  
  if(recurringdata[line][2] === false){
      numtrainslblE.innerText = String(Math.trunc((sumoftimesarray[line] - recurringdata[line][5])/recurringdata[line][0])) + " Trains"
    }else{
      numtrainslblE.innerText = "0 Trains"
    }
    if(recurringdata[line][3] === false){
      numtrainslblW.innerText = String(Math.trunc((sumoftimesarray[line] - recurringdata[line][6])/recurringdata[line][1])) + " Trains"
    }else{
      numtrainslblW.innerText = "0 Trains"
    }
  
  
}

function recurringtrainsstartslider(elem){
  let elemId = document.getElementById(elem)
  let line = Number(elemId.dataset.line)
  let direction = elemId.dataset.direction
  let start = Number(elemId.value)
  
  let numtrainslblE = document.getElementById("recnumtrainsE" + String(line))
  let numtrainslblW = document.getElementById("recnumtrainsW" + String(line))
  
  let labelE = document.getElementById("recurringtrainsstartlblE" + String(line))
  let labelW = document.getElementById("recurringtrainsstartlblW" + String(line))
  
  let sliderE = document.getElementById("recurringtrainsliderE" + String(line))
  let sliderW = document.getElementById("recurringtrainsliderW" + String(line))
  let newmax = sumoftimesarray[line] - start
  let numtrains
  
  //sumoftimesarray[line]
  
  //[recurringTimeEast, recurringTimeWest, notrainsEast. notrainsWest, linksliders, startE,startW]
  if(direction==="E"){
    recurringdata[line][5] = start
    labelE.innerText = String(start) + " seconds"
    
    if(sliderE.value > newmax){
      sliderE.value = newmax
      recurringdata[line][0] = newmax
      let lblE = document.getElementById("recurringtrainsLabelValueE" + String(line))
      lblE.innerText = String(newmax) + " seconds"
      if (recurringdata[line][4] == true){
        recurringdata[line][1] = newmax
        let lblW = document.getElementById("recurringtrainsLabelValueW" + String(line))
        lblW.innerText = String(newmax) + " seconds"
      }
    }
    numtrains = Math.trunc((sumoftimesarray[line] - recurringdata[line][5])/recurringdata[line][0])
    
    if(recurringdata[line][2] === false){
      numtrainslblE.innerText = String(numtrains) + " Trains"
    }else{
      numtrainslblE.innerText = "0 Trains"
    }
    sliderE.max = newmax
    if (recurringdata[line][4] == true){
      sliderW.max = newmax
    }
  }else{
    recurringdata[line][6] = start
    labelW.innerText = String(start) + " seconds"
    
    if(sliderW.value > newmax){
      sliderW.value = newmax
      recurringdata[line][1] = newmax
      let lblW = document.getElementById("recurringtrainsLabelValueW" + String(line))
      lblW.innerText = String(newmax) + " seconds"
      if (recurringdata[line][4] == true){
        recurringdata[line][0] = newmax
        let lblE = document.getElementById("recurringtrainsLabelValueE" + String(line))
        lblE.innerText = String(newmax) + " seconds"
      }
    }
    numtrains = Math.trunc((sumoftimesarray[line] - recurringdata[line][6])/recurringdata[line][1])
    if(recurringdata[line][3] === false){
      numtrainslblW.innerText = String(numtrains) + " Trains"
    }else{
      numtrainslblW.innerText = "0 Trains"
    }
    sliderW.max = newmax
    if (recurringdata[line][4] == true){
      sliderE.max = newmax
    }
  }
  
}

function recurringtrainsslider(elem){
  let elemId = document.getElementById(elem)
  let recurrseconds = Number(elemId.value)
  let line = Number(elemId.dataset.line)
  let direction = elemId.dataset.direction
  
  let labelE = document.getElementById("recurringtrainsLabelValueE" + String(line))
  let labelW = document.getElementById("recurringtrainsLabelValueW" + String(line))
  
  let numtrainslblE = document.getElementById("recnumtrainsE" + String(line))
  let numtrainslblW = document.getElementById("recnumtrainsW" + String(line))
  
  let numtrains
  if(direction==="E"){
    numtrains = Math.trunc((sumoftimesarray[line] - recurringdata[line][5])/recurrseconds)
  }else{
    numtrains = Math.trunc((sumoftimesarray[line] - recurringdata[line][6])/recurrseconds)
  }
    
  //[recurringTimeEast, recurringTimeWest, notrainsEast. notrainsWest, linksliders, startE,startW]
  if (recurringdata[line][4] == true){
    labelE.innerText = String(recurrseconds) + " seconds"
    labelW.innerText = String(recurrseconds) + " seconds"
    if(recurringdata[line][2] === false){
      numtrainslblE.innerText = String(numtrains) + " Trains"
    }else{
      numtrainslblE.innerText = "0 Trains"
    }
    if(recurringdata[line][3] === false){
      numtrainslblW.innerText = String(numtrains) + " Trains"
    }else{
      numtrainslblW.innerText = "0 Trains"
    }
    
    
    if(direction==="E"){
      let otherslider = document.getElementById("recurringtrainsliderW" + String(line))
      otherslider.value = recurrseconds
    }else{
      let otherslider = document.getElementById("recurringtrainsliderE" + String(line))
      otherslider.value = recurrseconds
    }
    recurringdata[line][0] = Number(recurrseconds)
    recurringdata[line][1] = Number(recurrseconds)
  }else{
    if(direction==="E"){
      labelE.innerText = String(recurrseconds) + " seconds"
      if(recurringdata[line][2] === false){
        numtrainslblE.innerText = String(numtrains) + " Trains"
      }else{
        numtrainslblE.innerText = "0 Trains"
      }
      recurringdata[line][0] = Number(recurrseconds)
    }else{
      labelW.innerText = String(recurrseconds) + " seconds"
      if(recurringdata[line][3] === false){
        numtrainslblW.innerText = String(numtrains) + " Trains"
      }else{
        numtrainslblW.innerText = "0 Trains"
      }
      recurringdata[line][1] = Number(recurrseconds)
    }
  }
  
  
  
}

function changeTrainSpeed(elemId){

  elem = document.getElementById(elemId)

  let elemTrainNum = Number(elem.dataset.train)
  let elemDirection = elem.dataset.direction
  let elemStation = Number(elem.dataset.station)
  let newSpeed = Number(elem.value)
  
  
  
  let labelId = "".concat("train",elemTrainNum,elemDirection,"station",elemStation,"speedLabelValue")
  document.getElementById(labelId).innerText = "".concat(newSpeed,"%")
  
  
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[],circular]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  //example:
  //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], [...],true]
  
  let trainLine
  let numOfStations
  
  if(elemDirection == "E"){
    trainsData[0][elemTrainNum][4][elemStation] = newSpeed
          
  }else if(elemDirection == "W"){
    trainLine = trainsData[1][elemTrainNum][7]
    numOfStations = numStations[trainLine]
    if(elemStation==1){
      trainsData[1][elemTrainNum][4][numOfStations-1] = newSpeed
    }else if(elemStation==(numOfStations-1)){
      trainsData[1][elemTrainNum][4][1] = newSpeed
    }else{
      trainsData[1][elemTrainNum][4][numOfStations - elemStation] = newSpeed
    }
  
    //trainsData[1][elemTrainNum][4][elemStation] = newSpeed
  }
  
  redraw(elemTrainNum,elemDirection)
  
  //chart = Highcharts.chart(options)
  
  
}

function addStation(btnid){
  let trainLine = btnid.replace("addStationButton","");
  
  //let numOfStations = Number(document.getElementById("numOfStations" + trainLine).value) + 1
  let numOfStations = numStations[trainLine]
  let circular = circ[trainLine]
  if (!circular){
    numOfStations++
  }
  let stationsincommonfield = document.getElementById("stationsincommonfield" + trainLine)
  let incommonlbl = document.createElement("label")
  incommonlbl.id = numOfStations + "incommonlbl" + trainLine
  incommonlbl.innerHTML = "Station " + numOfStations
  let incommonchckbox = document.createElement("input")
  incommonchckbox.id = numOfStations + "incommonchkbox" + trainLine
  incommonchckbox.type = "checkbox"
  incommonchckbox.onchange = function(){sharedchkbox(this)}
  incommonchckbox.dataset.station = numOfStations
  incommonchckbox.dataset.line = trainLine
  let incommonbr = document.createElement("br")
  incommonbr.id = numOfStations + "incommonbr" + trainLine
  stationsincommonfield.appendChild(incommonlbl)
  stationsincommonfield.appendChild(incommonchckbox)
  stationsincommonfield.appendChild(incommonbr)
  if (circular===true){
    numOfStations++
  }
  document.getElementById("".concat("numOfStations",trainLine)).value = numOfStations
  numStations[trainLine] = numOfStations
  
  
  const timesDiv = document.getElementById("".concat("timesDiv",trainLine));
  for (let i = oldnumStations[trainLine]; i < numOfStations; i++){
    
    let newTimeTxt = document.createElement("label");
    let timeTxtLabel
    if (i=== oldnumStations[trainLine]){
      let nxt2lastTimeId = ''.concat((i-1),"timel",trainLine)
      document.getElementById(nxt2lastTimeId).innerHTML = ''.concat((i-1),"-",i," time:")
    }
    if ( (i === (numOfStations -1)) && (circular === true) ){
      timeTxtLabel = ''.concat(i," back to 1 time:")
    } else {
      timeTxtLabel = ''.concat(i,"-",(i+1)," time:")
    }
    newTimeTxt.innerHTML = timeTxtLabel
    newTimeTxt.id = ''.concat(i,"timel",trainLine)
    timesDiv.appendChild(newTimeTxt);
    //timesDiv.appendChild(document.createElement("br"))
    newtxtField = document.createElement("input");
    newtxtField.type = "text"
    newtxtField.id = ''.concat(i,"time",trainLine)
    newtxtField.size = "4"
    timesDiv.appendChild(newtxtField);
    brElement = document.createElement("br")
    brElement.id = "".concat(i,"timebr",trainLine)
    
    timesDiv.appendChild(brElement)
  }
  oldnumStations[trainLine] = numOfStations
  
}

function removeStation(btnid){
  let trainLine = btnid.replace("removeStationButton","");
  let numOfStations = numStations[trainLine]
  
  if(numOfStations===2){
    return
  }
  
  let circular = circ[trainLine]
  
  //let stationsincommonfield = document.getElementById("stationsincommonfield" + trainLine)
  if(circular===true){
    numOfStations--
  }
  let incommonlbl = document.getElementById(numOfStations + "incommonlbl" + trainLine)
  incommonlbl.remove()
  let incommonchckbox = document.getElementById(numOfStations + "incommonchkbox" + trainLine)
  incommonchckbox.remove()
  let incommonbr = document.getElementById(numOfStations + "incommonbr" + trainLine)
  incommonbr.remove()
  if (!circular){
    numOfStations--
  }
  document.getElementById("".concat("numOfStations",trainLine)).value = numOfStations
  numStations[trainLine] = numOfStations
  
  if( ((numOfStations<3) && (circular===false)) || ((numOfStations<4) && (circular===true)) ){
    
    return;
  }
  
  
  const timesDiv = document.getElementById("".concat("timesDiv",trainLine));
  
  let lastTimeIdLabel = ''.concat((numOfStations),"timel",trainLine);
  let lastTimeLabel = document.getElementById(lastTimeIdLabel);
  let lastTimeIdTxt = ''.concat((numOfStations),"time",trainLine);
  let lastTimeTxt = document.getElementById(lastTimeIdTxt);
  lastTimeLabel.remove();
  lastTimeTxt.remove();
  
  if (circular===true){
    lastTimeIdLabel = ''.concat((numOfStations-1),"timel",trainLine);
    lastTimeLabel = document.getElementById(lastTimeIdLabel);
    lblString = "".concat((numOfStations-1), " back to 1 time:")
    lastTimeLabel.innerHTML = lblString;
  }
  
  let brElementId= "".concat((numOfStations),"timebr",trainLine);
  
  let brElement = document.getElementById(brElementId);
  brElement.remove();
  
  oldnumStations[trainLine] = numOfStations;
  
}

function checkCircular(checkbox){
  let chkboxId = checkbox.id
  let trainLine = chkboxId.replace("circularCheckBox","");
  
  let newcircular = checkbox.checked;
  let numOfStations
  if (newcircular===true){
   numOfStations = numStations[trainLine] + 1
   numStations[trainLine] = numOfStations
   oldnumStations[trainLine] = numOfStations
   
   //const timesDivId = "timesDiv" + trainLine
   const timesDiv = document.getElementById("timesDiv" + trainLine);
   let newTimeTxt = document.createElement("label");
   let timeTxtLabel = ''.concat( (numOfStations-1)," back to 1 time:")
   newTimeTxt.innerHTML = timeTxtLabel
   newTimeTxt.id = ''.concat( (numOfStations-1) ,"timel",trainLine)
   timesDiv.appendChild(newTimeTxt);
   newtxtField = document.createElement("input");
   newtxtField.type = "text"
   newtxtField.id = ''.concat( (numOfStations-1) ,"time",trainLine)
   
   newtxtField.size = "4"
   timesDiv.appendChild(newtxtField);
   brElement = document.createElement("br")
   brElement.id = "".concat( (numOfStations-1),"timebr",trainLine)
   timesDiv.appendChild(brElement)
   circ[trainLine] = newcircular
  }else{
    numOfStations = numStations[trainLine] - 1
    numStations[trainLine] = numOfStations
    circ[trainLine] = newcircular
    
    
    const timesDiv = document.getElementById("".concat("timesDiv",trainLine));
    let lastTimeIdLabel = ''.concat((numOfStations),"timel",trainLine);
    let lastTimeLabel = document.getElementById(lastTimeIdLabel);
    let lastTimeIdTxt = ''.concat((numOfStations),"time",trainLine);
    let lastTimeTxt = document.getElementById(lastTimeIdTxt);
    let brElement = document.getElementById("".concat( (numOfStations),"timebr",trainLine))
    lastTimeLabel.remove();
    lastTimeTxt.remove();
    brElement.remove();
    oldnumStations[trainLine] = numOfStations
  }
  
}

function changeStartTime(event){
  
  let trainNum = Number(event.target.dataset.train)
  let direction = event.target.dataset.direction
  let newStartTime = Number(event.target.value)
  let trainLine = Number(event.target.dataset.line)
  
  if(direction==="E"){
    trainsData[0][trainNum][3] = newStartTime
  }else{
    trainsData[1][trainNum][3] = newStartTime
  }
  
  redraw(trainNum,direction)
  
}

function redraw(trainNum,direction){
  let trainLine
  let circular
  if(direction==="E"){
    let seriesIndex = trainsData[0][trainNum][1]
    let startStation = trainsData[0][trainNum][2]
    let startTime = trainsData[0][trainNum][3]
    trainLine = trainsData[0][trainNum][7]
    let lineLetter = numToLetter(trainLine)
    circular = circ[trainLine]
    if(circular===true){
      trainsData[0][trainNum][6] = newTrainEastCircular(seriesIndex,startStation,startTime,numIterations,trainsData[0][trainNum][4],trainsData[0][trainNum][5],trainLine)
    }else{
      trainsData[0][trainNum][6] = newTrainEast(seriesIndex,startStation,startTime,numIterations,trainsData[0][trainNum][4],trainsData[0][trainNum][5],trainLine)
    }
    
    options.series[seriesIndex] = []
    options.series[seriesIndex] = {name:''.concat("Train ",trainNum,"-E-",lineLetter),lineColor: 'red',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[0][trainNum][6][j].forEach(member => options.series[seriesIndex].data.push(member) );
    }
  }else if(direction==="W"){
    let seriesIndex = trainsData[1][trainNum][1]
    let startStation = trainsData[1][trainNum][2]
    let startTime = trainsData[1][trainNum][3]
    trainLine = trainsData[1][trainNum][7]
    let lineLetter = numToLetter(trainLine)
    circular = circ[trainLine]
    
    if(circular===true){
      trainsData[1][trainNum][6] = newTrainWestCircular(seriesIndex,startStation,startTime,numIterations,trainsData[1][trainNum][4],trainsData[1][trainNum][5],trainLine)
    }else{
      trainsData[1][trainNum][6] = newTrainWest(seriesIndex,startStation,startTime,numIterations,trainsData[1][trainNum][4],trainsData[1][trainNum][5],trainLine)
    }
    
    options.series[seriesIndex] = []
    options.series[seriesIndex] = {name:''.concat("Train ",trainNum,"-W-",lineLetter),lineColor: 'green',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[1][trainNum][6][j].forEach(member => options.series[seriesIndex].data.push(member) );
    }
  }
  
  drawMareyGraph()
  
}

function addLine(){
  numLines++
  numNonCircLines++
  const newLine = numLines-1
  const lineLetter = numToLetter(newLine)
  const linesorderfield = document.getElementById("linesorderfield")
  linesorderfield.style.display = "block"
  
  let shiftleftbtn = document.createElement("input")
  shiftleftbtn.id = "shiftleftLine" + newLine + "btn"
  shiftleftbtn.type = "button"
  shiftleftbtn.value = "<=="
  shiftleftbtn.onlick = function(){shiftleftLine(this.id)}
  let lineorderplaceh = document.createElement("input")
  lineorderplaceh.id = "Line"+ newLine +"orderplaceh"
  lineorderplaceh.size = 5
  lineorderplaceh.type = "text"
  lineorderplaceh.value ="Line " + lineLetter
  lineorderplaceh.disabled = true
  lineorderplaceh.style.textAlign =  "center"
  lineorderplaceh.style.color = "yellow"
  let shiftrightbtn = document.createElement("input")
  shiftrightbtn.id = "shiftrightLine" + newLine + "btn"
  shiftrightbtn.type = "button"
  shiftrightbtn.value = "==>"
  shiftrightbtn.onlick = function(){shiftrightLine(this.id)}
  shiftrightbtn.style.display = "none"
  if(numLines>2){
    for(let l=1; l<numLines-1; l++){
      let rightbtn = document.getElementById("shiftrightLine" + l + "btn")
      rightbtn.style.display = "inline"
    }
  }
  linesorderfield.appendChild(shiftleftbtn)
  linesorderfield.appendChild(lineorderplaceh)
  linesorderfield.appendChild(shiftrightbtn)
  linesorder.push(newLine)
  
  
  lines[newLine] = [1,1,2]
  numStations[newLine] = 2
  oldnumStations[newLine] = 2
  sharedStationsTable[newLine] = {numshared:0,sharedlist:[]}
  
  circ[newLine] = false
  
  if(newLine === 1){
    document.getElementById("stationsincommonfield0").style.display = "inline"
    //document.getElementById("sharedstationsfield").style.display = "block"
  }
  
  const linestd = document.getElementById("linestd")
  let addLineBtnCenter = document.getElementById("addLineBtnCenter")
  let addLineButton = document.getElementById("addLineButton")
  addLineButton.remove()
  addLineBtnCenter.remove()
  let newLineField = document.createElement("fieldset")
  newLineField.id = ("".concat("lineField",newLine))
  newLineField.style = "text-align: right;"
  let newLineLegend = document.createElement("legend")
  newLineLegend.innerHTML = "".concat("Line ",lineLetter,":")
  newLineField.appendChild(newLineLegend)
  let newtimesDiv = document.createElement("div")
  newtimesDiv.id = "".concat("timesDiv",newLine)
  for(let i=1;i<2;i++){
    let newLbl = document.createElement("label")
    newLbl.id = "".concat(i,"timel",newLine)
    newLbl.innerHTML = "".concat(i,"-",i+1," time:")
    let newInput = document.createElement("input")
    newInput.id = "".concat(i,"time",newLine)
    newInput.type = "text"
    newInput.size = "4"
    let newbr = document.createElement("br")
    newbr.id = "".concat(i,"timebr",newLine)
    newtimesDiv.appendChild(newLbl)
    newtimesDiv.appendChild(newInput)
    newtimesDiv.appendChild(newbr)
  }
  newLineField.appendChild(newtimesDiv)
  
  let newlineparams = document.createElement("fieldset")
  newlineparams.id = "".concat(newLine,"params")
  newlineparams.style = "text-align: right;"
  let newlegendparams = document.createElement("legend")
  newlegendparams.innerHTML = "Line " + lineLetter + " parameters:"
  
  let newlinecheckboxlbl = document.createElement("label")
  newlinecheckboxlbl.innerHTML = "circular line:"
  let newlinecheckbox = document.createElement("input")
  newlinecheckbox.id = "circularCheckBox" + newLine
  newlinecheckbox.type = "checkbox"
  newlinecheckbox.onchange = function(){checkCircular(this)}
  let newlinecheckboxbr = document.createElement("br")
  
  let center = document.createElement("center")
  let numstationlbl = document.createElement("label")
  numstationlbl.innerHTML = "number of stations:"
  let numstationsbr = document.createElement("br")
  let rmvbtn = document.createElement("input")
  rmvbtn.id = "removeStationButton" + newLine
  rmvbtn.value = "-"
  rmvbtn.type = "button"
  rmvbtn.onclick = function(){removeStation(this.id)}
  let numstationsinput = document.createElement("input")
  numstationsinput.id = "numOfStations" + newLine
  numstationsinput.size = "2"
  numstationsinput.type = "text"
  numstationsinput.style = "text-align: center;color:red"
  numstationsinput.value = "2"
  numstationsinput.disabled = true
  let addbtn = document.createElement("input")
  addbtn.id = "addStationButton" + newLine
  addbtn.value = "+"
  addbtn.type = "button"
  addbtn.onclick = function(){addStation(this.id)}
  
  center.appendChild(numstationlbl)
  center.appendChild(numstationsbr)
  center.appendChild(rmvbtn)
  center.appendChild(numstationsinput)
  center.appendChild(addbtn)
  
  let stationsincommonfield = document.createElement("fieldset")
  stationsincommonfield.id = "stationsincommonfield" + newLine
  stationsincommonfield.style = "text-align: center;"
  let incommonlegend = document.createElement("legend")
  incommonlegend.innerHTML = "Shared stations:"
  stationsincommonfield.appendChild(incommonlegend)
  for(let s=1; s<=numStations[newLine]; s++){
    let stationlbl = document.createElement("label")
     stationlbl.innerHTML = "Station " + s
     stationlbl.id = s + "incommonlbl" + newLine
     let chckbx = document.createElement("input")
     chckbx.id = s + "incommonchkbox" + newLine
     chckbx.type = "checkbox"
     chckbx.onchange = function(){sharedchkbox(this)}
     chckbx.dataset.station = s
     chckbx.dataset.line = newLine
     let elembr = document.createElement("br")
     elembr.id = s + "incommonbr" + newLine
     stationsincommonfield.appendChild(stationlbl)
     stationsincommonfield.appendChild(chckbx)
     stationsincommonfield.appendChild(elembr)
  }
  
  newlineparams.appendChild(newlegendparams)
  newlineparams.appendChild(newlinecheckboxlbl)
  newlineparams.appendChild(newlinecheckbox)
  newlineparams.appendChild(newlinecheckboxbr)
  newlineparams.appendChild(center)
  newlineparams.appendChild(stationsincommonfield)
  newLineField.appendChild(newlineparams)
  
  addLineBtnCenter = document.createElement("center")
  addLineBtnCenter.id = "addLineBtnCenter"
  addLineButton = document.createElement("input")
  addLineButton.id = "addLineButton"
  addLineButton.type = "button"
  addLineButton.value = "Add Line"
  addLineButton.onclick = function(){addLine()}
  addLineBtnCenter.appendChild(addLineButton)
  
  linestd.appendChild(newLineField)
  linestd.appendChild(addLineBtnCenter)
}

function sharedchkbox(checkbox){
  //let chkboxId = checkbox.id
  let trainLine = Number(checkbox.dataset.line)
  let station = Number(checkbox.dataset.station)
  
  if(checkbox.checked===true){
    sharedStations++
    sharedStationsTable[trainLine].numshared = sharedStationsTable[trainLine].numshared + 1
    sharedStationsTable[trainLine].sharedlist.push({number:station,equivalent:[]})
    
    let sharedstationsfield = document.getElementById("sharedstationsfield")
    let newElem = document.createElement("fieldset")
    newElem.id = trainLine + "sharedstationfield" + station
    let newLegend = document.createElement("legend")
    newLegend.innerHTML = station + numToLetter(trainLine)
    newElem.appendChild(newLegend)
    //let newbrElem = document.createElement("br")
    //newbrElem.id = trainLine + "sharedstationbr" + station
    sharedstationsfield.appendChild(newElem)
    //sharedstationsfield.appendChild(newbrElem)
    if((sharedstationsfield.style.display == "none") && (sharedStations>=2) ){
      sharedstationsfield.style.display = "block"
    }
    for(let l=0; l<numLines; l++){
      
      for(let s=0;s<sharedStationsTable[l].numshared;s++){
        
        let line = l
        let sstation = sharedStationsTable[l].sharedlist[s].number
        
        let stfield = document.getElementById(l + "sharedstationfield" + sstation)
        
        for(let ll=0; ll<numLines; ll++){
          for(let ss=0;ss<sharedStationsTable[ll].numshared;ss++){
            if(ll!=l){
              let childline = ll
              let childst = sharedStationsTable[ll].sharedlist[ss].number
              
              if(document.getElementById("l" + line + "st" + sstation + "sharedstationlbl"  + childline + "st" + childst)==null){
                

                let newlbl = document.createElement("label")
                newlbl.id = "l" + line + "st" + sstation + "sharedstationlbl"  + childline + "st" + childst
                newlbl.innerHTML = childst + numToLetter(childline)
                
                let newchkbox = document.createElement("input")
                newchkbox.id = "l" + line + "st" + sstation + "sharedstationchkboxl"  + childline + "st" + childst
                newchkbox.type = "checkbox"
                newchkbox.onchange = function(){sharedchkboxset(this)}
                newchkbox.dataset.station = sstation
                newchkbox.dataset.line = line
                newchkbox.dataset.stationtoshare = childst
                newchkbox.dataset.lineshare = childline
                
                
                //let numshared = sharedStationsTable[ll].numshared
                //if(numshared%6==0){
                  //let newbr = document.createElement("br")
                  //newbr.id = line + "st" + sstation + "sharedstationbr" + (numshared / 6)
                  
                  //stfield.appendChild(newbr)
                //}
                
                newlbl.appendChild(newchkbox)
                stfield.appendChild(newlbl)
              }
            }
          }
        }
      }
    }
  }else{
    for(let s=0;s<sharedStationsTable[trainLine].numshared;s++){
      if(sharedStationsTable[trainLine].sharedlist[s].number == station){
        
        //.splice(trainNum,1)
        let datacopy = sharedStationsTable[trainLine].sharedlist
        datacopy.splice(s,1)
        sharedStationsTable[trainLine].sharedlist = datacopy
        break
      }
    }
    let fieldtodelete = document.getElementById(trainLine + "sharedstationfield" + station)
    fieldtodelete.remove()
    sharedStations--
    sharedStationsTable[trainLine].numshared = sharedStationsTable[trainLine].numshared - 1
    
    if (sharedStations<2){
      sharedstationsfield.style.display = "none"
    }
    
    for(let l=0; l<numLines; l++){
      for(let s=0;s<sharedStationsTable[l].numshared;s++){
        let line = l
        let sstation = sharedStationsTable[l].sharedlist[s].number
        if(l!=trainLine){
          
          let lbl = document.getElementById("l" + line + "st" + sstation + "sharedstationlbl"  + trainLine + "st" + station)
          if(lbl!=null){
            lbl.remove()
            let chkbox = document.getElementById("l" + line + "st" + sstation + "sharedstationchkboxl"  + trainLine + "st" + station)
            //chkbox.remove()
          }
        }
      }
    }
    
  }
}

function sharedchkboxset(checkbox){
  
  //newchkbox.dataset.station = sstation
  //newchkbox.dataset.line = line
  //newchkbox.dataset.stationtoshare = childst
  //newchkbox.dataset.lineshare = childline

  let trainLine = Number(checkbox.dataset.line)
  let station = Number(checkbox.dataset.station)
  let stationtoshare = Number(checkbox.dataset.stationtoshare)
  let linetoshare = Number(checkbox.dataset.lineshare)
  
  
  if(checkbox.checked===true){
    for(let s=0;s<sharedStationsTable[trainLine].numshared;s++){
      if(sharedStationsTable[trainLine].sharedlist[s].number == station){
        
        sharedStationsTable[trainLine].sharedlist[s].equivalent.push({line:linetoshare,station:stationtoshare})
        break
      }
    }
    //newchkbox.id = "l" + line + "st" + sstation + "sharedstationchkboxl"  + childline + "st" + childst
    let othercheckbox = document.getElementById("l" + linetoshare + "st" + stationtoshare + "sharedstationchkboxl"  + trainLine + "st" + station)
    othercheckbox.checked = true
    for(let s=0;s<sharedStationsTable[linetoshare].numshared;s++){
      if(sharedStationsTable[linetoshare].sharedlist[s].number == stationtoshare){
        
        sharedStationsTable[linetoshare].sharedlist[s].equivalent.push({line:trainLine,station:station})
        break
      }
    }
    
  }else{
    for(let s=0;s<sharedStationsTable[trainLine].numshared;s++){
      if(sharedStationsTable[trainLine].sharedlist[s].number == station){
        
        let datacopy = sharedStationsTable[trainLine].sharedlist[s].equivalent
        datacopy.splice(s,1)
        sharedStationsTable[trainLine].sharedlist[s].equivalent = datacopy
        break
      }
    }
    let othercheckbox = document.getElementById("l" + linetoshare + "st" + stationtoshare + "sharedstationchkboxl"  + trainLine + "st" + station)
    othercheckbox.checked = false
    for(let s=0;s<sharedStationsTable[linetoshare].numshared;s++){
      if(sharedStationsTable[linetoshare].sharedlist[s].number == stationtoshare){
        
        let datacopy = sharedStationsTable[linetoshare].sharedlist[s].equivalent
        datacopy.splice(s,1)
        sharedStationsTable[linetoshare].sharedlist[s].equivalent = datacopy
        break
      }
    }
    
  }
}

function debugg(){
  calculateCumulativeDist()
  plotStationsLines()
}

function calculateCumulativeDist(){
  
  /////////////////////////////////////////////////////////////////
  let numOfStations
  
  for(let l=0; l<numLines; l++){
    numOfStations = numStations[l]
    
    timeArrayEast[l] = []
    timeArrayEast[l][0] = null
    for (let i = 1; i < numOfStations; i++) {
      let txtFieldId = ''.concat(i,"time",l)
      timeArrayEast[l][i] = Number(document.getElementById(txtFieldId).value)
    }
      
    
    
    distArray[l] = []
    distArray[l][0] = null
    for (let i = 1; i < numOfStations; i++) {
      //let txtFieldId = ''.concat(i,"size")
      distArray[l][i] = timeArrayEast[l][i]  //Number(document.getElementById(txtFieldId).value)
    }
    
    }
  ////////////////////////////////////////////////////////////////
  

  for(let l=0; l<numLines; l++){
    cumulativeDistEast[l] = []
  }
  
  cumulativeDistEast[0][0] = 0
  for (let s = 1; s < numStations[0]; s++) {
      
    cumulativeDistEast[0][s] = cumulativeDistEast[0][s-1] + distArray[0][s]
  }
  
  
  //we should also consider that lines don't share stations and implement the distance between lines dialog
  
  for(let o=1; o<numLines; o++){
    let currline = linesorder[o]
    let prevline = linesorder[o-1]
    
    //we assume the first station shared of the following lines is the station number 1
    let found
    let candidates = []
    let equivalents = []
    //it's probably wrong
    let found2
    for(let s=0;s<sharedStationsTable[currline].numshared;s++){
        if(sharedStationsTable[currline].sharedlist[s].number == 1){
          
          found = sharedStationsTable[currline].sharedlist[s].equivalent
          break
        }
    }
    for(let s=0;s<found.length;s++){
      if(found[s].line==prevline){
        candidates.push(found[s].station)//all stations shared with prevline that are equivalent to st 1 currline?
        //which is a nonsense should be 1
        found2 = found[s].station //station z of prveline equivalent with st1
        //so we should stop here?!
      }
    }
    
    for(let i=0;i<candidates.length;i++){
      for(let s=0;s<sharedStationsTable[prevline].numshared;s++){
        
        let prevlineeq = sharedStationsTable[prevline].sharedlist[s].number
        
        if(prevlineeq == candidates[i]){
          equivalents.push([1,prevlineeq])
          //all of this assuming more stations of prev line are equivalent to station 1 of currline
          //which is absurd
          //we should consider only prevlineeq
          
          //probably a check on the found prevlineeq to see if it correspond to station 1 of currline
          
          //or candidates it's an array of size 1
          
          break
        }
      }
    }
    
    let offset = cumulativeDistEast[prevline][equivalents[0][1]-1]
    
    cumulativeDistEast[o] = []
    cumulativeDistEast[o][0] = offset
    for (let s = 1; s < numOfStations; s++) {
      cumulativeDistEast[o][s] = cumulativeDistEast[o][s-1] + distArray[o][s]
    }
    
    

  }
  //cumulativeDistEast[l] = []
  //cumulativeDistEast[l][0] = 0
  //for (let i = 1; i < numOfStations; i++) {
    //cumulativeDistEast[l][i] = cumulativeDistEast[l][i-1] + distArray[l][i]
  //}
  
  for(let l=0; l<numLines; l++){
    let arrayLen = (cumulativeDistEast[l].length-1)
    cumulativeDistWest[l] = []
    for(let i=0; i <=arrayLen; i++){
      cumulativeDistWest[l][i] = cumulativeDistEast[l][arrayLen-i]
    }
    
    arrayLen = (timeArrayEast[l].length-1)
    timeArrayWest[l] = []
    timeArrayWest[l][0] = null
    for(let i=0; i <arrayLen; i++){
      timeArrayWest[l][i+1] = timeArrayEast[l][arrayLen-i]
    }
      
    
    
  }
  
}

function initFormData(firstTime){
  if(firstTime===true){
    let numOfStations
    numIterations = Number(document.getElementById("numIterations").value)
    stopLen = Number(document.getElementById("stopLen").value)
    calculateCumulativeDist()
    
    for(let l=0; l<numLines; l++){
    
      //var cumulativeDistEast= [ null,
      //0,
      //distArray[1],
      //distArray[1] + distArray[2],
      //distArray[1] + distArray[2] + distArray[3],
      //distArray[1] + distArray[2] + distArray[3] + distArray[4]
      //];
      
      numOfStations = numStations[l]
      
      let recurringfieldset = document.getElementById("recurringtrainsfieldset")
      
      if(l==0){
        for(let ll=0; ll<numLines; ll++){
          recurringdata[ll] = [10,10,false,false,true, 0, 0]
          //[recurringTimeEast, recurringTimeWest, notrainsEast. notrainsWest, linksliders, startE,startW]
        }
      }
      
      if (l > 0){
        let newlinefield = document.createElement("fieldset")
        newlinefield.id = "recurringfield" + String(l)
        newlinefield.innerHTML = "One train every:"
        let newlinelegend = document.createElement("legend")
        newlinelegend.innerHTML = "Line " + numToLetter(l) + ":"
        
        let newlineeast = document.createElement("fieldset")
        let newlineeastlegend = document.createElement("legend")
        newlineeastlegend.innerHTML = "East:"
        
        let numtrainsElbl = document.createElement("label")
        numtrainsElbl.id = "recnumtrainsE" + String(l)
        let numtrainsEbr = document.createElement("br")
        let hrE = document.createElement("hr")
        hrE.class = "dashed"
        
        let sliderstartlblE = document.createElement("label")
        sliderstartlblE.innerHTML = "Starting from:"
        let everylblbrE1 = document.createElement("br")
        let sliderstartE = document.createElement("input")
        sliderstartE.id = "recurringtrainsstartsliderE" + String(l)
        sliderstartE.max = "15"
        sliderstartE.min = "0"
        sliderstartE.type = "range"
        sliderstartE.value = "0"
        sliderstartE.dataset.line = l
        sliderstartE.dataset.direction = "E"
        sliderstartE.oninput = function(){recurringtrainsstartslider(this.id)}
        let startsliderlblE = document.createElement("label")
        startsliderlblE.id = "recurringtrainsstartlblE" + String(l)
        startsliderlblE.innerHTML = "0 seconds"
        let everylblbrE2 = document.createElement("br")
        let everylblE = document.createElement("label")
        everylblE.innerHTML = "Every:"
        let everylblbrE3 = document.createElement("br")
        
        let eastslider = document.createElement("input")
        eastslider.id = "recurringtrainsliderE" + String(l)
        eastslider.max = "15"
        eastslider.min = "10"
        eastslider.type = "range"
        eastslider.value = "10"
        eastslider.dataset.line = l
        eastslider.dataset.direction = "E"
        eastslider.oninput = function(){recurringtrainsslider(this.id)}
        let sliderlbl = document.createElement("label")
        sliderlbl.id = "recurringtrainsLabelValueE" + String(l)
        sliderlbl.for = eastslider.id
        sliderlbl.innerHTML = "10 seconds"
        let newbr = document.createElement("br")
        let disablerecurringlbl = document.createElement("label")
        disablerecurringlbl.for = "disablerecurringlblE" + String(l)
        disablerecurringlbl.innerHTML = "no trains going to east"
        let disablerecurringchck = document.createElement("input")
        disablerecurringchck.id = "disablerecurringE" + String(l)
        disablerecurringchck.type = "checkbox"
        disablerecurringchck.name = disablerecurringchck.id
        disablerecurringchck.dataset.line = l
        disablerecurringchck.dataset.direction = "E"
        disablerecurringchck.onchange = function(){disablerecurring(this.id)}
        
        newlineeast.appendChild(newlineeastlegend)
        
        newlineeast.appendChild(numtrainsElbl)
        newlineeast.appendChild(numtrainsEbr)
        newlineeast.appendChild(hrE)
        
        newlineeast.appendChild(sliderstartlblE)
        newlineeast.appendChild(everylblbrE1)
        newlineeast.appendChild(sliderstartE)
        newlineeast.appendChild(startsliderlblE)
        newlineeast.appendChild(everylblbrE2)
        newlineeast.appendChild(everylblE)
        newlineeast.appendChild(everylblbrE3)
        
        newlineeast.appendChild(eastslider)
        newlineeast.appendChild(sliderlbl)
        newlineeast.appendChild(newbr)
        newlineeast.appendChild(disablerecurringlbl)
        newlineeast.appendChild(disablerecurringchck)
        
        newlinefield.appendChild(newlinelegend)
        
        newlinefield.appendChild(newlineeast)
        
        let newlinewest = document.createElement("fieldset")
        let newlinewestlegend = document.createElement("legend")
        newlinewestlegend.innerHTML = "West:"
        
        let numtrainsWlbl = document.createElement("label")
        numtrainsWlbl.id = "recnumtrainsW" + String(l)
        let numtrainsWbr = document.createElement("br")
        let hrW = document.createElement("hr")
        hrW.class = "dashed"
        
        let sliderstartlblW = document.createElement("label")
        sliderstartlblW.innerHTML = "Starting from:"
        let everylblbrW1 = document.createElement("br")
        let sliderstartW = document.createElement("input")
        sliderstartW.id = "recurringtrainsstartsliderW" + String(l)
        sliderstartW.max = "15"
        sliderstartW.min = "0"
        sliderstartW.type = "range"
        sliderstartW.value = "0"
        sliderstartW.dataset.line = l
        sliderstartW.dataset.direction = "W"
        sliderstartW.oninput = function(){recurringtrainsstartslider(this.id)}
        let startsliderlblW = document.createElement("label")
        startsliderlblW.id = "recurringtrainsstartlblW" + String(l)
        startsliderlblW.innerHTML = "0 seconds"
        let everylblbrW2 = document.createElement("br")
        let everylblW = document.createElement("label")
        everylblW.innerHTML = "Every:"
        let everylblbrW3 = document.createElement("br")
        
        let westslider = document.createElement("input")
        westslider.id = "recurringtrainsliderW" + String(l)
        westslider.max = "15"
        westslider.min = "10"
        westslider.type = "range"
        westslider.value = "10"
        westslider.dataset.line = l
        westslider.dataset.direction = "W"
        westslider.oninput = function(){recurringtrainsslider(this.id)}
        let sliderlblw = document.createElement("label")
        sliderlblw.id = "recurringtrainsLabelValueW" + String(l)
        sliderlblw.for = westslider.id
        sliderlblw.innerHTML = "10 seconds"
        let newbrw = document.createElement("br")
        let disablerecurringlblw = document.createElement("label")
        disablerecurringlblw.for = "disablerecurringlblW" + String(l)
        disablerecurringlblw.innerHTML = "no trains going to west"
        let disablerecurringchckw = document.createElement("input")
        disablerecurringchckw.id = "disablerecurringW" + String(l)
        disablerecurringchckw.type = "checkbox"
        disablerecurringchckw.name = disablerecurringchck.id
        disablerecurringchckw.dataset.line = l
        disablerecurringchckw.dataset.direction = "W"
        disablerecurringchckw.onchange = function(){disablerecurring(this.id)}
        
        newlinewest.appendChild(newlinewestlegend)
        
        newlinewest.appendChild(numtrainsWlbl)
        newlinewest.appendChild(numtrainsWbr)
        newlinewest.appendChild(hrW)
        
        newlinewest.appendChild(sliderstartlblW)
        newlinewest.appendChild(everylblbrW1)
        newlinewest.appendChild(sliderstartW)
        newlinewest.appendChild(startsliderlblW)
        newlinewest.appendChild(everylblbrW2)
        newlinewest.appendChild(everylblW)
        newlinewest.appendChild(everylblbrW3)
        
        newlinewest.appendChild(westslider)
        newlinewest.appendChild(sliderlblw)
        newlinewest.appendChild(newbrw)
        newlinewest.appendChild(disablerecurringlblw)
        newlinewest.appendChild(disablerecurringchckw)
        
        newlinefield.appendChild(newlinewest)
        
        let linksliderslbl = document.createElement("label")
        linksliderslbl.innerHTML = "link east and west sliders"
        let linksliderschk = document.createElement("input")
        linksliderschk.name = "linkrecurring" + String(l)
        linksliderschk.id = linksliderschk.name
        linksliderschk.type = "checkbox"
        linksliderschk.dataset.line = l
        linksliderschk.dataset.onchange = function(){linkrecurring(this.id)}
        linksliderschk.checked = true
                
        newlinefield.appendChild(linksliderslbl)
        newlinefield.appendChild(linksliderschk)

        recurringfieldset.appendChild(newlinefield)
        
      }
      
      if( l=== (numLines-1) ){
        
        let newbr1 = document.createElement("br")
        let newcenter = document.createElement("center")
        let exectutebtn = document.createElement("input")
        exectutebtn.id = "recurringtrainsexecute" + String(l)
        exectutebtn.type = "button"
        exectutebtn.value = "execute"
        //exectutebtn.dataset.line = l
        //exectutebtn.onclick = function(){recurringtrainsexecute(this.id)}
        exectutebtn.onclick = function(){recurringtrainsexecute()}
          
        newcenter.appendChild(exectutebtn)
        recurringfieldset.appendChild(newbr1)
        recurringfieldset.appendChild(newcenter)
                
      }
      
      let circular = circ[l]
      
      let sumoftimes = 0
      
      for(let s=1; s<numOfStations; s++){
        sumoftimes = sumoftimes + timeArrayEast[l][s]
        
      }
      
      
      
      
      let recurringtrainsliderE = document.getElementById("recurringtrainsliderE" + String(l))
      let recurringtrainsliderW = document.getElementById("recurringtrainsliderW" + String(l))
      let recurringstartE = document.getElementById("recurringtrainsstartsliderE" + String(l))
      let recurringstartW = document.getElementById("recurringtrainsstartsliderW" + String(l))
      if(circular===true){
        recurringtrainsliderE.max = ((sumoftimes) + (stopLen * numOfStations)) - (5 + stopLen)
      }else{
        recurringtrainsliderE.max = ((sumoftimes * 2) + ((stopLen * numOfStations) * 2)) - (5 + (stopLen*3))
      }
      recurringtrainsliderW.max = recurringtrainsliderE.max
      
      
      sumoftimesarray[l] = Number(recurringtrainsliderE.max)
      
      recurringtrainsliderE.min = stopLen + 5
      recurringtrainsliderE.value = recurringtrainsliderE.max / 2
      recurringdata[l][0] = Number(recurringtrainsliderE.value)
      recurringdata[l][1] = Number(recurringtrainsliderE.value)
      recurringtrainsliderW.min = stopLen + 5
      recurringtrainsliderW.value = recurringtrainsliderW.max / 2
      
      recurringstartE.max = Number(recurringtrainsliderE.max) - (Number(recurringtrainsliderE.min))
      recurringstartW.max = recurringstartE.max
      
      let recurringlblE = document.getElementById("recurringtrainsLabelValueE" + String(l))
      recurringlblE.innerHTML = recurringtrainsliderE.value + " seconds"
      let recurringlblW = document.getElementById("recurringtrainsLabelValueW" + String(l))
      recurringlblW.innerHTML = recurringtrainsliderW.value + " seconds"
      
      let numtrainslblE = document.getElementById("recnumtrainsE" + String(l))
      let numtrainslblW = document.getElementById("recnumtrainsW" + String(l))
  
      let numtrains = Math.trunc(sumoftimesarray[l]/Number(recurringtrainsliderE.value))
      
      numtrainslblE.innerText = String(numtrains) + " Trains"
      numtrainslblW.innerText = String(numtrains) + " Trains"
      
      //DATASET FORMAT:
      //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[]]
      //trainsData[0] = east trains
      //trainsData[1] = west trains
    
      //trainsData[0][1] = []
      //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], []]
      //trainsData[1][1] = []
      //trainsData[1][1] = ["W",1,1,0, [null,100,100,100,100], [null,6,6,6,6], []]
    
      //newTrainEastCircular(seriesIndex, startStation, startTime, nOfIterations, speedsArray, stopsArray)
    
      //trainsData[0][1][6] = []
      //trainsData[0][1][6] = newTrainEastCircular(0,1,0,numIterations)
      

      let speedsArray = []
      let stopsArray = []
      speedsArray[0] = null
      stopsArray[0] = null
      for(let i=1;i<=numOfStations;i++){
        stopsArray[i] = stopLen
        if(i<numOfStations){
          speedsArray[i] = 100
        }
      }
  
      
    
      let lineLetter = numToLetter(l)
    
      trainsData[0][1] = []
      trainsData[0][1] = ["E",nextSerie,1,0, JSON.parse(JSON.stringify(speedsArray)), JSON.parse(JSON.stringify(stopsArray)), [], l]
      if(circular===true){
        trainsData[0][1][6] = newTrainEastCircular(0,1,0,numIterations,trainsData[0][1][4],trainsData[0][1][5],l)
      }else{
        trainsData[0][1][6] = newTrainEast(0,1,0,numIterations,trainsData[0][1][4],trainsData[0][1][5],l)
      }
      
      options.series[nextSerie] = {name:''.concat("Train ",1,"-E-",lineLetter),lineColor: 'red',data:[]}
      for(let j=0; j<=(numIterations-1); j++){
        trainsData[0][1][6][j].forEach(member => options.series[nextSerie].data.push(member) );
      }
    
      nextSerie++
      numberOfSeries++
      
      trainsData[1][1] = []
      trainsData[1][1] = ["W",nextSerie,1,0, JSON.parse(JSON.stringify(speedsArray)), JSON.parse(JSON.stringify(stopsArray)), [],l]
      if(circular===true){
        trainsData[1][1][6] = newTrainWestCircular(1,1,0,numIterations,trainsData[1][1][4],trainsData[1][1][5],l)
      }else{
        trainsData[1][1][6] = newTrainWest(1,1,0,numIterations,trainsData[1][1][4],trainsData[1][1][5],l)
      }
    
      options.series[nextSerie] = {name:''.concat("Train ",1,"-W-",lineLetter),lineColor: 'green',data:[]}
      for(let j=0; j<=(numIterations-1); j++){
        trainsData[1][1][6][j].forEach(member => options.series[nextSerie].data.push(member) );
      }
    
      nextSerie++
      numberOfSeries++
      
      //numberOfSeries = currentSerie -1
      
      //trainsData[1][1][6] = []
      //trainsData[1][1][6] = newTrainWestCircular(1,1,0,numIterations)
      
      let startTimeInput1 = 0 //document.getElementById("train1EstartTimeValue")
      let startTimeInput2 = 0 //document.getElementById("train1WstartTimeValue")
      
      //startTimeInput1.addEventListener("change", changeStartTime)
      //startTimeInput2.addEventListener("change", changeStartTime)
      
      let div1 = document.getElementById("div1")
      div1.style.display = "none";
      
      let div2 = document.getElementById("div2")
      div2.style.display = "inline";
      
      //addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)
      addStationsToTable(1,1,"E",0,false,l)
      addStationsToTable(1,1,"W",0,false,l)
      
      const newTrainStartStationSelect = document.getElementById("newTrainStartStationSelect")
      for(let i=3;i<numOfStations;i++){
        let newOption = document.createElement("option")
        newOption.id = "".concat("newTrainStartStation",i,"option")
        newOption.value = i
        newOption.innerHTML = i
        newTrainStartStationSelect.appendChild(newOption)
      }
      
      if(!circular){
        let newOption = document.createElement("option")
        newOption.id = "".concat("newTrainStartStation",numOfStations,"option")
        newOption.value = numOfStations
        newOption.innerHTML = numOfStations
        newTrainStartStationSelect.appendChild(newOption)
      }
      
      if(numLines>1){
        const newTrainLineSelect = document.getElementById("newTrainLineSelect")
        for(let l=1;l<numLines;l++){
          let newOption = document.createElement("option")
          newOption.id = "".concat("newTrainLine",l,"option")
          newOption.value = l
          newOption.innerHTML = numToLetter(l)
          newTrainLineSelect.appendChild(newOption)
        }
      }
      
      let trainsETable = document.getElementById("trainsETable")
      let trainsWTable = document.getElementById("trainsWTable")
      
      let trainErow = document.createElement("tr")
      trainErow.id = ("train2Erow")
      let trainWrow = document.createElement("tr")
      trainWrow.id = ("train2Wrow")
      
      let traincolE = document.createElement("td")
      traincolE.id = ("train2ECol")
      let traincolW = document.createElement("td")
      traincolW.id = ("train2WCol")
      
      trainErow.appendChild(traincolE)
      trainWrow.appendChild(traincolW)
      trainsETable.appendChild(trainErow)
      trainsWTable.appendChild(trainWrow)
    }
  }else{
    //dataset format:
    //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[...],line]
    //trainsData[0] = east trains
    //trainsData[1] = west trains
    
    //trainsData[0][1] = []
    //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], [],0]
    //trainsData[1][1] = []
    //trainsData[1][1] = ["W",1,1,0, [null,100,100,100,100], [null,6,6,6,6], [],0]
    
    //newTrainEastCircular(seriesIndex, startStation, startTime, nOfIterations, speedsArray, stopsArray, line)
    
    for(let i=1;i<=numberOfTrainsE; i++){
      let startStation = trainsData[0][i][2]
      let startTime =  trainsData[0][i][3]
      let speedsArray = trainsData[0][i][4]
      let stopsLenghtsArray = trainsData[0][i][5]
      let dataSerie = trainsData[0][i][1]
      let trainLine = trainsData[0][elemTrainNum][7]
      let circular = circ[trainLine]
      trainsData[0][i] = []
      trainsData[0][i] = ["E",dataSerie,startStation,startTime, speedsArray, stopsLenghtsArray, [],trainLine]
      if(circular===true){
        trainsData[0][i][6] = newTrainEastCircular(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray,trainLine)
      }else{
        trainsData[0][i][6] = newTrainEast(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray,trainLine)
      }
    }

    for(let i=1;i<=numberOfTrainsW; i++){
      let startStation = trainsData[1][i][2]
      let startTime =  trainsData[1][i][3]
      let speedsArray = trainsData[1][i][4]
      let stopsLenghtsArray = trainsData[1][i][5]
      let dataSerie = trainsData[1][i][1]
      let trainLine = trainsData[1][elemTrainNum][7]
      let circular = circ[trainLine]
      trainsData[1][i] = []
      trainsData[1][i] = ["W",dataSerie,startStation,startTime, speedsArray, stopsLenghtsArray, [],trainLine]
      if(circular===true){
        trainsData[1][i][6] = newTrainWestCircular(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray,trainLine)
      }else{
        trainsData[1][i][6] = newTrainWest(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray,trainLine)
      }
    }
    //numberOfSeries = currentSerie
  }
  
  
  drawMareyGraph(numberOfSeries, trainsData)
  
}

function deleteTrain(elemId, recurring, tnum, dire){
  
  let elem
  let trainNum
  let direction
  let dir
  if(recurring===true){
    trainNum = tnum
    direction = dire
    if(direction=="E"){
      dir = 0
    }else{
      dir = 1
    }
  }else{
  
    elem = document.getElementById(elemId)
    trainNum = Number(elem.dataset.train)
    direction = elem.dataset.direction
    if(direction=="E"){
      dir = 0
    }else{
      dir = 1
    }
  }
  let trainLine = trainsData[dir][trainNum][7]
  let circular = circ[trainLine]
  
  //dataset format:
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[...]]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  
  let seriesToDelete = trainsData[dir][trainNum][1]
  
  
  
  
  
  
  
  for(let t=1; t<=numberOfTrainsE; t++){    
    let trainserie = trainsData[0][t][1]
    if(trainserie > seriesToDelete){
      trainserie--
      trainsData[0][t][1] = trainserie
    }
  }
  for(let t=1; t<=numberOfTrainsW; t++){    
    let trainserie = trainsData[1][t][1]
    if(trainserie > seriesToDelete){
      trainserie--
      trainsData[1][t][1] = trainserie
    }
  }
  
  let datacopy = trainsData[dir]
  
  datacopy.splice(trainNum,1)
  
  trainsData[dir] = datacopy
  
  
  
  //numberOfTrainsE
  //numberOfTrainsW
  //numberOfSeries
  //nextSerie
  
  nextSerie--
  numberOfSeries--
  let trainsTable
  let trainrow
  let deletemorerows
  let numTrains
  if(direction=="E"){
    numTrains = numberOfTrainsE
    numberOfTrainsE--
    lines[trainLine][0] = lines[trainLine][0] - 1
    trainsTable = document.getElementById("trainsETable")
    //trainrow = document.getElementById("".concat("train",trainNum,"Erow"))
  }else{
    numTrains = numberOfTrainsW
    numberOfTrainsW--
    lines[trainLine][1] = lines[trainLine][1] - 1
    trainsTable = document.getElementById("trainsWTable")
    //trainrow = document.getElementById("".concat("train",trainNum,"Wrow"))
  }
  lines[trainLine][2] = lines[trainLine][2] - 1
  //trainsTable = document.getElementById("trains",direction,"Table")
  //trainrow = document.getElementById("".concat("train",trainNum,direction,"row"))
  
  //if(lines[trainLine][2] < 1){
    //numLines--
    //if(circular===true){
      //numCircLines--
    //}else{
      //numNonCircLines--
    //}
  //}
  
  if(trainNum<numTrains){
    deletemorerows = true
  }else{
    deletemorerows = false
    if(direction=="E"){
      trainrow = document.getElementById("".concat("train",trainNum,"Erow"))
    }else{
      trainrow = document.getElementById("".concat("train",trainNum,"Wrow"))
    }
    if(trainNum>1){
      trainsTable.removeChild(trainrow)
    }else{
      trainrow.remove()
    }
  }
  
  if(deletemorerows===true){
    for( let t=trainNum+1; t<=numTrains; t++){
      //trainrow = document.getElementById("".concat("train",trainNum,direction,"row"))
      if(direction=="E"){
        trainrow = document.getElementById("".concat("train",t,"Erow"))
      }else{
        trainrow = document.getElementById("".concat("train",t,"Wrow"))
      }
      trainsTable.removeChild(trainrow)
    }
    for(let t=trainNum+1;t<numTrains;t++){
      let startStation = trainsData[dir][t][2]
      let startTime = trainsData[dir][t][3]
      
      let trainrow = document.createElement("tr")
      let traincol = document.createElement("td")
      if(direction==="E"){
        trainsTable = document.getElementById("trainsETable")
        trainrow.id = "".concat("train",t,"Erow")
        traincol.id = "".concat("train",t,"ECol")
      }else{
        trainsTable = document.getElementById("trainsWTable")
        trainrow.id = "".concat("train",t,"Wrow")
        traincol.id = "".concat("train",t,"WCol")
      }
      trainrow.appendChild(traincol)
      trainsTable.appendChild(trainrow)
      
      addStationsToTable(t, startStation, direction, startTime, false)
    }
  }
  
  
  
  
  options.series.splice(seriesToDelete,1)
  
    
  
  
  //addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)
  
  if((numberOfTrainsE == 0) && (numberOfTrainsW == 0)){
    numberOfTrainsE = 0
    numberOfTrainsW = 0
    numberOfSeries = 0
    nextSerie = 0
    trainsData = []
    trainsData[0] = [] //east trains array
    trainsData[1] = [] //west trains array
    trainsData[0][0] = null
    trainsData[1][0] = null
    options.series = []
  }
  
  for(let t=1;t<=numberOfTrainsE;t++){
    redraw(t,"E")
  }
  for(let t=1;t<=numberOfTrainsW;t++){
    redraw(t,"W")
  }
  
}

function updateNewTrainStationsList(line){
  if(numLines>1){
    
    let circular = circ[line]
    let numOfStations = numStations[line]
    let newTrainStartStationSelect = document.getElementById("newTrainStartStationSelect")
    newTrainStartStationSelect.remove()
    let newTrainStartStationDiv = document.getElementById("newTrainStartStationDiv")
    newTrainStartStationSelect = document.createElement("select")
    newTrainStartStationSelect.id = "newTrainStartStationSelect"
    
    for(let i=1;i<numOfStations;i++){
      let newOption = document.createElement("option")
      newOption.id = "".concat("newTrainStartStation",i,"option")
      newOption.value = i
      newOption.innerHTML = i
      newTrainStartStationSelect.appendChild(newOption)
    }
      
    if(!circular){
      let newOption = document.createElement("option")
      newOption.id = "".concat("newTrainStartStation",numOfStations,"option")
      newOption.value = numOfStations
      newOption.innerHTML = numOfStations
      newTrainStartStationSelect.appendChild(newOption)
    }
    newTrainStartStationDiv.innerHTML = "Station: "
    newTrainStartStationDiv.appendChild(newTrainStartStationSelect)
    
  }
}

function addTrain(recurring, tline, dire, startt, starts ){
  
  let direction
  let startTime
  let startStation
  let trainLine
  
  if(recurring === true){
    startTime = startt
    startStation = starts
    trainLine = tline
    direction = dire
  }else{
    const directionRadio = document.getElementsByName("newTraindirection")
  
    startTime = Number(document.getElementById("newTrainStartTime").value)
    startStation = Number(document.getElementById("newTrainStartStationSelect").value)
    trainLine = Number(document.getElementById("newTrainLineSelect").value)
  
    for(let i=0;i<directionRadio.length; i++){
      if(directionRadio[i].checked){
        direction = directionRadio[i].value
      }
    }
    
  }
  
  let numOfStations = numStations[trainLine]
  let circular = circ[trainLine]
  
  let speedsArray = []
  let stopsArray = []
  speedsArray[0] = null
  stopsArray[0] = null
  for(let i=1;i<=numOfStations;i++){
    stopsArray[i] = stopLen
    if(i<numOfStations){
      speedsArray[i] = 100
    }
  }
  
  //dataset format:
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[...]]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  
  //trainsData[0][1] = []
  //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], []]
  //trainsData[1][1] = []
  //trainsData[1][1] = ["W",1,1,0, [null,100,100,100,100], [null,6,6,6,6], []]
  
  //newTrainEastCircular(seriesIndex, startStation, startTime, nOfIterations, speedsArray, stopsArray)
  
  //trainsData[0][1][6] = []
  //trainsData[0][1][6] = newTrainEastCircular(0,1,0,numIterations)
  if(direction==="E"){
    numberOfTrainsE++
    lines[trainLine][0] = lines[trainLine][0] + 1
    trainNum = numberOfTrainsE
    trainsData[0][trainNum] = [direction,nextSerie,startStation,startTime,speedsArray,stopsArray,[],trainLine]
    
    if(circular===true){
      trainsData[0][trainNum][6] = newTrainEastCircular(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray,trainLine)
    }else{
      trainsData[0][trainNum][6] = newTrainEast(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray,trainLine)
    }
    nextSerie++
    numberOfSeries++
  }else{
    numberOfTrainsW++
    lines[trainLine][1] = lines[trainLine][1] + 1
    trainNum = numberOfTrainsW
    trainsData[1][trainNum] = [direction,nextSerie,startStation,startTime,speedsArray,stopsArray,[],trainLine]
    
    if(circular===true){
      trainsData[1][trainNum][6] = newTrainWestCircular(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray,trainLine)
    }else{
      trainsData[1][trainNum][6] = newTrainWest(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray,trainLine)
    }
    nextSerie++
    numberOfSeries++
  }
  
  lines[trainLine][2] = lines[trainLine][2] + 1
  
  let trainsTable
  let trainrow = document.createElement("tr")
  let traincol = document.createElement("td")
  if(direction==="E"){
    trainsTable = document.getElementById("trainsETable")
    trainrow.id = "".concat("train",trainNum,"Erow")
    traincol.id = "".concat("train",trainNum,"ECol")
  }else{
    trainsTable = document.getElementById("trainsWTable")
    trainrow.id = "".concat("train",trainNum,"Wrow")
    traincol.id = "".concat("train",trainNum,"WCol")
  }
  trainrow.appendChild(traincol)
  trainsTable.appendChild(trainrow)
  
  addStationsToTable(trainNum, startStation, direction, startTime, false, trainLine)
  
  //drawMareyGraph()
  redraw(trainNum,direction)
  
  
  
  document.getElementById("newTrainStartStation1option").selected = true
  document.getElementById("newTrainStartTime").value = 0
  document.getElementById("newTrainLine0option").selected = true
}

function addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable, trainLine){
  let trainsTable
  if(direction==="E"){
   trainsTable = document.getElementById("trainsETable")
  }else{
    trainsTable = document.getElementById("trainsWTable")
  }

  let trainrow
  let traincol
  let trainfield
  let trainlegend
  let stationsdiv
  let stationsField
  let stationlegend
  let speedfield
  let speedlegend
  let sliderInput
  let speedlbl
  let stopfield
  let stoplegend
  let SubstractButton
  let stopvalue
  let AddButton
  let paramsdiv
  let startingparamsfield
  let startingparamslegend
  let startstationlbl
  let startstationselect
  let starttimelbl
  let starttimevalue
  
  let startstationselectDiv
  
  //let validatebutton
  
  let deletebutton
  
  let iteratefrom
  
  let numOfStations = numStations[trainLine]
  let lineLetter = numToLetter(trainLine)
  
  if(appendToExisingTable === false){
    
    if(direction==="E"){
      trainrow = document.getElementById("".concat("train",trainNum,"Erow"))
    }else{
      trainrow = document.getElementById("".concat("train",trainNum,"Wrow"))
    }
    traincol = document.getElementById("".concat("train",trainNum,direction,"Col"))
    
    
    trainfield = document.createElement("fieldset")
    trainfield.id = "".concat("train",trainNum,direction,"field")
    trainlegend = document.createElement("legend")
    trainlegend.id = "".concat("train",trainNum,direction,"legend")
    trainlegend.innerHTML = "".concat("Train ",trainNum,"-",direction,"-",lineLetter)
    stationsdiv = document.createElement("div")
    stationsdiv.id = "".concat("train",trainNum,direction,"stationsDiv")
    
    trainfield.appendChild(trainlegend)
    trainfield.appendChild(stationsdiv)
    traincol.appendChild(trainfield)
    
    iteratefrom = 1
    
  }else{
    stationsdiv = document.getElementById("".concat("train", trainNum, direction,"stationsDiv"))
    iteratefrom = 2
    
    startstationselectDiv = document.getElementById("".concat("train", trainNum, direction,"startStationSelectDiv"))
    
    startstationselect =  document.createElement("select")
    startstationselect.id = "".concat("train",trainNum,direction,"startStationSelect")
    startstationselect.dataset.direction = direction
    startstationselect.dataset.train = trainNum
    startstationselect.oninput = function(){changeStartStation(this.id)}
    
    for(let i=1;i<numOfStations;i++){
      let startstationoption = document.createElement("option")
      startstationoption.id = "".concat("train", trainNum, direction,"startStation",i,"option")
      startstationoption.innerHTML = i
      startstationoption.value = i
      startstationoption.dataset.direction = direction
      startstationoption.dataset.train = trainNum

      if(i===startStation){
        startstationoption.selected = true
      }else{
        startstationoption.selected = false
      }
      startstationselect.appendChild(startstationoption)
    }
    
    startstationselectDiv.appendChild(startstationselect)
    
  }
  
  for(let i=iteratefrom;i<numOfStations;i++){
    stationsField = document.createElement("fieldset")
    stationsField.id = "".concat("train", trainNum, direction,"station",i,"field")
    stationlegend = document.createElement("legend")
    stationlegend.id = "".concat("train", trainNum, direction,"station",i,"legend")
    if(direction==="E"){
      if((i==(numOfStations-1)) && (circular === true)){
        stationlegend.innerHTML = "".concat((i)," back to 1:")
      }else{
        stationlegend.innerHTML = "".concat(i," to ",(i+1),":")
      }
    }else{
      if(i===1){
        if(circular === true){
          stationlegend.innerHTML = "".concat("1 to ",(numOfStations-1),":")
        }else{
          stationlegend.innerHTML = "".concat(numOfStations," to ",(numOfStations-1),":")
        }
      }else if((i==(numOfStations-1)) && (circular === true)){
        stationlegend.innerHTML = "".concat((numOfStations-i+1)," back to ",(numOfStations-i),":")
      }else{
        stationlegend.innerHTML = "".concat((numOfStations-i+1)," to ",(numOfStations-i),":")
      }
    }
    speedfield = document.createElement("fieldset")
    speedfield.id = "".concat("train", trainNum, direction,"station",i,"speedfield")
    speedlegend = document.createElement("legend")
    speedlegend.id = "".concat("train", trainNum, direction,"station",i,"speedLegend")
    speedlegend.innerHTML = "Speed:"
    sliderInput = document.createElement("input")
    sliderInput.id = "".concat("train",trainNum,direction,"station",i,"speedSliderValue")
    sliderInput.max = 100
    sliderInput.min = 8
    sliderInput.type = "range"
    sliderInput.value = 100
    sliderInput.oninput = function(){changeTrainSpeed(this.id)} 
    sliderInput.dataset.direction = direction
    sliderInput.dataset.train = trainNum
    sliderInput.dataset.station = i
    speedlbl = document.createElement("label")
    speedlbl.id = "".concat("train",trainNum,direction,"station",i,"speedLabelValue")
    speedlbl.innerHTML = "100%"
    
    speedfield.appendChild(speedlegend)
    speedfield.appendChild(sliderInput)
    speedfield.appendChild(speedlbl)
    
    stationsField.appendChild(stationlegend)
    stationsField.appendChild(speedfield)
    
    let centerelem1 = document.createElement("center")
    
    stopfield = document.createElement("fieldset")
    stopfield.id = "".concat("train",trainNum,direction,"station",i,"stopfield")
    stoplegend = document.createElement("legend")
    stoplegend.id = "".concat("train",trainNum,direction,"station",i,"stoplegend")
    if(direction==="E"){
      stoplegend.innerHTML = "".concat("Stop lenght (St.",i,"):")
    }else{
      if((circular === true) && (i==1)){
        stoplegend.innerHTML = "".concat("Stop lenght (St.1):")
      }else{
        stoplegend.innerHTML = "".concat("Stop lenght (St.",(numOfStations-i+1),"):")
      }
    }
    SubstractButton = document.createElement("input")
    SubstractButton.id = "".concat("train",trainNum,direction,"station",i,"SubstractButton")
    SubstractButton.type = "button"
    SubstractButton.value = "-"
    SubstractButton.dataset.direction = direction
    SubstractButton.dataset.train = trainNum
    SubstractButton.dataset.station = i
    SubstractButton.dataset.method = "-"
    SubstractButton.onclick = function(){changeStopLen(this.id)}
    stopvalue = document.createElement("label")
    stopvalue.id = "".concat("train",trainNum,direction,"station",i,"stopValue")
    stopvalue.style = "text-align: center;"
    stopvalue.innerHTML = "".concat(" ",stopLen," ")
    AddButton = document.createElement("input")
    AddButton.id = "".concat("train",trainNum,direction,"station",i,"AddButton")
    AddButton.type = "button"
    AddButton.value = "+"
    AddButton.dataset.direction = direction
    AddButton.dataset.train = trainNum
    AddButton.dataset.station = i
    AddButton.dataset.method = "+"
    AddButton.onclick = function(){changeStopLen(this.id)}
    
    stopfield.appendChild(stoplegend)
    stopfield.appendChild(SubstractButton)
    stopfield.appendChild(stopvalue)
    stopfield.appendChild(AddButton)
    
    centerelem1.appendChild(stopfield)
    
    stationsField.appendChild(centerelem1)
    
    stationsdiv.appendChild(stationsField)
    
  }
  
  if(circular === false){
    stationsField = document.getElementById("".concat("train", trainNum, direction,"station",(numOfStations-1),"field"))
    let centerelem1 = document.createElement("center")
    stopfield = document.createElement("fieldset")
    stopfield.id = "".concat("train",trainNum,direction,"station",numOfStations,"stopfield")
    stoplegend = document.createElement("legend")
    stoplegend.id = "".concat("train",trainNum,direction,"station",numOfStations,"stoplegend")
    if(direction==="E"){
      stoplegend.innerHTML = "".concat("Stop lenght (St.",numOfStations,"):")
    }else{
      stoplegend.innerHTML = "".concat("Stop lenght (St.1):")
    }
    SubstractButton = document.createElement("input")
    SubstractButton.id = "".concat("train",trainNum,direction,"station",numOfStations,"SubstractButton")
    SubstractButton.type = "button"
    SubstractButton.value = "-"
    SubstractButton.dataset.direction = direction
    SubstractButton.dataset.train = trainNum
    SubstractButton.dataset.station = numOfStations
    SubstractButton.dataset.method = "-"
    SubstractButton.onclick = function(){changeStopLen(this.id)}
    stopvalue = document.createElement("label")
    stopvalue.id = "".concat("train",trainNum,direction,"station",numOfStations,"stopValue")
    stopvalue.style = "text-align: center;"
    stopvalue.innerHTML = "".concat(" ",stopLen," ")
    AddButton = document.createElement("input")
    AddButton.id = "".concat("train",trainNum,direction,"station",numOfStations,"AddButton")
    AddButton.type = "button"
    AddButton.value = "+"
    AddButton.dataset.direction = direction
    AddButton.dataset.train = trainNum
    AddButton.dataset.station = numOfStations
    AddButton.dataset.method = "+"
    AddButton.onclick = function(){changeStopLen(this.id)}
    
    stopfield.appendChild(stoplegend)
    stopfield.appendChild(SubstractButton)
    stopfield.appendChild(stopvalue)
    stopfield.appendChild(AddButton)
    
    centerelem1.appendChild(stopfield)
    stationsField.appendChild(centerelem1)
  }
////////////////////////////////////////  
  if(appendToExisingTable === false){
    //add starting parameters
    paramsdiv = document.createElement("div")
    paramsdiv.id = "".concat("train",trainNum,direction,"paramsDiv")
    startingparamsfield = document.createElement("fieldset")
    startingparamsfield.id = "".concat("train",trainNum,direction,"startingParamsField")
    startingparamslegend = document.createElement("legend")
    startingparamslegend.id = "".concat("train",trainNum,direction,"startingparamslegend")
    startingparamslegend.innerHTML = "Staring parameters:"
    
    
    startstationselectDiv = document.createElement("div")
    startstationselectDiv.id = "".concat("train",trainNum,direction,"startStationSelectDiv")
    
    startstationlbl = document.createElement("label")
    startstationlbl.id = "".concat("train",trainNum,direction,"startStationlbl")
    startstationlbl.innerHTML = "Start from station"
    startstationselect =  document.createElement("select")
    startstationselect.id = "".concat("train",trainNum,direction,"startStationSelect")
    startstationselect.dataset.direction = direction
    startstationselect.dataset.train = trainNum
    
    for(let i=1;i<numOfStations;i++){
      let startstationoption = document.createElement("option")
      startstationoption.id = "".concat("train", trainNum, direction,"startStation",i,"option")
      startstationoption.innerHTML = i
      startstationoption.value = i
      startstationoption.dataset.direction = direction
      startstationoption.dataset.train = trainNum
      if(i===startStation){
        startstationoption.selected = true
      }else{
        startstationoption.selected = false
      }
      startstationselect.appendChild(startstationoption)
    }
    
    starttimelbl = document.createElement("label")
    starttimelbl.id = "".concat("train", trainNum, direction,"startTimelbl")
    starttimelbl.innerHTML = "Start time:"
    starttimevalue = document.createElement("input")
    starttimevalue.id = "".concat("train", trainNum, direction,"startTimeValue")
    starttimevalue.value = startTime
    starttimevalue.type = "text"
    starttimevalue.size = 4
    starttimevalue.dataset.direction = direction
    starttimevalue.dataset.train = trainNum
    starttimevalue.dataset.line = trainLine
    starttimevalue.addEventListener("change", changeStartTime)
    
    //validatebutton = document.createElement("input")
    
    startingparamsfield.appendChild(startingparamslegend)
    startstationselectDiv.appendChild(startstationlbl)
    startstationselectDiv.appendChild(startstationselect)
    startingparamsfield.appendChild(startstationselectDiv)
    //startingparamsfield.appendChild(document.createElement("br"))
    startingparamsfield.appendChild(starttimelbl)
    startingparamsfield.appendChild(starttimevalue)
    //startingparamsfield.appendChild(validatebutton)
    
    paramsdiv.appendChild(startingparamsfield)
    
    let centerelem = document.createElement("center")
    
    deletebutton = document.createElement("input")
    deletebutton.id = "".concat("delTrain",trainNum, direction)
    deletebutton.type = "button"
    deletebutton.value = "".concat("delete train ",trainNum,"-",direction)
    deletebutton.dataset.direction = direction
    deletebutton.dataset.train = trainNum
    deletebutton.onclick = function(){deleteTrain(this.id)}
    
    centerelem.appendChild(deletebutton)
    
    paramsdiv.appendChild(centerelem)
    
    trainfield.appendChild(paramsdiv)
    
    //deletebutton
    
  }
  
}

function plotStationsLines(){
  
  let donotpushlist = []
  let sharedlist = []
  for(let l=0; l<numLines; l++){
    sharedlist[l] = []
  }
  
  for(let l=0; l<numLines; l++){
    
    let currline = linesorder[l]
    let prevline = linesorder[l-1]
    
    let numOfStations = numStations[currline]
    sharedlist[currline][0] = null
    for(let s =1; s <= numOfStations; s++){
      sharedlist[currline][s] = []
      sharedlist[currline][s][0] = false
    }
    
    
    if(sharedStationsTable[currline].numshared >= 1){
      for(let s=0;s<sharedStationsTable[currline].numshared;s++){
        
        let numstation = sharedStationsTable[currline].sharedlist[s].number
        let equivalent = sharedStationsTable[currline].sharedlist[s].equivalent
        
        sharedlist[currline][numstation][0] = true
        sharedlist[currline][numstation][1] = []
        for(let ss=0;ss<equivalent.length;ss++){
          sharedlist[currline][numstation][1][ss] = []
          sharedlist[currline][numstation][1][ss][0] = equivalent[ss].line
          sharedlist[currline][numstation][1][ss][1] = equivalent[ss].station
        }
      }
    }
    
    
  }

  for(let o=0; o<numLines; o++){
    
    let currline = linesorder[o]
    let prevline = linesorder[o-1]
    
    let numOfStations = numStations[currline]
    let circular = circ[currline]
    let lineLetter = numToLetter(currline)
    
    let numShared = sharedStationsTable[currline].numshared
    
    for(let i = 0; i <= numOfStations-1; i++){
      
      let axisLabel = ''.concat("Station ",i+1,lineLetter)
      if(sharedlist[currline][i+1][0] == true){
        for(let s=0;s<sharedlist[currline][i+1][1].length;s++){
          //might be messy with circular line should do a check to avoid it
          
          
          
          line2letter = numToLetter(sharedlist[currline][i+1][1][s][0])
          station2 = sharedlist[currline][i+1][1][s][1]
          axisLabel = axisLabel + "/" + station2 + line2letter
          donotpushlist.push("Station " + station2 + line2letter + "/" + (i+1) + lineLetter)
          
        }
      }
      
      if ((i === numOfStations -1)&&(circular===true)){
        axisLabel = ''.concat("Station ",1,lineLetter)
      }
      
      
      let labelOffset = axisLabel.length
      stationNames[cumulativeDistEast[currline][i]] = axisLabel
      
      if(donotpushlist.length===0){
        options.yAxis.plotLines.push({
          value: cumulativeDistEast[currline][i],
          width: 1,
          color: "#666666",
          label: {
            align: 'left',
             x: ((labelOffset + 1) * (-6)) + 1,
             y: 4,
            text: axisLabel,
            style: {
              color: '#FFFFFF'
            }
          }
        })
      }else{
        for(let d=0;d<donotpushlist.length;d++){
          
          if(donotpushlist[d] == axisLabel){
            
            break
          }
          if(d===(donotpushlist.length-1)){
            options.yAxis.plotLines.push({
              value: cumulativeDistEast[currline][i],
              width: 1,
              color: "#666666",
              label: {
                align: 'left',
                 x: ((labelOffset + 1) * (-6)) + 1,
                 y: 4,
                text: axisLabel,
                style: {
                color: '#FFFFFF'
                }
              }
            })
          }
        }
      }
      
      
      
      
      
    }
    
  }
  
  

}

function tooltipformatter(){

  options.tooltip.formatter = function () {
            // The first returned item is the header, subsequent items are the
            // points
            return [stationNames[this.y] + '<br>'].concat(
                this.points ?
                    this.points.map(function (point) {
                        return '<b>' + point.series.name + '</b> time: <b>' + point.x + '</b>s<br>';
                    }) : []
            );
         }

  

}

function plotxasislines(){

  
  
    let tempticks = []
    let ticks = []
    //ticks = this.series[0].xData.sort((a,b)=>a-b)
    for(let i=0;i<options.series.length;i++){
      tempticks[i] = []
      for(let dataindex=0;dataindex<options.series[i].data.length;dataindex++){
        tempticks[i].push(options.series[i].data[dataindex][0])
      }
      ticks[i] = []
      for(let index=0;index<tempticks[i].length;index++){
        //if( index % 2 == 0){
          ticks[i].push(tempticks[i][index])
          
        //}
      }
    }
    
    let result = [];
    for(j=0;j<ticks.length;j++){
      for (let index = 0; index < ticks[j].length; index++) {
        let value = ticks[j][index]
        result.push(value);
      }
    }
    result = result.sort((a,b)=>a-b)
    xaxisticks = [...new Set(result)];
    
    result = []
    
    for(let i=1;i<=xaxisticks.length; i++){
      //if(i<(xaxisticks.length -1)){
        if(Math.abs(xaxisticks[i] - xaxisticks[i+1]) >6 ){
          //result.push(xaxisticks[i])
          result.push(Math.max(xaxisticks[i],xaxisticks[i+1]))
        }
      //}
    }
  
  for(i=0; i<xaxisticks.length; i++){
    options.xAxis.plotLines[i] = {
      value: result[i],
      width: 1,
    }
  }
  
}

function drawMareyGraph(){

plotStationsLines()
plotxasislines()
//plotTheLines()
tooltipformatter()
//plotTheLines()

$(function () {
    //Highcharts.setOptions({
    //lang: {
      //resetZoom: 'rrr'
    //}
    //});
    
var zoomRatio = 1;
var lastX;
var lastY;
var mouseDown;

chart = Highcharts.chart(options)

var setZoom = function() {

    var xMin = chart.xAxis[0].getExtremes().dataMin;
    var xMax = chart.xAxis[0].getExtremes().dataMax;
    var yMin = chart.yAxis[0].getExtremes().dataMin;
    var yMax = chart.yAxis[0].getExtremes().dataMax;
   
    chart.xAxis[0].setExtremes(xMin + (1 - zoomRatio) * xMax, xMax * zoomRatio);
    chart.yAxis[0].setExtremes(yMin + (1 - zoomRatio) * yMax, yMax * zoomRatio);
};



$('#container').bind('mousewheel', function(event) {
          event.preventDefault();

          if(event.deltaY > 0) {
            if (zoomRatio > 0.7) {
                zoomRatio = zoomRatio - 0.1;
                setZoom();
            }

          }
          else if (event.deltaY < 0) {
            zoomRatio = zoomRatio + 0.1;
            setZoom();
          }
        });


$('#resetZoom').click(function() {

    var xExtremes = chart.xAxis[0].getExtremes;
    var yExtremes = chart.yAxis[0].getExtremes;
    chart.xAxis[0].setExtremes(xExtremes.dataMin, xExtremes.dataMax);
    chart.yAxis[0].setExtremes(yExtremes.dataMin, yExtremes.dataMax);
    zoomRatio = 1;
    
});

$('#container').mousedown(function() {
    mouseDown = 1;
});

$('#container').mouseup(function() {
    mouseDown = 0;
});

$('#container').mousemove(function(e) {
    if (mouseDown == 1) {
        if (e.pageX > lastX) {
            var diff = 0.08 * (e.pageX - lastX);
            var xExtremes = chart.xAxis[0].getExtremes();
            chart.xAxis[0].setExtremes(xExtremes.min - diff, xExtremes.max - diff);
        }
        else if (e.pageX < lastX) {
            var diff = 0.08 * (lastX - e.pageX);
            var xExtremes = chart.xAxis[0].getExtremes();
            chart.xAxis[0].setExtremes(xExtremes.min + diff, xExtremes.max + diff);
        }

        if (e.pageY > lastY) {
            var ydiff = 0.2 * (lastY - e.pageY); //1 * (e.pageY - lastY);
            var yExtremes = chart.yAxis[0].getExtremes();
            chart.yAxis[0].setExtremes(yExtremes.min + ydiff, yExtremes.max + ydiff);
        }
        else if (e.pageY < lastY) {
            var ydiff = 0.2 * (e.pageY - lastY); //1 * (lastY - e.pageY);
            var yExtremes = chart.yAxis[0].getExtremes();
            chart.yAxis[0].setExtremes(yExtremes.min - ydiff, yExtremes.max - ydiff);
        }
    }
    lastX = e.pageX;
    lastY = e.pageY;
});
    
    
});


}

function toFixed(value, precision) {
//https://stackoverflow.com/questions/2221167/javascript-formatting-a-rounded-number-to-n-decimals/2909252#2909252
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

function numToLetter(n) {
  let chrA = 'A'.charCodeAt(0);
  let chrZ = 'Z'.charCodeAt(0);
  let len = chrZ - chrA + 1;
  
  let s = ""
  while(n >= 0) {
    s = String.fromCharCode(n % len + chrA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s;
}

function newTrainWestCircular(seriesIndex,startStation,startTime,nOfIterations ,speedsArray, stopsArray, trainLine){
  
  let numOfStations = numStations[trainLine]
  
  let timeArray = timeArrayWest[trainLine]
  let cumulativeDist = []
  
  
  
  
  let tempTimeArrayEast = []
  tempTimeArrayEast[0] = 0
  let tempCumulativeDistEast = []
  tempCumulativeDistEast[0] = 0
    
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      tempTimeArrayEast[i] = Number(toFixed(timeArrayEast[trainLine][i] * speedMultiplier, 1))
    }else{
      tempTimeArrayEast[i] = timeArrayEast[trainLine][i]
    }
  }
  
  for (let i = 1; i < numOfStations; i++) {
    tempCumulativeDistEast[i] = tempCumulativeDistEast[i-1] + tempTimeArrayEast[i]
  }
  
  let arrayLen = (tempCumulativeDistEast.length-1)
  for(let i=0; i <=arrayLen; i++){
    cumulativeDist[i] = tempCumulativeDistEast[arrayLen-i]
  }
  
  arrayLen = (tempTimeArrayEast.length-1)
  timeArray[0] = null
  for(let i=0; i <arrayLen; i++){
    timeArray[i+1] = tempTimeArrayEast[arrayLen-i]
  }
  
  
  

  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistWest[trainLine][startStation-1]
    startFrom1st = true
    startFromLast = false
    numOfStationsToHandle = numOfStations
  }else if(startStation === numOfStations){
    
    //make no sense for circular line as last station is station #1
   
  }else{
    startStation = (numOfStations - startStation) +1
    startY = cumulativeDistWest[trainLine][startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    startFromLast = false
  }
  
  //stopsArray[currentStation]
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  let nextPointIndex
  for (let i = 0; i <= (nOfIterations-1); i++) {
    if(!startFromLast){
      //handles stations from startStation to last
      let currentStation = startStation
      let currentStopLen
      
      for (let j = 0; j <= ((numOfStationsToHandle *2)-1); j++)  {
        if (j % 2 == 0) {
          if ((i === 0) && (j>1)) {
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
            
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations){
              if(startFrom1st){
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }else{
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
                nextPointIndex++
              }
            }        
          }
        } else if (j % 2 != 0) {
          if ((i === 0) && (j>1)) {
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
              
            }else{
              currentStopLen = stopsArray[currentStation +1]
              
            }
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
            trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
            currentStation++
            
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations){
              if(startFrom1st){
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }
            }
          }
        }
        
        if ((i > 0) && (j<=1)){
          if(i>=1){
            if(j==0){
              if(startFrom1st){
                let lastIndex = trainArray[i-1].length -1
                trainArray[i] = []
                trainArray[i][0] = []
                trainArray[i][0][0] = trainArray[i-1][lastIndex][0] //+ timeArray[currentStation];
                trainArray[i][0][1] = startY;
                nextPointIndex = 1
              }else{
                let lastIndex = trainArray[i-1].length -1
                trainArray[i] = []
                trainArray[i][0] = []
                trainArray[i][0][0] = trainArray[i-1][lastIndex][0] + timeArray[currentStation];
                trainArray[i][0][1] = cumulativeDistWest[trainLine][currentStation];
                nextPointIndex = 1
              }
            }else if (j==1){
              if(startFrom1st){
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + timeArray[currentStation];
                trainArray[i][1][1] = cumulativeDistWest[trainLine][currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  
                }
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + currentStopLen;
                trainArray[i][1][1] = cumulativeDistWest[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }
            }
          }
        }
        
      }
    }
    
    if (!startFrom1st){
      //handles stations from 1st to (startStation-1)

      if(!startFromLast){
        if (i===0){
          nextPointIndex = numOfStationsToHandle*2
          trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -1][0] ,cumulativeDistWest[trainLine][0]]
        }else{
          trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -1][0] ,cumulativeDistWest[trainLine][0]]
        }
      }else{
        //trainArray[i][0] = [ ,0]
        //const nextPointIndex = 0
        //makes no sense for circular lines as last station is first station
      }
      
      let currentStation = 1
      let currentStopLen
      for (let j = 1; j <= ((numOfStations - numOfStationsToHandle) *2); j++) {
        if (j % 2 == 0) {
          if (i === 0) {
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
            
            }else{
              currentStopLen = stopsArray[currentStation +1]
              
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + currentStopLen;
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[trainLine][currentStation];
            currentStation++
          } else if (i > 0 ) {
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
            
            }else{
              currentStopLen = stopsArray[currentStation +1]
              
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + currentStopLen;
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[trainLine][currentStation];
            currentStation++
          }
        } else if (j % 2 != 0) {
          if (i === 0) {
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[trainLine][currentStation];
          } else if (i > 0 ) {
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[trainLine][currentStation];
          }
        }
      
    }
    
  }
    
  }
  
  
  
  
  
  return trainArray
  
}

function newTrainEastCircular(seriesIndex,startStation,startTime,nOfIterations, speedsArray, stopsArray, trainLine){
  
  
  
  
  let numOfStations = numStations[trainLine]
  
  let timeArray = []
  timeArray[0] = 0
  
  
  
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      timeArray[i] = Number(toFixed(timeArrayEast[trainLine][i] * speedMultiplier, 1))
      
    }else{
      timeArray[i] = timeArrayEast[trainLine][i]
    }
  }
  
  
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistEast[trainLine][startStation-1]
    startFrom1st = true
    startFromLast = false
    numOfStationsToHandle = numOfStations
  }else if(startStation === numOfStations){
    startY = cumulativeDistEast[trainLine][startStation]
    numOfStationsToHandle = numOfStations -1
    let startFromLast = true
    startFrom1st = false
  }else{
    startY = cumulativeDistEast[trainLine][startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    startFromLast = false
  }
  
  //stopsArray[currentStation]
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  
  //numOfStationsToHandle = 
  let nextPointIndex
  for (let i = 0; i <= (nOfIterations-1); i++) {
    if(!startFromLast){
      //handles stations from startStation to last
      let currentStation = startStation
      for (let j = 0; j <= ((numOfStationsToHandle *2)-1); j++)  {
        let currentStopLen
        
        if (j % 2 == 0) {
          if ((i === 0) && (j>1)) {
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations  ){
              if(startFrom1st){
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                
                trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }else {
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
                nextPointIndex++
              }
            }
          }
          
        } else if (j % 2 != 0) {
          if ((i === 0) && (j>1)) {
            //currentStopLen
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
              
            }else{
              currentStopLen = stopsArray[currentStation +1]
              
            }
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
            
            trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
            currentStation++
            
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations  ){
              if(startFrom1st){
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
                nextPointIndex++
              }else {
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                
                trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }
            }
          }
        }
        
        if ((i > 0) && (j<=1)){
          if(i>=1){
            if(j==0){
              if(startFrom1st){
                let lastIndex = trainArray[i-1].length -1
                trainArray[i] = []
                trainArray[i][0] = []
                trainArray[i][0][0] = trainArray[i-1][lastIndex][0] //+ timeArray[currentStation];
                trainArray[i][0][1] = 0;
                nextPointIndex = 1
              }else{
                let lastIndex = trainArray[i-1].length -1
                trainArray[i] = []
                trainArray[i][0] = []
                trainArray[i][0][0] = trainArray[i-1][lastIndex][0] + timeArray[currentStation];
                trainArray[i][0][1] = cumulativeDistEast[trainLine][currentStation];
                nextPointIndex = 1
              }
              
            }else if (j==1){
              
              if(startFrom1st){
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + timeArray[currentStation];
                trainArray[i][1][1] = cumulativeDistEast[trainLine][currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                }
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + currentStopLen;
                
                trainArray[i][1][1] = cumulativeDistEast[trainLine][currentStation];
                currentStation++
                nextPointIndex++
              }
              
            }
          }
        }
        
      }
    }
    
    
    
    if (!startFrom1st){
      //handles stations from 1st to (startStation-1)
     
      
      
      if(startFromLast){
        //trainArray[i][0] = [ ,0]
        //const nextPointIndex = 0
        //makes no sense for circular lines as last station is first station
      }else{
        
        
        if (i===0){
          nextPointIndex = numOfStationsToHandle*2
        }
        trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -1][0] ,0]

        //example of graph without continuity
        //trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -2][0] ,null]
        //trainArray[i][nextPointIndex + 1] = [trainArray[i][nextPointIndex][0]  ,0]
        //trainArray[i][numOfStationsToHandle*2 + 2] = [trainArray[i][nextPointIndex][0] + stopsArray[currentStation] ,0]
        ///
        
      }

      let currentStation = 1
      for (let j = 1; j <= ((numOfStations - numOfStationsToHandle) *2); j++) {
        if (j % 2 == 0) {
          if (i === 0) {
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + stopsArray[currentStation + 1];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[trainLine][currentStation];
            currentStation++
            
          } else if (i > 0 ) {
            
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + stopsArray[currentStation + 1];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[trainLine][currentStation];
            currentStation++
            
            
          }
        
        } else if (j % 2 != 0) {
          if (i === 0) {
            
            
            
            
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[trainLine][currentStation];
            
          } else if (i > 0 ) {
            if (currentStation < numOfStations ){
              
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[trainLine][currentStation];
            
          }
        }
      }
    
    }
  }
  
 
 
  
  
  return trainArray
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function newTrainWest(seriesIndex,startStation,startTime,nOfIterations ,speedsArray, stopsArray, trainLine){
  
  
  
  
  let numOfStations = numStations[trainLine]
  
  let timeArray = timeArrayWest[trainLine]
  let cumulativeDist = []
  
  
  
  
  let tempTimeArrayEast = []
  tempTimeArrayEast[0] = 0
  let tempCumulativeDistEast = []
  tempCumulativeDistEast[0] = 0
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      tempTimeArrayEast[i] = Number(toFixed(timeArrayEast[trainLine][i] * speedMultiplier, 1))
    }else{
      tempTimeArrayEast[i] = timeArrayEast[trainLine][i]
    }
  }
  
  for (let i = 1; i < numOfStations; i++) {
    tempCumulativeDistEast[i] = tempCumulativeDistEast[i-1] + tempTimeArrayEast[i]
  }
  
  let arrayLen = (tempCumulativeDistEast.length-1)
  for(let i=0; i <=arrayLen; i++){
    cumulativeDist[i] = tempCumulativeDistEast[arrayLen-i]
  }
  
  arrayLen = (tempTimeArrayEast.length-1)
  timeArray[0] = null
  for(let i=0; i <arrayLen; i++){
    timeArray[i+1] = tempTimeArrayEast[arrayLen-i]
  }
  
  
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  //let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistWest[trainLine][startStation-1]
    startFrom1st = true
    //startFromLast = false
    numOfStationsToHandle = numOfStations
  //}else if(startStation === numOfStations){
    //Not circular line becomes a west train if starting from last station
  }else{
    startStation = (numOfStations - startStation) +1
    startY = cumulativeDistWest[trainLine][startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    //startFromLast = false
  }
  
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  let nextPointIndex = 0
  let currentStation = startStation
  for (let i = 0; i <= (nOfIterations-1); i++) {
    //handles stations from startStation to last
    let startingIndex = nextPointIndex
    
    
    if(i==0){
      nextPointIndex = 2
      for (let j = 2; j <= ((numOfStationsToHandle *2)-1); j++)  {
        //handles stations from startStation to last
        let currentStopLen
        let lastIndex
        let seriesindex = startingIndex + j
        if (j % 2 == 0) {
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
          trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
        }else if (j % 2 != 0) {
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
          currentStation++
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      
      
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let seriesindex = startingIndex + j
        
        
        if (j % 2 == 0) {
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistWest[trainLine][currentStation-2];
          
          
          
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistWest[trainLine][currentStation-2];
          currentStation--
          
          
          
        }
        nextPointIndex++
      }
    }else{
      nextPointIndex = 0
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let lastIndex
        let seriesindex = startingIndex + j
        if (j % 2 == 0) {
          if(j===0){
             
            trainArray[i] = []
            trainArray[i][j] = []
            
            trainArray[i][j][0] = trainArray[i-1][startingIndex-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
            
          }else{
            
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
            
          }
        }else if (j % 2 != 0) {
          
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistWest[trainLine][currentStation];
          currentStation++
          
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      
      
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        
        let currentStopLen
        let seriesindex = startingIndex + j
        
        
        if (j % 2 == 0) {
          
          trainArray[i][seriesindex] = []
          
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistWest[trainLine][currentStation-2];
          
          
          
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistWest[trainLine][currentStation-2];
          currentStation--
          
          
          
        }
        nextPointIndex++
      }
    }
  }
  
  
  return trainArray
  
}

function newTrainEast(seriesIndex,startStation,startTime,nOfIterations, speedsArray, stopsArray, trainLine){
  
  
  
  
  let numOfStations = numStations[trainLine]
  
  let timeArray = []
  timeArray[0] = 0
  
  
  
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      timeArray[i] = Number(toFixed(timeArrayEast[trainLine][i] * speedMultiplier, 1))
      
    }else{
      timeArray[i] = timeArrayEast[trainLine][i]
    }
  }
  
  
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  //let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistEast[trainLine][startStation-1]
    startFrom1st = true
    //startFromLast = false
    numOfStationsToHandle = numOfStations
  //}else if(startStation === numOfStations){
    //Not circular line becomes a west train if starting from last station
  }else{
    startY = cumulativeDistEast[trainLine][startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    //startFromLast = false
  }
  
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  let nextPointIndex = 0
  let currentStation = startStation
  for (let i = 0; i <= (nOfIterations-1); i++) {
    //handles stations from startStation to last
    let startingIndex = nextPointIndex
    
    
    if(i==0){
      nextPointIndex = 2
      for (let j = 2; j <= ((numOfStationsToHandle *2)-1); j++)  {
        //handles stations from startStation to last
        let currentStopLen
        let lastIndex
        let seriesindex = startingIndex + j
        if (j % 2 == 0) {
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
          trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
        }else if (j % 2 != 0) {
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
          currentStation++
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      
      
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let seriesindex = startingIndex + j
        
        
        if (j % 2 == 0) {
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistEast[trainLine][currentStation-2];
          
          
          
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistEast[trainLine][currentStation-2];
          currentStation--
          
          
          
        }
        nextPointIndex++
      }
    }else{
      nextPointIndex = 0
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let lastIndex
        let seriesindex = startingIndex + j
        if (j % 2 == 0) {
          if(j===0){
             
            trainArray[i] = []
            trainArray[i][j] = []
            
            trainArray[i][j][0] = trainArray[i-1][startingIndex-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
            
          }else{
            
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
            
          }
        }else if (j % 2 != 0) {
          
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistEast[trainLine][currentStation];
          currentStation++
          
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      
      
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        
        let currentStopLen
        let seriesindex = startingIndex + j
        
        
        if (j % 2 == 0) {
          
          trainArray[i][seriesindex] = []
          
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistEast[trainLine][currentStation-2];
          
          
          
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistEast[trainLine][currentStation-2];
          currentStation--
          
          
          
        }
        nextPointIndex++
      }
    }
  }
  
  
  return trainArray
  
}
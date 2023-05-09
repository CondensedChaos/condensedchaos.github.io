var line0 = new Error().lineNumber -1
var leftMenuBtn = document.getElementById("leftMenuBtn")
var sidNavLeft = document.getElementById("sidNavLeft")
var rightMenuBtn = document.getElementById("rightMenuBtn")
var sidNavRight = document.getElementById("sidNavRight")
var divcontainer = document.getElementById("container")
//var niterationsdiv = document.getElementById("niterationsdiv")
//var addTraindiv = document.getElementById("addTraindiv")
var graphcontrol = document.getElementById("graphcontrol")

var oldnumOfStations = Number(document.getElementById("numOfStations").value) //+1
var numOfStations = oldnumOfStations
var cumulativeDistEast = []
var distArray = []
var timeArrayEast = []
var stopLen
var numIterations
var circular
var graphData = []
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
    //console.log(xaxisticks)
    for(let i=1;i<=xaxisticks.length; i++){
      //if(i<(xaxisticks.length -1)){
        if(Math.abs(xaxisticks[i-1] - xaxisticks[i]) >6 ){
          result.push(xaxisticks[i])
        }
      //}
    }
    //console.log(result)
    
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
var timeArrayWest = []

window.onload = function () {
 sidNavLeft.style.display = "none";
 sidNavRight.style.display = "none";
 
 console.log("LINE0=",line0) 
 console.log("line n.",((new Error().lineNumber) - line0))
 
 //document.getElementById("numOfStations").addEventListener('change', refreshNumStations);
 let hideButton1 = document.getElementById("iterationAddButton");
 hideButton1.style.display = "none";
 let hideButton2 = document.getElementById("iterationSubstractButton");
 hideButton2.style.display = "none";
 
 let div2 = document.getElementById("div2")
 div2.style.display = "none";
 
 let circularCheckBox = document.getElementById("circularCheckBox");
 circular = circularCheckBox.checked;
 console.log("circular=",circular)
 
 if(circular===true){
   //oldnumOfStations = oldnumOfStations + 1
   numOfStations = numOfStations + 1
   const timesDiv = document.getElementById("timesDiv");
   let newTimeTxt = document.createElement("label");
   let timeTxtLabel = ''.concat( (numOfStations-1)," back to 1 time:")
   newTimeTxt.innerHTML = timeTxtLabel
   newTimeTxt.id = ''.concat( (numOfStations-1) ,"timel")
   timesDiv.appendChild(newTimeTxt);
   newtxtField = document.createElement("input");
   newtxtField.type = "text"
   newtxtField.id = ''.concat( (numOfStations-1) ,"time")
   newtxtField.size = "4"
   timesDiv.appendChild(newtxtField);
   brElement = document.createElement("br")
   brElement.id = "".concat( (numOfStations-1),"timebr")
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
  
  console.log("======CHANGE STOP LEN".concat("train Num.",elemTrainNum," Dir:",elemDirection," Station:",elemStation," stop change method:",elemMethod))
  
  let stopLenTxTid = "".concat("train",elemTrainNum,elemDirection,"station",elemStation,"stopValue")
  console.log(stopLenTxTid)
  
  let stopLenTxT = document.getElementById(stopLenTxTid)
  
  let stopLen
  
  if(elemDirection == "E"){
    stopLen = trainsData[0][elemTrainNum][5][elemStation]
  }else{
    stopLen = trainsData[1][elemTrainNum][5][elemStation]
  }
  
  console.log("========OLD STOP LEN=",stopLen)
  
  //let stopLen = stopLenTxT.value
  
  if(elemMethod==="+"){
    stopLen++
  }else if(elemMethod==="-"){
    if(stopLen >1){
      stopLen--
    }
  }
  
  console.log("========NEW STOP LEN=",stopLen)
  
  stopLenTxT.innerHTML = "".concat(" ",stopLen," ")
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[]]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  //example:
  //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], [...]]
  
  if(elemDirection == "E"){
    console.log("==============EAST")
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
    console.log("==============WEST")
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
  
  console.log("EAST trains data",trainsData[0][elemTrainNum])
  console.log("WEST trains data",trainsData[1][elemTrainNum])
  
  redraw(elemTrainNum,elemDirection)
  
}

function changeTrainSpeed(elemId){

  elem = document.getElementById(elemId)

  let elemTrainNum = Number(elem.dataset.train)
  let elemDirection = elem.dataset.direction
  let elemStation = Number(elem.dataset.station)
  let newSpeed = Number(elem.value)
  
  //console.log("".concat("train Num.",elemTrainNum," Dir:",elemDirection," Station:",elemStation," New Speed:",newSpeed))
  
  let labelId = "".concat("train",elemTrainNum,elemDirection,"station",elemStation,"speedLabelValue")
  document.getElementById(labelId).innerText = "".concat(newSpeed,"%")
  
  
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[]]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  //example:
  //trainsData[0][1] = ["E",0,1,0, [null,100,100,100,100], [null,6,6,6,6], [...]]
  
  if(elemDirection == "E"){
    trainsData[0][elemTrainNum][4][elemStation] = newSpeed
    //console.log(trainsData[0][elemTrainNum])      
  }else if(elemDirection == "W"){
    
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

function addStation(){
  numOfStations = Number(document.getElementById("numOfStations").value) + 1
  if (circular===true){
    numOfStations++
    document.getElementById("numOfStations").value = numOfStations -1
  }else{
    document.getElementById("numOfStations").value = numOfStations
  }
  console.log("oldnumOfStations=",oldnumOfStations," numOfStations=",numOfStations)
  
  const timesDiv = document.getElementById("timesDiv");
  for (let i = oldnumOfStations; i < numOfStations; i++){
    let newTimeTxt = document.createElement("label");
    let timeTxtLabel
    if (i=== oldnumOfStations){
      let nxt2lastTimeId = ''.concat((i-1),"timel")
      document.getElementById(nxt2lastTimeId).innerHTML = ''.concat((i-1),"-",i," time:")
    }
    if ( (i === (numOfStations -1)) && (circular === true) ){
      timeTxtLabel = ''.concat(i," back to 1 time:")
    } else {
      timeTxtLabel = ''.concat(i,"-",(i+1)," time:")
    }
    newTimeTxt.innerHTML = timeTxtLabel
    newTimeTxt.id = ''.concat(i,"timel")
    timesDiv.appendChild(newTimeTxt);
    //timesDiv.appendChild(document.createElement("br"))
    newtxtField = document.createElement("input");
    newtxtField.type = "text"
    newtxtField.id = ''.concat(i,"time")
    newtxtField.size = "4"
    timesDiv.appendChild(newtxtField);
    brElement = document.createElement("br")
    brElement.id = "".concat(i,"timebr")
    console.log(brElement.id)
    timesDiv.appendChild(brElement)
  }
  oldnumOfStations = numOfStations
  
}

function removeStation(){
  
  if( ((numOfStations<3) && (circular===false)) || ((numOfStations<4) && (circular===true)) ){
    console.log("================RETURN, numOfStations=",numOfStations," oldnumOfStations=",oldnumOfStations)
    return;
  }
  
  numOfStations = Number(document.getElementById("numOfStations").value) - 1
  if (circular===true){
    numOfStations++
    document.getElementById("numOfStations").value = numOfStations -1
  }else{
    document.getElementById("numOfStations").value = numOfStations
  }
  console.log("oldnumOfStations=",oldnumOfStations," numOfStations=",numOfStations)
  
  
  const timesDiv = document.getElementById("timesDiv");
  
  let lastTimeIdLabel = ''.concat((numOfStations),"timel");
  let lastTimeLabel = document.getElementById(lastTimeIdLabel);
  let lastTimeIdTxt = ''.concat((numOfStations),"time");
  let lastTimeTxt = document.getElementById(lastTimeIdTxt);
  lastTimeLabel.remove();
  lastTimeTxt.remove();
  
  if (circular===true){
    lastTimeIdLabel = ''.concat((numOfStations-1),"timel");
    lastTimeLabel = document.getElementById(lastTimeIdLabel);
    lblString = "".concat((numOfStations-1), " back to 1 time:")
    lastTimeLabel.innerHTML = lblString;
  }
  
  let brElementId= "".concat((numOfStations),"timebr");
  console.log(brElementId)
  let brElement = document.getElementById(brElementId);
  brElement.remove();
  
  oldnumOfStations = numOfStations;
  console.log("oldnumOfStations=",oldnumOfStations," numOfStations=",numOfStations)
}

function checkCircular(checkbox)
{
  let newcircular = checkbox.checked;
  if (newcircular===true){
   numOfStations = numOfStations + 1
   oldnumOfStations = numOfStations
   console.log("oldnumOfStations=",oldnumOfStations," numOfStations=",numOfStations)
   const timesDiv = document.getElementById("timesDiv");
   let newTimeTxt = document.createElement("label");
   let timeTxtLabel = ''.concat( (numOfStations-1)," back to 1 time:")
   newTimeTxt.innerHTML = timeTxtLabel
   newTimeTxt.id = ''.concat( (numOfStations-1) ,"timel")
   timesDiv.appendChild(newTimeTxt);
   newtxtField = document.createElement("input");
   newtxtField.type = "text"
   newtxtField.id = ''.concat( (numOfStations-1) ,"time")
   console.log("id=",newtxtField.id)
   newtxtField.size = "4"
   timesDiv.appendChild(newtxtField);
   brElement = document.createElement("br")
   brElement.id = "".concat( (numOfStations-1),"timebr")
   timesDiv.appendChild(brElement)
   circular = newcircular
  }else{
    numOfStations = numOfStations - 1
    circular = newcircular
    console.log("oldnumOfStations=",oldnumOfStations," numOfStations=",numOfStations)
    
    const timesDiv = document.getElementById("timesDiv");
    let lastTimeIdLabel = ''.concat((numOfStations),"timel");
    let lastTimeLabel = document.getElementById(lastTimeIdLabel);
    let lastTimeIdTxt = ''.concat((numOfStations),"time");
    let lastTimeTxt = document.getElementById(lastTimeIdTxt);
    let brElement = document.getElementById("".concat( (numOfStations),"timebr"))
    lastTimeLabel.remove();
    lastTimeTxt.remove();
    brElement.remove();
    oldnumOfStations = numOfStations
  }
  console.log("circular=",circular)
}

function changeStartTime(event){
  
  let trainNum = Number(event.target.dataset.train)
  let direction = event.target.dataset.direction
  let newStartTime = Number(event.target.value)
  
  if(direction==="E"){

    trainsData[0][trainNum][3] = newStartTime
  }else{
    trainsData[1][trainNum][3] = newStartTime
  }
  
  redraw(trainNum,direction)
  
}

function redraw(trainNum,direction){
  if(direction==="E"){
    let seriesIndex = trainsData[0][trainNum][1]
    let startStation = trainsData[0][trainNum][2]
    let startTime = trainsData[0][trainNum][3]

    if(circular===true){
      trainsData[0][trainNum][6] = newTrainEastCircular(seriesIndex,startStation,startTime,numIterations,trainsData[0][trainNum][4],trainsData[0][trainNum][5])
    }else{
      trainsData[0][trainNum][6] = newTrainEast(seriesIndex,startStation,startTime,numIterations,trainsData[0][trainNum][4],trainsData[0][trainNum][5])
    }
    
    options.series[seriesIndex] = []
    options.series[seriesIndex] = {name:''.concat("Train ",trainNum," E"),lineColor: 'red',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[0][trainNum][6][j].forEach(member => options.series[seriesIndex].data.push(member) );
    }
  }else if(direction==="W"){
    let seriesIndex = trainsData[1][trainNum][1]
    let startStation = trainsData[1][trainNum][2]
    let startTime = trainsData[1][trainNum][3]
    
    
    if(circular===true){
      trainsData[1][trainNum][6] = newTrainWestCircular(seriesIndex,startStation,startTime,numIterations,trainsData[1][trainNum][4],trainsData[1][trainNum][5])
    }else{
      trainsData[1][trainNum][6] = newTrainWest(seriesIndex,startStation,startTime,numIterations,trainsData[1][trainNum][4],trainsData[1][trainNum][5])
    }
    
    options.series[seriesIndex] = []
    options.series[seriesIndex] = {name:''.concat("Train ",trainNum," W"),lineColor: 'green',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[1][trainNum][6][j].forEach(member => options.series[seriesIndex].data.push(member) );
    }
  }
  
  drawMareyGraph()
  
}

function initFormData(firstTime){

if(firstTime===true){
  
  timeArrayEast[0] = null
  for (let i = 1; i < numOfStations; i++) {
    let txtFieldId = ''.concat(i,"time")
    timeArrayEast[i] = Number(document.getElementById(txtFieldId).value)
  }
  
  distArray[0] = null
  for (let i = 1; i < numOfStations; i++) {
    //let txtFieldId = ''.concat(i,"size")
    distArray[i] = timeArrayEast[i]  //Number(document.getElementById(txtFieldId).value)
    
  }
  
  stopLen = Number(document.getElementById("stopLen").value)

  //var cumulativeDistEast= [ null,
    //0,
    //distArray[1],
    //distArray[1] + distArray[2],
    //distArray[1] + distArray[2] + distArray[3],
    //distArray[1] + distArray[2] + distArray[3] + distArray[4]
    //];
    
  cumulativeDistEast[0] = 0
  for (let i = 1; i < numOfStations; i++) {
    cumulativeDistEast[i] = cumulativeDistEast[i-1] + distArray[i]
  }
  
  console.log("cumulativeDistEast",cumulativeDistEast)
  console.log("timeArrayEast",timeArrayEast)
  
  let arrayLen = (cumulativeDistEast.length-1)
  for(let i=0; i <=arrayLen; i++){
    cumulativeDistWest[i] = cumulativeDistEast[arrayLen-i]
  }
  
  arrayLen = (timeArrayEast.length-1)
  timeArrayWest[0] = null
  for(let i=0; i <arrayLen; i++){
    timeArrayWest[i+1] = timeArrayEast[arrayLen-i]
  }
  
  console.log("cumulativeDistWest",cumulativeDistWest)
  console.log("timeArrayWest",timeArrayWest)
  
  numIterations = Number(document.getElementById("numIterations").value)
  
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
  
  console.log("stopsArray",stopsArray) 
  
    trainsData[0][1] = []
    trainsData[0][1] = ["E",nextSerie,1,0, JSON.parse(JSON.stringify(speedsArray)), JSON.parse(JSON.stringify(stopsArray)), []]
    if(circular===true){
      trainsData[0][1][6] = newTrainEastCircular(0,1,0,numIterations,trainsData[0][1][4],trainsData[0][1][5])
    }else{
      trainsData[0][1][6] = newTrainEast(0,1,0,numIterations,trainsData[0][1][4],trainsData[0][1][5])
    }
    
    
    options.series[nextSerie] = {name:''.concat("Train ",1," E"),lineColor: 'red',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[0][1][6][j].forEach(member => options.series[nextSerie].data.push(member) );
    }
    
    nextSerie++
    numberOfSeries++
  
    trainsData[1][1] = []
    trainsData[1][1] = ["W",nextSerie,1,0, JSON.parse(JSON.stringify(speedsArray)), JSON.parse(JSON.stringify(stopsArray)), []]
    if(circular===true){
      trainsData[1][1][6] = newTrainWestCircular(1,1,0,numIterations,trainsData[1][1][4],trainsData[1][1][5])
    }else{
      trainsData[1][1][6] = newTrainWest(1,1,0,numIterations,trainsData[1][1][4],trainsData[1][1][5])
    }
    
    options.series[nextSerie] = {name:''.concat("Train ",1," W"),lineColor: 'green',data:[]}
    for(let j=0; j<=(numIterations-1); j++){
      trainsData[1][1][6][j].forEach(member => options.series[nextSerie].data.push(member) );
    }
    
    nextSerie++
    numberOfSeries++
  
  //numberOfSeries = currentSerie -1

  //graphData[0] = []
  //graphData[0] = newTrainEastCircular(0,1,0,numIterations)
  
  //trainsData[1][1][6] = []
  //trainsData[1][1][6] = newTrainWestCircular(1,1,0,numIterations)
  
  //graphData[1] = []
  //graphData[1] = newTrainEastCircular(1,3,70,numIterations)
  //graphData[1] = newTrainWestCircular(1,1,0,numIterations)
  
  let startTimeInput1 = 0 //document.getElementById("train1EstartTimeValue")
  let startTimeInput2 = 0 //document.getElementById("train1WstartTimeValue")
  
  //startTimeInput1.addEventListener("change", changeStartTime)
  //startTimeInput2.addEventListener("change", changeStartTime)
  
  let div1 = document.getElementById("div1")
  div1.style.display = "none";
  
  let div2 = document.getElementById("div2")
  div2.style.display = "inline";
  
  //addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)
  addStationsToTable(1,1,"E",0,false)
  addStationsToTable(1,1,"W",0,false)
  
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

}else{
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

    for(let i=1;i<=numberOfTrainsE; i++){
      let startStation = trainsData[0][i][2]
      let startTime =  trainsData[0][i][3]
      let speedsArray = trainsData[0][i][4]
      let stopsLenghtsArray = trainsData[0][i][5]
      let dataSerie = trainsData[0][i][1]
      trainsData[0][i] = []
      trainsData[0][i] = ["E",dataSerie,startStation,startTime, speedsArray, stopsLenghtsArray, []]
      if(circular===true){
        trainsData[0][i][6] = newTrainEastCircular(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray)
      }else{
        trainsData[0][i][6] = newTrainEast(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray)
      }
    }
    
    for(let i=1;i<=numberOfTrainsW; i++){
      let startStation = trainsData[1][i][2]
      let startTime =  trainsData[1][i][3]
      let speedsArray = trainsData[1][i][4]
      let stopsLenghtsArray = trainsData[1][i][5]
      let dataSerie = trainsData[1][i][1]
      trainsData[1][i] = []
      trainsData[1][i] = ["W",dataSerie,startStation,startTime, speedsArray, stopsLenghtsArray, []]
      if(circular===true){
        trainsData[1][i][6] = newTrainWestCircular(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray)
      }else{
        trainsData[1][i][6] = newTrainWest(dataSerie,startStation,startTime,numIterations,speedsArray,stopsLenghtsArray)
      }
    }
    
    //numberOfSeries = currentSerie
    
  }
  
  drawMareyGraph(numberOfSeries, trainsData)
   
}

function deleteTrain(elemId){
  const elem = document.getElementById(elemId)
  let trainNum = Number(elem.dataset.train)
  let direction = elem.dataset.direction
  let dir
  if(direction=="E"){
    dir = 0
  }else{
    dir = 1
  }
  
  //dataset format:
  //trainsData[dir][trainNum] = [direction,seriesIndex,startStation,startTime ,speeds[], stoplenghts[], seriesData[...]]
  //trainsData[0] = east trains
  //trainsData[1] = west trains
  
  let seriesToDelete = trainsData[dir][trainNum][1]
  
  console.log("delete train n",trainNum,"direction",direction,"in series",seriesToDelete)
  console.log(options.series[seriesToDelete])
  console.log("seriesToDelete",seriesToDelete)
  
  console.log("old trainsetdata",trainsData[dir])
  
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
  
  console.log("new trainsetdata",trainsData[dir])
  
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
    trainsTable = document.getElementById("trainsETable")
    //trainrow = document.getElementById("".concat("train",trainNum,"Erow"))
  }else{
    numTrains = numberOfTrainsW
    numberOfTrainsW--
    trainsTable = document.getElementById("trainsWTable")
    //trainrow = document.getElementById("".concat("train",trainNum,"Wrow"))
  }
  //trainsTable = document.getElementById("trains",direction,"Table")
  //trainrow = document.getElementById("".concat("train",trainNum,direction,"row"))
  
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
      console.log(t)
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
  
  
  console.log("old series",options.series)
  
  options.series.splice(seriesToDelete,1)
  
  console.log("new series",options.series)  
  console.log("new trainsetdata",trainsData[dir])
  
  //addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable)  
  
  for(let t=1;t<=numberOfTrainsE;t++){
    redraw(t,"E")
  }
  for(let t=1;t<=numberOfTrainsW;t++){
    redraw(t,"W")
  }
  
}

function addTrain(){

  const directionRadio = document.getElementsByName("newTraindirection")
  let direction
  let trainNum
  let startTime = Number(document.getElementById("newTrainStartTime").value)
  const startStation = Number(document.getElementById("newTrainStartStationSelect").value)
  
  for(let i=0;i<directionRadio.length; i++){
    if(directionRadio[i].checked){
      direction = directionRadio[i].value
    }
  }
  
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
    trainNum = numberOfTrainsE
    trainsData[0][trainNum] = [direction,nextSerie,startStation,startTime,speedsArray,stopsArray,[]]
    console.log(trainsData[0])
    if(circular===true){
      trainsData[0][trainNum][6] = newTrainEastCircular(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray)
    }else{
      trainsData[0][trainNum][6] = newTrainEast(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray)
    }
    nextSerie++
    numberOfSeries++
  }else{
    numberOfTrainsW++
    trainNum = numberOfTrainsW
    trainsData[1][trainNum] = [direction,nextSerie,startStation,startTime,speedsArray,stopsArray,[]]
    console.log(trainsData[1])
    if(circular===true){
      trainsData[1][trainNum][6] = newTrainWestCircular(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray)
    }else{
      trainsData[1][trainNum][6] = newTrainWest(nextSerie,startStation,startTime,numIterations,speedsArray,stopsArray)
    }
    nextSerie++
    numberOfSeries++
  }
  
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
  
  addStationsToTable(trainNum, startStation, direction, startTime, false)
  
  //drawMareyGraph()
  redraw(trainNum,direction)
  
  console.log("".concat("Train added [direction:",direction," number:",trainNum," start station:",startStation," start time:",startTime,"]"))
  
  document.getElementById("newTrainStartStation1option").selected = true
  document.getElementById("newTrainStartTime").value = 0
}

function addStationsToTable(trainNum, startStation, direction, startTime, appendToExisingTable){
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
    trainlegend.innerHTML = "".concat("Train ",trainNum,"-",direction)
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

  for(let i =0; i <= numOfStations -1; i++){
  
    let axisLabel = ''.concat("Station ",i+1)
    if ((i === numOfStations -1)&&(circular===true)){
      axisLabel = ''.concat("Station ",1)
    }
    let labelOffset = axisLabel.length
  
    //stationNames = {cumulativeDistEast[i]:axisLabel}
    stationNames[cumulativeDistEast[i]] = axisLabel
    //console.log(stationNames)
  
    options.yAxis.plotLines[i] = {
      value: cumulativeDistEast[i],
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

  //console.log(options.tooltip)

}

function plotxasislines(){

  //console.log(options.series[0].data)
  
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

function newTrainWestCircular(seriesIndex,startStation,startTime,nOfIterations ,speedsArray, stopsArray){
  
  let timeArray = timeArrayWest
  let cumulativeDist = []
  
  console.log("timearrayWest ",timeArrayWest)
  console.log("cumulativeDistWest ",cumulativeDistWest)
  
  let tempTimeArrayEast = []
  tempTimeArrayEast[0] = 0
  let tempCumulativeDistEast = []
  tempCumulativeDistEast[0] = 0
    
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      tempTimeArrayEast[i] = Number(toFixed(timeArrayEast[i] * speedMultiplier, 1))
    }else{
      tempTimeArrayEast[i] = timeArrayEast[i]
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
  
  console.log("".concat("new timearrayWest ",timeArray))
  

  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistWest[startStation-1]
    startFrom1st = true
    startFromLast = false
    numOfStationsToHandle = numOfStations
  }else if(startStation === numOfStations){
    
    //make no sense for circular line as last station is station #1
   
  }else{
    startStation = (numOfStations - startStation) +1
    startY = cumulativeDistWest[startStation-1]
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
      console.log("currentStation",currentStation)
      for (let j = 0; j <= ((numOfStationsToHandle *2)-1); j++)  {
        if (j % 2 == 0) {
          if ((i === 0) && (j>1)) {
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[currentStation];
            //console.log("currentStation",currentStation)
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations){
              if(startFrom1st){
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                trainArray[i][j][1] = cumulativeDistWest[currentStation];
                currentStation++
                nextPointIndex++
              }else{
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistWest[currentStation];
                nextPointIndex++
              }
            }        
          }
        } else if (j % 2 != 0) {
          if ((i === 0) && (j>1)) {
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }else{
              currentStopLen = stopsArray[currentStation +1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
            trainArray[i][j][1] = cumulativeDistWest[currentStation];
            currentStation++
            //console.log("currentStation",currentStation)
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations){
              if(startFrom1st){
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistWest[currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                trainArray[i][j][1] = cumulativeDistWest[currentStation];
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
                trainArray[i][0][1] = cumulativeDistWest[currentStation];
                nextPointIndex = 1
              }
            }else if (j==1){
              if(startFrom1st){
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + timeArray[currentStation];
                trainArray[i][1][1] = cumulativeDistWest[currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + currentStopLen;
                trainArray[i][1][1] = cumulativeDistWest[currentStation];
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
          trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -1][0] ,cumulativeDistWest[0]]
        }else{
          trainArray[i][nextPointIndex] = [ trainArray[i][(nextPointIndex) -1][0] ,cumulativeDistWest[0]]
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
            //console.log("Line",((new Error().lineNumber) - line0))
            }else{
              currentStopLen = stopsArray[currentStation +1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + currentStopLen;
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[currentStation];
            currentStation++
          } else if (i > 0 ) {
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
            //console.log("Line",((new Error().lineNumber) - line0))
            }else{
              currentStopLen = stopsArray[currentStation +1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + currentStopLen;
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[currentStation];
            currentStation++
          }
        } else if (j % 2 != 0) {
          if (i === 0) {
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[currentStation];
          } else if (i > 0 ) {
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistWest[currentStation];
          }
        }
      
    }
    
  }
    
  }
  
  console.log(trainArray)
  
  
  
  return trainArray
  
}

function newTrainEastCircular(seriesIndex,startStation,startTime,nOfIterations, speedsArray, stopsArray){
  
  console.log("speeds array E:")
  console.log(speedsArray)
  
  let timeArray = []
  timeArray[0] = 0
  
  console.log("".concat("timearrayEast ",timeArrayEast))
  console.log("".concat("cumulativeDistEast ",cumulativeDistEast))
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      timeArray[i] = Number(toFixed(timeArrayEast[i] * speedMultiplier, 1))
      console.log("".concat("speed multiplier ",speedMultiplier))
    }else{
      timeArray[i] = timeArrayEast[i]
    }
  }
  
  console.log("".concat("new timearrayEast ",timeArray))
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = 0
    startFrom1st = true
    startFromLast = false
    numOfStationsToHandle = numOfStations
  }else if(startStation === numOfStations){
    startY = cumulativeDistEast[startStation]
    numOfStationsToHandle = numOfStations -1
    let startFromLast = true
    startFrom1st = false
  }else{
    startY = cumulativeDistEast[startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    startFromLast = false
  }
  
  //stopsArray[currentStation]
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  //console.log("stopsArray[startStation]=",stopsArray[startStation],"startStation=",startStation)
  //numOfStationsToHandle = 
  let nextPointIndex
  for (let i = 0; i <= (nOfIterations-1); i++) {
    if(!startFromLast){
      //handles stations from startStation to last
      let currentStation = startStation
      for (let j = 0; j <= ((numOfStationsToHandle *2)-1); j++)  {
        let currentStopLen
        //console.log(currentStation)
        if (j % 2 == 0) {
          if ((i === 0) && (j>1)) {
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[currentStation];
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations  ){
              if(startFrom1st){
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                  //console.log("Line",((new Error().lineNumber) - line0))
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                //console.log("Line",((new Error().lineNumber) - line0),"currentStopLen=",currentStopLen,"currentstation=",currentStation)
                trainArray[i][j][1] = cumulativeDistEast[currentStation];
                currentStation++
                nextPointIndex++
              }else {
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistEast[currentStation];
                nextPointIndex++
              }
            }
          }
          
        } else if (j % 2 != 0) {
          if ((i === 0) && (j>1)) {
            //currentStopLen
            if(currentStation == numOfStations -1){
              currentStopLen = stopsArray[1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }else{
              currentStopLen = stopsArray[currentStation +1]
              //console.log("Line",((new Error().lineNumber) - line0))
            }
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
            //console.log("Line",((new Error().lineNumber) - line0),"currentStopLen=",currentStopLen,"currentstation=",currentStation)
            trainArray[i][j][1] = cumulativeDistEast[currentStation];
            currentStation++
            
          } else if ((i > 0 ) && (j>1)) {
            if (currentStation < numOfStations  ){
              if(startFrom1st){
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
                trainArray[i][j][1] = cumulativeDistEast[currentStation];
                nextPointIndex++
              }else {
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                }
                trainArray[i][j] = []
                trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
                //console.log("Line",((new Error().lineNumber) - line0),"currentStopLen=",currentStopLen,"currentstation=",currentStation)
                trainArray[i][j][1] = cumulativeDistEast[currentStation];
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
                trainArray[i][0][1] = cumulativeDistEast[currentStation];
                nextPointIndex = 1
              }
              console.log(trainArray)
            }else if (j==1){
              
              if(startFrom1st){
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + timeArray[currentStation];
                trainArray[i][1][1] = cumulativeDistEast[currentStation];
                nextPointIndex++
              }else{
                if(currentStation == numOfStations -1){
                  currentStopLen = stopsArray[1]
                }else{
                  currentStopLen = stopsArray[currentStation +1]
                }
                trainArray[i][1] = []
                trainArray[i][1][0] = trainArray[i][0][0] + currentStopLen;
                //console.log("Line",((new Error().lineNumber) - line0),"currentStopLen=",currentStopLen,"currentstation=",currentStation)
                trainArray[i][1][1] = cumulativeDistEast[currentStation];
                currentStation++
                nextPointIndex++
              }
              //console.log(trainArray)
            }
          }
        }
        
      }
    }
    
    //console.log(trainArray)
    
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
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[currentStation];
            currentStation++
            //console.log(trainArray)
          } else if (i > 0 ) {
            
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] + stopsArray[currentStation + 1];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[currentStation];
            currentStation++
            //console.log(trainArray)
            
          }
        
        } else if (j % 2 != 0) {
          if (i === 0) {
            //console.log(nextPointIndex+j)
            //console.log(trainArray[i][(nextPointIndex+j)-1][0])
            //console.log(currentStation)
            //console.log(timeArray[currentStation])
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[currentStation];
            //console.log(trainArray)
          } else if (i > 0 ) {
            if (currentStation < numOfStations ){
              
            }
            trainArray[i][nextPointIndex+j] = []
            trainArray[i][nextPointIndex+j][0] = trainArray[i][(nextPointIndex+j)-1][0] +timeArray[currentStation];
            trainArray[i][nextPointIndex+j][1] = cumulativeDistEast[currentStation];
            //console.log(trainArray)
          }
        }
      }
    
    }
  }
  
 console.log(trainArray)
 
  
  
  return trainArray
  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function newTrainWest(seriesIndex,startStation,startTime,nOfIterations ,speedsArray, stopsArray){
  
  console.log("speeds array W:")
  console.log(speedsArray)
  
  let timeArray = timeArrayWest
  let cumulativeDist = []
  
  console.log("timearrayWest ",timeArrayWest)
  console.log("cumulativeDistWest ",cumulativeDistWest)
  
  let tempTimeArrayEast = []
  tempTimeArrayEast[0] = 0
  let tempCumulativeDistEast = []
  tempCumulativeDistEast[0] = 0
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      tempTimeArrayEast[i] = Number(toFixed(timeArrayEast[i] * speedMultiplier, 1))
    }else{
      tempTimeArrayEast[i] = timeArrayEast[i]
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
  
  console.log("".concat("new timearrayWest ",timeArray))
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  //let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = cumulativeDistWest[startStation-1]
    startFrom1st = true
    //startFromLast = false
    numOfStationsToHandle = numOfStations
  //}else if(startStation === numOfStations){
    //Not circular line becomes a west train if starting from last station
  }else{
    startStation = (numOfStations - startStation) +1
    startY = cumulativeDistWest[startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    //startFromLast = false
  }
  console.log("numOfStationsToHandle=",numOfStationsToHandle,"startStation=",startStation,"numOfStations=",numOfStations)
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  let nextPointIndex = 0
  let currentStation = startStation
  for (let i = 0; i <= (nOfIterations-1); i++) {
    //handles stations from startStation to last
    let startingIndex = nextPointIndex
    console.log("========WEST=======STARING ITERATION N.",i," startingIndex=",startingIndex)
    
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
          trainArray[i][j][1] = cumulativeDistWest[currentStation];
        }else if (j % 2 != 0) {
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistWest[currentStation];
          currentStation++
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      console.log("nextpoindIndex",nextPointIndex)
      console.log("looping back, i=",i)
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let seriesindex = startingIndex + j
        //console.log("seriesindex",seriesindex,"i=",i,"currentstation=",currentStation)
        //console.log("trainArray[i][seriesindex-1]=",trainArray[i][seriesindex-1])
        if (j % 2 == 0) {
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistWest[currentStation-2];
          //console.log("============A")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(timeArray[currentStation-1]))
          //console.log("1=",(cumulativeDistWest[currentStation-2]))
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistWest[currentStation-2];
          currentStation--
          //console.log("============B")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(currentStopLen))
          //console.log("1=",(cumulativeDistWest[currentStation-2]))
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
             console.log("i=",i,"j=",j)
            trainArray[i] = []
            trainArray[i][j] = []
            //console.log(trainArray[i-1][startingIndex-1])
            trainArray[i][j][0] = trainArray[i-1][startingIndex-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[currentStation];
            console.log(trainArray[i])
          }else{
            console.log("i=",i,"j=",j)
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistWest[currentStation];
            console.log(trainArray[i])
          }
        }else if (j % 2 != 0) {
          console.log("i=",i,"j=",j)
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistWest[currentStation];
          currentStation++
          console.log(trainArray[i])
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      console.log("nextpoindIndex",nextPointIndex)
      console.log("looping back, i=",i)
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        
        let currentStopLen
        let seriesindex = startingIndex + j
        //console.log("seriesindex",seriesindex,"i=",i,"currentstation=",currentStation)
        //console.log("trainArray[i][seriesindex-1]=",trainArray[i][seriesindex-1])
        if (j % 2 == 0) {
          console.log("i=",i,"j=",j)
          trainArray[i][seriesindex] = []
          //console.log("=============",trainArray[i][seriesindex-1])
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistWest[currentStation-2];
          //console.log("============A")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(timeArray[currentStation-1]))
          //console.log("1=",(cumulativeDistWest[currentStation-2]))
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          console.log("i=",i,"j=",j)
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistWest[currentStation-2];
          currentStation--
          //console.log("============B")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(currentStopLen))
          //console.log("1=",(cumulativeDistWest[currentStation-2]))
        }
        nextPointIndex++
      }
    }
  }
  
  console.log("WEST",trainArray)
  return trainArray
  
}

function newTrainEast(seriesIndex,startStation,startTime,nOfIterations, speedsArray, stopsArray){
  
  console.log("speeds array E:")
  console.log(speedsArray)
  
  let timeArray = []
  timeArray[0] = 0
  
  console.log("".concat("timearrayEast ",timeArrayEast))
  console.log("".concat("cumulativeDistEast ",cumulativeDistEast))
  
  for(let i=1; i<numOfStations; i++){
    if(speedsArray[i] < 100){
      let speedMultiplier = 100 / speedsArray[i]
      timeArray[i] = Number(toFixed(timeArrayEast[i] * speedMultiplier, 1))
      console.log("".concat("speed multiplier ",speedMultiplier))
    }else{
      timeArray[i] = timeArrayEast[i]
    }
  }
  
  console.log("".concat("new timearrayEast ",timeArray))
  
  let trainArray = []
  trainArray[0] = []
  let startY
  let numOfStationsToHandle
  //let startFromLast
  let startFrom1st
  if (startStation === 1){
    startY = 0
    startFrom1st = true
    //startFromLast = false
    numOfStationsToHandle = numOfStations
  //}else if(startStation === numOfStations){
    //Not circular line becomes a west train if starting from last station
  }else{
    startY = cumulativeDistEast[startStation-1]
    numOfStationsToHandle = numOfStations - (startStation-1)
    startFrom1st = false
    //startFromLast = false
  }
  console.log("numOfStationsToHandle=",numOfStationsToHandle,"startStation=",startStation,"numOfStations=",numOfStations)
  
  trainArray[0] = [[startTime, startY],[(startTime+stopsArray[startStation]), startY]]
  let nextPointIndex = 0
  let currentStation = startStation
  for (let i = 0; i <= (nOfIterations-1); i++) {
    //handles stations from startStation to last
    let startingIndex = nextPointIndex
    console.log("===============STARING ITERATION N.",i," startingIndex=",startingIndex)
    
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
          trainArray[i][j][1] = cumulativeDistEast[currentStation];
        }else if (j % 2 != 0) {
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          //console.log("===========================",trainArray[i][j-1],"currentstoplen",currentStopLen)
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistEast[currentStation];
          currentStation++
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      console.log("nextpoindIndex",nextPointIndex)
      console.log("looping back, i=",i)
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        let currentStopLen
        let seriesindex = startingIndex + j
        //console.log("seriesindex",seriesindex,"i=",i,"currentstation=",currentStation)
        //console.log("trainArray[i][seriesindex-1]=",trainArray[i][seriesindex-1])
        if (j % 2 == 0) {
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistEast[currentStation-2];
          //console.log("============A")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(timeArray[currentStation-1]))
          //console.log("1=",(cumulativeDistEast[currentStation-2]))
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistEast[currentStation-2];
          currentStation--
          //console.log("============B")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(currentStopLen))
          //console.log("1=",(cumulativeDistEast[currentStation-2]))
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
             console.log("i=",i,"j=",j)
            trainArray[i] = []
            trainArray[i][j] = []
            //console.log(trainArray[i-1][startingIndex-1])
            trainArray[i][j][0] = trainArray[i-1][startingIndex-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[currentStation];
            console.log(trainArray[i])
          }else{
            console.log("i=",i,"j=",j)
            trainArray[i][j] = []
            trainArray[i][j][0] = trainArray[i][j-1][0] + timeArray[currentStation];
            trainArray[i][j][1] = cumulativeDistEast[currentStation];
            console.log(trainArray[i])
          }
        }else if (j % 2 != 0) {
          console.log("i=",i,"j=",j)
          currentStopLen = stopsArray[currentStation +1]
          trainArray[i][j] = []
          trainArray[i][j][0] = trainArray[i][j-1][0] + currentStopLen;
          trainArray[i][j][1] = cumulativeDistEast[currentStation];
          currentStation++
          console.log(trainArray[i])
        }
        nextPointIndex++
      }
      currentStation = numOfStations
      console.log("nextpoindIndex",nextPointIndex)
      console.log("looping back, i=",i)
      startingIndex = nextPointIndex
      //looping back
      for (let j = 0; j <= ((numOfStations *2)-3); j++)  {
        
        let currentStopLen
        let seriesindex = startingIndex + j
        //console.log("seriesindex",seriesindex,"i=",i,"currentstation=",currentStation)
        //console.log("trainArray[i][seriesindex-1]=",trainArray[i][seriesindex-1])
        if (j % 2 == 0) {
          console.log("i=",i,"j=",j)
          trainArray[i][seriesindex] = []
          //console.log("=============",trainArray[i][seriesindex-1])
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + timeArray[currentStation-1];
          trainArray[i][seriesindex][1] = cumulativeDistEast[currentStation-2];
          //console.log("============A")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(timeArray[currentStation-1]))
          //console.log("1=",(cumulativeDistEast[currentStation-2]))
        }else if (j % 2 != 0) {
          //if(currentStation == 1){
            //currentStopLen = stopsArray[1]
          //}else{
            currentStopLen = stopsArray[currentStation - 1]
          //}
          console.log("i=",i,"j=",j)
          trainArray[i][seriesindex] = []
          trainArray[i][seriesindex][0] = trainArray[i][seriesindex-1][0] + currentStopLen;
          trainArray[i][seriesindex][1] = cumulativeDistEast[currentStation-2];
          currentStation--
          //console.log("============B")
          //console.log("0=",(trainArray[i][seriesindex-1][0]),"+",(currentStopLen))
          //console.log("1=",(cumulativeDistEast[currentStation-2]))
        }
        nextPointIndex++
      }
    }
  }
  
  console.log(trainArray)
  return trainArray
  
}
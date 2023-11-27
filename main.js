var objects = []
var modelStatus = false

function setup(){
    canvas = createCanvas(800, 600)
    canvas.parent("canvas")
    video = createCapture(VIDEO)
    video.size(800, 600)
    video.hide()
}
function modelLoaded(){
    console.log("Modelo carregado!")  
    modelStatus = true
}
function preload(){
alarme = loadSound("alarm-car-or-home-62554.mp3")
}
function iniciar(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("resultStatus").innerHTML = "Status: Detectando objetos"
}
function gotResults(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results
    }
}
function draw(){
    image(video, 0, 0, 800, 600)
if(modelStatus == true){
    objectDetector.detect(video, gotResults)
      //for(inicio; fim; incremento)
    for (i = 0; i < objects.length; i++){
        fill("red")
        console.log(i)
        percent = floor(objects[i].confidence * 100)
        text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y)
        textSize(30)
        noFill()
        stroke("red")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        document.getElementById("resultStatus").innerHTML = "Status: " + objects.length

        if(objects[i].label == "person"){
document.getElementById("resultPessoas").innerHTML = "Status: bêbe detectado"
alarme.stop()
        }
        else{
document.getElementById("resultPessoas").innerHTML = "Status: bêbe não detectado"
alarme.play()
        }
        }
    if(objects.length == 0 ){
document.getElementById("resultPessoas").innerHTML = "Status: bêbe não detectado"
alarme.play()
}
}
}
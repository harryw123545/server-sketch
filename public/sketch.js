var socket;
var blob;
var clientCount = [];
let zoff = 0;
let shapeSize;

function setup() {
    

  createCanvas(windowWidth, windowHeight);
    socket = io.connect('http://localhost:3000');
    
    blob = new Blobs(width/2, height/2, 1);
    

    socket.on('mouse', newDrawing);
    
    console.log('add count listener')
    socket.on('count', count => {
        clientCount.push(count);
        //console.log("clientCount: " + clientCount.length);
        shapeSize = clientCount.length;
        console.log("shapeSize: " + shapeSize);

    })
    
    noCursor();
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 16, 16);
}



function draw() {
    
     background(0, 20);
    
     blob.update();
     blob.display();   
    
    
    
    zoff += 0.01;
    
    var data = {
        x: mouseX,
        y: mouseY
    }
    
    //console.log('Sending: ' + mouseX, mouseY);
    
    socket.emit('mouse', data);
    
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 16, 16);
    
       
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  blob.update();
  blob.display();
}
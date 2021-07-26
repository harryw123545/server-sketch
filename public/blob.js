class Blobs {
          constructor(x, y, d){
            this.posX = x;
            this.posY = y;
            this.diameter = d;
            this.noiseMax = 0;
            this.iter;
            this.time;
            this.offset;
            this.r;
            this.pointX;
            this.pointY;
            this.xoff;
            this.yoff;
            this.offsetSin = random(0, 180);
          }

          update() {
            this.time = frameCount*0.04;
            //this.iter = map(mouseX, 0, width, 0.1, 0.9);
            this.iter = clientCount*0.25;
            this.noiseMax = clientCount*0.5 % 25;
          }

            display() {

                push();
                translate(this.posX, this.posY);
                scale(this.diameter);
                //console.log("test");
                beginShape();
              
                for(this.a = 0; this.a < TWO_PI; this.a += 0.1){

                    noStroke();
                    fill(127 + 127 * sin(this.a * this.diameter * (this.iter+0.2) + this.time), 127 + 127 * sin(this.a * this.diameter * (this.iter+0.1) + this.time), 127 + 127 * sin(this.a * this.diameter * (this.iter+0.01) + this.time));
                    
                    this.xoff = map(cos(this.a), -1, 1, 0, this.noiseMax);
                    this.yoff = map(sin(this.a), -1, 1, 0, this.noiseMax);
                    
                    this.offset = map(sin(this.a * 0.001 + frameCount * 0.1), -1, 1, -5, 5);
                    this.r = map(noise(this.xoff, this.yoff, zoff), 0, 1, 25, 300) + this.offset;
                    this.pointX = this.r * cos(this.a);
                    this.pointY = this.r * sin(this.a);
                    curveVertex(this.pointX, this.pointY);

                }
              
                endShape(CLOSE);
                
                pop();
                
                
              if(this.diameter > 0.001){
                this.blob = new Blobs(this.posX, this.posY, this.diameter-0.02);
                this.blob.update();
                this.blob.display();
              }
          }
      }
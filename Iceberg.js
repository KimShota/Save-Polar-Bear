class Iceberg {
  constructor(_x, _y, _w, _h) {
    this.x = _x; //x position of ice berg
    this.y = _y; //y position of ice berg 
    this.w = _w; //width of ice berg
    this.h = _h; //height of ice berg 
    this.melting = false; //boolean to indicate if melting or not
    this.melted = false; //boolean to indicate if melted or not
    
    //keep the original width and height for restoration
    this.originalW = _w; 
    this.originalH = _h; 
  }

  //display icebergs 
  display() {
    //if it is not melted, display 
    if (!this.melted) {
      fill("skyblue");
      stroke(100);
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.h);
    }
  }


  //function to mark icebergs melting 
  startMelting() {
    this.melting = true;
  }

  //make the ice berg smaller gradually
  melt() {
    if (this.melting && this.w > 0 && this.h > 0) {
      this.w -= 0.5; //how fast ice berg melts 
      this.h -= 0.5;
    } 
    //melt ice berg completely and mark it as melted 
    else if (this.melting && (this.w <= 0 || this.h <= 0)){
      this.melted = true; 
      this.melting = false; 
      this.w = this.originalW; 
      this.h = this.originalH; 
    }
  }
  
  //function to restore some icebergs 
  restore(){
    this.w = this.originalW;
    this.h = this.originalH; 
    this.melting = false; 
    this.melted = false; 
  }
}
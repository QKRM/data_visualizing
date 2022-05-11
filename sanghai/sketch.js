let data;
let markers = [];
let names = [];
let means = [];
let addrs = [];

class Marker {
  constructor(x,y,i) {
    this.x = x;
    this.y = y;
    this.i = i;
  }
  
  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if(d < 20){
        strokeWeight(2);
        let tmp_x = this.x;
        let tmp_y = this.y;
        if(this.x > width - 200)
        {
          tmp_x = this.x - 200;
        }
        if(this.y > height - 160)
        {
          tmp_y = this.y - 160;
        }
        rect(tmp_x+10,tmp_y+10,200,40)
        text(names[this.i],tmp_x+15,tmp_y+15,200,40);
        rect(tmp_x+10,tmp_y+50,200,80)
        text(means[this.i],tmp_x+15,tmp_y+55,200,80);
        rect(tmp_x+10,tmp_y+130,200,40)
        text(addrs[this.i],tmp_x+15,tmp_y+135,200,40);
    }
  }
  
  show () {
    image(flagImage,this.x - 16,this.y-16);
  }
  
}




function preload() {
  data = loadTable("sanghai_data.csv","csv","header");
  bgImage = loadImage("sanghai.png");
  flagImage = loadImage("flag.png");
}
function setup() {
  
  createCanvas(810, 831);
  background(bgImage,255);
  let numRows = data.getRowCount();
  let lng = data.getColumn("long");
  let lat = data.getColumn("lat");
  let name = data.getColumn("name_kor");
  let mean = data.getColumn("means");
  let addr = data.getColumn("addr_kor");
  let maxLng = max(lng);
  let minLng = min(lng);
  let maxLat = max(lat);
  let minLat = min(lat);
  

  for(let i = 0; i < numRows; i++){
    let mapLng = map(lng[i], minLng,maxLng,16,752);
    let mapLat = map(lat[i],minLat,maxLat,801,60);
    names[i] = name[i];
    means[i] = mean[i];
    addrs[i] = addr[i];
    markers[i] = new Marker(mapLng,mapLat,i); 
  }
  
    markers.forEach(marker => {
    marker.show();
  });
}

function mousePressed() {
  clear();
  background(bgImage,255);  
    markers.forEach(marker => {
    marker.show();
  });
    markers.forEach(marker => {
    marker.clicked();
  });
      
}

function draw() {

}
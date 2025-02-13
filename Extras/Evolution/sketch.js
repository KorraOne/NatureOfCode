let goobers = [], gooberCount = 1;
let lakes = [], lakeCount = 1;

function setup() {
  createCanvas(900, 900);

  // for (let i=0; i<gooberCount; i++) {
  //   goobers.push(new Goober(500, 100));
  // }

  // for (let i=0; i<lakeCount; i++) {
  //   lakes.push(new lake(400, 400));
  // }
  
  goobers.push(new Goober(500, 100));
  goobers.push(new Goober(500, 100));
  goobers.push(new Goober(500, 100));
  goobers.push(new Goober(500, 100));

  lakes.push(new lake(300, 300));
  lakes.push(new lake(400, 300));
  lakes.push(new lake(500, 300));
  lakes.push(new lake(800, 300));
  lakes.push(new lake(200, 400));
  lakes.push(new lake(400, 400));
  lakes.push(new lake(500, 400));
  lakes.push(new lake(800, 400));
}

function draw() {
  background(19, 133, 16);

  for (lake of lakes) {
    lake.show();
  }

  for (goober of goobers) {
    goober.run();
  }
}

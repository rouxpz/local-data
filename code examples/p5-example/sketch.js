var data;
var circles = [];

//load the JSON file in the preload function
function preload() {
  data = loadJSON("data/example-data.json");
}

function setup() {
  createCanvas(1000, 120);
  loadData();
}

function draw() {
  // put drawing code here
  background(255);

  for (var i = 0; i < circles.length; i++) {
    circles[i].rollover(mouseX, mouseY);
    circles[i].display();
  }
}

//here is where we take the data file and actually parse it
function loadData() {
  let entries = data['data'];
  for (var i = 0; i < entries.length; i++) {
    var tempX = i*100 + 50;
    var tempY = 60;

    //assigning values to the circles dependent on the data from the JSON
    var d = entries[i]['food'].length * 5;
    var j = entries[i]['journal'];
    var dt = entries[i]['date'];

    //create a new circle and add it to our array
    var c = new Circle(tempX, tempY, d, j, dt);
    circles.push(c);
  }
}

//creating a class for the circles we are drawing from the data
class Circle {
  constructor(x, y, diameter, journal, date) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.journal = journal;
    this.date = date;

    this.over = false;
  }

  //checking to see if the mouse is over the circle or not
  rollover (px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.radius) {
      this.over = true;
    } else {
      this.over = false;
    }
  }

  //displaying the circles, and displaying the date if the appropriate circle is rolled over
  display() {
    noStroke();
    fill(128,0,128);
    ellipse(this.x, this.y, this.diameter, this.diameter);

    if (this.over) {
      document.getElementById("dateOfEntry").innerHTML = this.date;
    }
  }

  //displaying the appropriate journal entry if the right circle is clicked on
  showJournal() {
    if (this.over) {
      document.getElementById('journalDescription').innerHTML = this.journal;
    }
  }
}

//runs every time the mouse is pressed
function mousePressed() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].showJournal();
  }
}

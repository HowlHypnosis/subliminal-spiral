// Words to be displayed. Source: https://hypno.nimja.com/visual
const words = ["blank","bliss","blissfully","calm","calmer","deep","deeper","desire",
"drifting","drop","empty","empty mind","floating","follow","keep looking","keep reading",
"keep staring","keep watching","no thoughts","relax","sinking","stare","always aroused",
"always horny","aroused being seen","be seen","crave","display","love","need to","seen",
"show off","show skin","showing off","skin","your body","be good","behave","down",
"good pet","obey","sit","very good","well done"];

// Show a word every wordFreq frames, lasting for wordDuration frames.
const wordFreq = 3 * 60
const wordDuration = 0.25 * 60

// Set-up Canvas
function setup() {
    createCanvas(windowWidth, windowHeight);
  
    rectMode(RADIUS);
  }

// Draw a word to the screen with correct opacity and randomness.
function draw_text() {
    push()

    // 100% opacity for the first wordDuration frames, 0% for the rest.
    opacity = (frameCount % wordFreq) < wordDuration;

    // Set to a white stroke
    fill(255, 255, 255, 255 * opacity);
    stroke(255, 255, 255, 255 * opacity);

    // Set font to be bold, monospaced, and centred.
    textFont('monospace')
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    // TODO: Get random words.
    word = "drop"
    // if((frameCount % wordFreq) == wordDuration) {
    //     word = words[Math.floor(Math.random() * words.length)]
    // }
    // Write the text
    text(word, 0,0);

    pop()
}
  
function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Set which spiral to use. Uncomment the line to use that spiral.
draw_spiral = draw_square_spiral
// draw_spiral = draw_curve_spiral

function draw() {
    background(0)
  
    // Rotate the centre around a 25 unit radius every 10s.
    moving_centre(10*60, 25);
  
    draw_spiral()
  
    draw_text()

    // Uncomment to save a single screenshot.
    // if(frameCount == 1) {
    //   saveCanvas("capture")
    // }
  
  }
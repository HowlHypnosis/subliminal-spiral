// Words to be displayed. Source: https://hypno.nimja.com/visual
const words = ["blank","bliss","calm","calmer","deep","deeper","desire",
"drifting","drop","empty","empty mind","floating","follow","keep looking","keep reading",
"keep staring","keep watching","no thoughts","relax","sinking","stare","always aroused",
"always horny","be seen","crave","display","love","need to","seen",
"show off","show skin","showing off","skin","your body","be good","behave","down",
"good pet","obey","sit","very good","well done"];

// Show a word every wordFreq frames, lasting for wordDuration frames.
const wordFreq = 2 * FPS // TODO: Random frequency
const wordDuration = 0.5 * FPS
const max_opacity = 0.9

const useRandomWords = false
const useLiveWordMode = true

var nextWord
var word

// Set-up Canvas
function setup() {
    createCanvas(windowWidth, windowHeight);
  
    frameRate(FPS)
    rectMode(RADIUS);

    // Initialse one of the two methods of getting words
    if (useRandomWords) {
      word = words[Math.floor(Math.random() * words.length)]
    }
    if (useLiveWordMode) {
      start_word_fetch()
    }
  }

// Draw a word to the screen with correct opacity and randomness.
function draw_text() {
    push()

    // Hide word except during the first wordDuration frames
    show_word = (frameCount % wordFreq) < wordDuration;

    // Opacity is a sine wave with zeros at the start and end of the enable period.
    // opacity = max_opacity * show_word * Math.sin((1 + ((frameCount % wordFreq) / wordDuration)) * Math.PI / 2)
    // Opacity is a sine wave with max at first and zero at end of the enable period. Gives a "harder" flash.
    opacity = max_opacity * show_word * Math.sin((1 + ((frameCount % wordFreq) / wordDuration)) * Math.PI / 2)
    

    // Set to a white stroke
    fill(255, 255, 255, 255 * opacity);
    stroke(255, 255, 255, 0);

    // Set font to be bold, monospaced, and centred.
    textFont('monospace')
    textSize(75);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    // Determine the next word when it's not visable.
    if((frameCount % wordFreq) > wordDuration) {
        if (useRandomWords) {
          word = words[Math.floor(Math.random() * words.length)]
        } 
        if (useLiveWordMode) {
          word = nextWord
        }
      }
    // Write the text
    text(word, 0,0);

    pop()
}
  
function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
    // saveFrames('out', 'png', 1, 30, //data => {
    //  print(data);
    //});
    // );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw_spiral() {
  push();

  // Set which spiral to use. Uncomment the line to use that spiral.
  // draw_square_spiral()
  draw_curve_spiral()
  // draw_dot_spiral()

  pop();
}

function draw() {
    background(0)
    stroke(0);
      
  
    // Rotate the centre around a 25 unit radius every 10s.
    // moving_centre(10*FPS, 25);
    stationary_centre();

    draw_spiral()
  
    draw_text()

    // Uncomment to save a single screenshot.
    // if(frameCount == 1) {
    //   saveCanvas("capture")
    // }
  
}

// Words to be displayed. Source: https://hypno.nimja.com/visual
const words = ["blank","bliss","calm","calmer","deep","deeper","desire", "drooling", "melt for me",
"drifting","drop","empty","empty mind","floating","follow","keep looking","keep reading",
"keep staring","keep watching","no thoughts","relax","sinking","stare","always aroused",
"always horny","be seen","crave","display","love","need to","seen",
"show off","show skin","showing off","skin","your body","be good","behave","down",
"good pet","obey","sit","very good","well done"];

// Show a word every wordFreq frames, lasting for wordDuration frames.
const wordFreq = 3 * parameters["fps"]
const wordDuration = 0.5 * parameters["fps"]
const max_opacity = 0.9

var word

// Set-up Canvas
function setup() {
    createCanvas(windowWidth, windowHeight);
  
    frameRate(parameters["fps"])
    rectMode(RADIUS);

    // Initialse one of the two methods of getting words
    if (parameters["subliminal_mode"] == "random") {
      word = words[Math.floor(Math.random() * words.length)]
    }
    if (parameters["subliminal_mode"] == "script") {
      fetch('scripts/' + parameters["subliminal_scriptName"] + ".hypno")
        .then(response => response.text())
        .then(text => scriptWords = text.split('\n'))
  // outputs the content of the text file
    }
    if (parameters["subliminal_mode"] == "live") {
      single_word_fetch()
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
    textSize(width / 25);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    // Determine the next word when it's not visable.
    if((frameCount % wordFreq) == wordDuration) {
        if (parameters["subliminal_mode"] == "random") {
          word = words[Math.floor(Math.random() * words.length)]
        } 
        if (parameters["subliminal_mode"] == "script") {
          word = scriptWords.shift()
        }
        if(parameters["subliminal_mode"] == "live") {
          single_word_fetch()
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

function draw_spiral(spiral_style) {
  push();

  if (spiral_style == "square") {
    draw_square_spiral()
  } else if (spiral_style == "dot") {
    draw_dot_spiral()
  } else if (spiral_style == "curve") {
    draw_curve_spiral()
  } else {
    throw "Invalid spiral" + spiral_style
  }

  pop();
}

function draw() {
    background("black")
    stroke("black");
      
  
    // Rotate the centre around a 25 unit radius every 10s.
    // moving_centre(10*parameters["fps"], 25);
    stationary_centre();

    draw_spiral(parameters["spiral"])
  
    draw_text()

    // Uncomment to save a single screenshot.
    // if(frameCount == 1) {
    //   saveCanvas("capture")
    // }
  
}

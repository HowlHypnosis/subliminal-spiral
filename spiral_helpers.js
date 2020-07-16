// Centre the canvas in the middle of the screen.
function stationary_centre() {
    translate(width / 2, 
              height / 2);
}

// Move the centre of the canvas in a circle, completing a rotation every `frequency` frames.
function moving_centre(frequency, offset) {
    translate(width / 2 + offset*cos(2 * PI * frameCount / frequency), 
              height / 2 + offset*sin(2 * PI * frameCount / frequency));
}
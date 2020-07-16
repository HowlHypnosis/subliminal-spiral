// Number of degrees to rotate the spiral per frame
const ROTATION_DEGREES = 3;

function draw_curve_spiral() {

  // Rotate the spiral every frame
  rotate(radians(frameCount * ROTATION_DEGREES));

  strokeWeight(5)
  noFill();

  for (i=0; i < 200; i++) {

    stroke("yellow")
    arc(0,0, 10 * i, 10 * i, i/2, (i/2) + 0.5)

    stroke("purple")
    arc(0,0, 10 * i, 10 * i, PI + i/2, PI + (i/2) + 0.5)
  }
}

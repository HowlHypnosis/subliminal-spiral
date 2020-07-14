// Draw a set of squares moving inwards from the first width to the second width.
function draw_inner_set(start_width, end_width) {
  // Have one square every 20 widths (giving even spacing in the negative).
  num = (start_width - end_width) / 20;

  // Each spiral offset by 20 units to fit the correct number.
  for (i = 0; i < num; i++) {
    draw_inner_rect(i * 20, start_width, end_width);
  }

}

// Draw a square moving inwards from the first width to the second width
function draw_inner_rect(offset, start_width, end_width) {
  width_diff = start_width - end_width

  frameStep = frameCount + offset

  // stroke(5, 255 * (1 - ((frameStep % 300) / 150)), 255 * (frameStep % 300) / 150);
  rect(0, 0, start_width - ((frameStep) % width_diff), start_width - ((frameStep) % width_diff));
}

// Draw a set of squares moving outwards from the first width to the second width.
function draw_outer_set(start_width, end_width) {
  // Have one square every 20 widths (giving even spacing in the negative).
  num = (end_width - start_width) / 20;

  // Each spiral offset by 20 units to fit the correct number.
  for (i = 0; i < num; i++) {
    draw_outer_rect(i * 20, start_width, end_width);
  }

}


// Draw a square moving outwards from the first width to the second width
function draw_outer_rect(offset, start_width, end_width){

  width_diff = end_width - start_width

  frameStep = frameCount + offset

  // stroke(5, 255 * (0.5 + ((frameStep % 500) / 1000)), 255 * (0.5 - (frameStep % 500) / 1000));
  rect(0, 0, start_width + ((frameStep) % width_diff), start_width + ((frameStep) % width_diff));
}


function draw_square_spiral() {
  push();

  // Set up stroke and rectangle mode.
  noFill();
  colorMode(HSB);
  strokeWeight(10);
  stroke("red")
  strokeJoin(ROUND);
  rectMode(RADIUS);

  background(0);

  // Swap from inwards to outwards at 200 pixels.
  draw_inner_set(200, 0)
  draw_outer_set(200, 1000)
  pop();
}
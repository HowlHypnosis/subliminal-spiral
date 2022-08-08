const hue = 300;

// Draw a set of squares moving inwards from the first width to the second width.
function draw_inner_set(start_width, end_width) {
  // Have one square every approximate 20 widths (giving even spacing in the negative).
  num = Math.round((start_width - end_width) / 20);

  // Recalculate distance to evenly space them
  distance = (start_width - end_width) / num;

  // Each spiral offset by 20 units to fit the correct number.
  for (i = 0; i < num; i++) {
    draw_inner_rect(i * distance, start_width, end_width);
  }

}

// Draw a square moving inwards from the first width to the second width
function draw_inner_rect(offset, start_width, end_width) {
  width_diff = start_width - end_width

  frameStep = frameCount + offset

  stroke(hue, 100 * Math.sqrt((1-(((frameStep) % width_diff))/width_diff)),  100);
  rect(0, 0, start_width - ((frameStep) % width_diff), start_width - ((frameStep) % width_diff));
}

// Draw a set of squares moving outwards from the first width to the second width.
function draw_outer_set(start_width, end_width) {
  
  // Have one square every approximate 20 widths (giving even spacing in the negative).
  num = Math.round((end_width - start_width) / 20);

  // Recalculate distance to evenly space them
  distance = (end_width - start_width) / num;

  // Each spiral offset by 20 units to fit the correct number.
  for (i = 0; i < num; i++) {
    draw_outer_rect(i * distance, start_width, end_width);
  }

}


// Draw a square moving outwards from the first width to the second width
function draw_outer_rect(offset, start_width, end_width){

  width_diff = end_width - start_width

  frameStep = frameCount + offset

  stroke(hue, 100, 100 * Math.sqrt(1-(((frameStep) % width_diff))/width_diff));
  rect(0, 0, start_width + ((frameStep) % width_diff), start_width + ((frameStep) % width_diff));
}


function draw_square_spiral() {
  // Set up stroke and rectangle mode.
  noFill();
  colorMode(HSB);
  strokeWeight(5);
  strokeJoin(ROUND);
  rectMode(RADIUS);

  outer_boundary = max(width, height)
  spiral_reverse_point = 0.1 * outer_boundary

  // Swap from inwards to outwards at 200 pixels.
  draw_inner_set(spiral_reverse_point, 0)
  draw_outer_set(spiral_reverse_point, outer_boundary/(1.9))
}

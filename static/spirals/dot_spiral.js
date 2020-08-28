function draw_ring(radius, count, frequency, reverse) {
    offset_angle = 2 * PI / count;

    for (i=0; i < count; i++) {

        angle = i*offset_angle + (2 * PI * ((frameCount % frequency) / frequency)) * (reverse ? 1 : -1)
        point(radius*cos(angle), radius*sin(angle))

    }
}

function draw_dot_spiral() {

    stroke("green")
    strokeWeight(5)

    for (j = 1; j <= 100; j++) {
        // Draw rings with increasing radius, with frequencies prime, and alternating direction
        // draw_ring(25*j, 10, primes[j-1] * 30, j % 2 == 0)
        draw_ring(10*j, 10, primes[j+30]*3, j % 2 == 0)
    }
}
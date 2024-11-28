function fallingBall(d, v0, a) {
    let time = (-v0 + (v0 ** 2 + 2 * a * d) ** 0.5) / a;
    return time;
}

function movingBall(vy0, vx0, a) {
    let t = vy0 / a; // time it takes to get to the apex.
    let peak_y = (vy0 * t) + (0.5 * -a * t**2); // the height at the apex. -a because it's decelerating as it goes up.
    let peak_x = vx0 * t; // the horizontal distance covered at the apex.
    let x = peak_x * 2;
    return [t, x, peak_y];
}

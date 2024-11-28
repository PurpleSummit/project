function fallingBallAnim(id, height) {
    // height is the distance the ball should be from the ceiling.
    var i = null;
    var elem = document.getElementById(id);
    // move is how far the ball is from the ceiling right now
    var move = getStyle(elem, "top");
    // animating
    clearInterval(i);
    // call function frame every 1 ms
    i = setInterval(frame, 1);
    function frame() {
        if (move == height) {
            // when the distance from the ceiling is achieved, stop the animation
            clearInterval(i);
            return;
        } else {
            // else keep on distancing from the ceiling
            move++;
            elem.style.top = move + 'px';
        }
    }
    return;
}


function movingBallAnim(id, angle, max_x, max_y) {
    angle = parseFloat(angle);
    let horizontalInterval = null;
    let verticalInterval = null;
    let parabolaInterval = null;
    clearInterval(horizontalInterval);
    clearInterval(verticalInterval);
    clearInterval(parabolaInterval);   // Clear any prior animation
    const elem = document.getElementById(id);
    const arrow = document.getElementById("arrow");
    const output = document.getElementById("anim_output");
    let peak_x = max_x / 2.0;
    let x, y;

    arrow.style.transformOrigin = 'left';
    arrow.style.transform = `rotate(${-angle}deg)`;

    let bigger_scale = 1;
    let smaller_scale = 1;
    // Scaling logic
    if (max_x < 400 || max_y < 180) {
        bigger_scale = 1 / Math.max(400.0 / max_x, 180.0 / max_y);
        max_x /= bigger_scale;
        max_y /= bigger_scale;
        peak_x /= bigger_scale;
    }
    if (max_x > 800) {
        smaller_scale = max_x / 800.0;
        console.log("too large.", smaller_scale);
        max_x /= smaller_scale;
        max_y /= smaller_scale;
        peak_x /= smaller_scale;
    }
    let scale = bigger_scale * smaller_scale;

    x = 0;
    y = 0;

    const a = (-max_y) / Math.pow((peak_x), 2);

    parabolaInterval = setInterval(() => {
        if (y < 0) {
            output.innerHTML = "(" + (max_x * scale).toFixed(3) + ", " + (0 * scale).toFixed(3) + ")";
            clearInterval(parabolaInterval);
            return;
        }
        y = a * Math.pow((x - peak_x), 2) + max_y;
        elem.style.left = `${x}px`;
        elem.style.bottom = `${y}px`;
        output.innerHTML = "(" + (x * scale).toFixed(3) + ", " + (y * scale).toFixed(3) + ")";
        x += 0.4;
    }, 0.000003);
    return;
}

function getStyle(elem, param) {
    var value = (window.getComputedStyle(elem)[param]).toString();
    if (value.includes('px')) {
        return parseFloat(value.replace('px', ''));
    }
    return value;
}
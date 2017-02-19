document.onkeydown = function (e) {
    var keys = {
        37: 'left',
        38: 'up',
        40: 'down',
        39: 'right'
    };
    var dx = 0, dy = 0;

    switch (keys[e.keyCode]) {
        case 'left':
            dx = -1;
            break;
        case 'up':
            dy = 1;
            break;
        case 'down':
            dy = -1;
            break;
        case 'right':
            dx = 1;
            break;
        default:
            return;
    }
    
    if (dx * speed.x != 0
     || dy * speed.y != 0) {
         return;
    }

    newSpeed = {
        x: dx,
        y: dy
    };
};

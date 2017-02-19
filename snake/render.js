var W = 600, H = 600;
var BOX_W = W / COLS,
    BOX_H = H / ROWS;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function transformX(x) {
    return W * x / COLS;
}

function transformY(y) {
    return H * (1 - (y + 1) / ROWS);
}

function renderSnake() {
    for (var i = 0; i < snake.length; ++i) {
        var x = snake[i].x,
            y = snake[i].y;
        var xx = transformX(x),
            yy = transformY(y);

        if (playing) {
            ctx.fillStyle = 'blue';
        }
        else {
            ctx.fillStyle = 'red';
        }

        ctx.fillRect(xx, yy, BOX_W, BOX_H);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(xx, yy, BOX_W, BOX_H);
    }
}

function renderFruit() {
    var xx = transformX(fruit.x),
        yy = transformY(fruit.y);

    ctx.fillStyle = 'green';
    ctx.fillRect(xx, yy, BOX_W, BOX_H);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(xx, yy, BOX_W, BOX_H);
}

function render() {
    ctx.clearRect(0, 0, W, H);

    renderSnake();
    renderFruit();

    setTimeout(render, 17);
}

render();

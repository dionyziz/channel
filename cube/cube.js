var W = 600, H = 600;
var STEP = 0.5;
var MODEL_MIN_X = -2, MODEL_MAX_X = 2;
var MODEL_MIN_Y = -2, MODEL_MAX_Y = 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var points = [];
var triangles = [];
var colors = [
    'red', 'green', 'blue', 'white',
    'orange', 'purple', 'cyan', 'yellow'
];

function makeTriangle(a, b, c, dimension, side) {
    var side1 = b.subtract(a),
        side2 = c.subtract(a);
    var orientationVector = side1.cross(side2);

    if (Math.sign(orientationVector[dimension]) == Math.sign(side)) {
        return [a, b, c];
    }
    return [a, c, b];
}

function initGeometry() {
    for (var x = -1; x <= 1; x += 2) {
        for (var y = -1; y <= 1; y += 2) {
            for (var z = -1; z <= 1; z += 2) {
                points.push(new Vector(x, y, z));
            }
        }
    }
    for (var dimension = 0; dimension <= 2; ++dimension) {
        for (var side = -1; side <= 1; side += 2) {
            var sidePoints = points.filter((point) => {
                return point[dimension] == side;
            });
            var a = sidePoints[0],
                b = sidePoints[1],
                c = sidePoints[2],
                d = sidePoints[3];

            triangles.push(makeTriangle(a, b, c, dimension, side));
            triangles.push(makeTriangle(d, b, c, dimension, side));
        }
    }
}

function perspectiveProjection(point) {
    var x = point[0],
        y = point[1],
        z = point[2];

    return new Vector(
        x / (z + 4),
        y / (z + 4),
        z
    )
}

function project(point) {
    var perspectivePoint = perspectiveProjection(point);
    var x = perspectivePoint[0],
        y = perspectivePoint[1],
        z = perspectivePoint[2];

    return new Vector(
        W * (x - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X),
        H * (1 - (y - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y)),
        z
    );
}

function renderPoint(point) {
    var projectedPoint = project(point);
    var x = projectedPoint[0],
        y = projectedPoint[1];

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1, y + 1);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function renderTriangle(triangle, color) {
    var projectedTriangle = triangle.map(project);
    var a = projectedTriangle[0],
        b = projectedTriangle[1],
        c = projectedTriangle[2];
    var side1 = b.subtract(a),
        side2 = c.subtract(a);

    if (side1.ccw(side2)) {
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.lineTo(c[0], c[1]);
        ctx.lineTo(a[0], a[1]);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = color;
        ctx.stroke();
        ctx.fill();
    }
}

var theta = 0;
var dtheta = 0.02;

function render() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    theta += dtheta;
    triangles.forEach((triangle, idx) => {
        var rotatedTriangle = triangle.map((point) => {
            point = point.rotateY(theta);
            point = point.rotateX(0.43 * theta);
            return point;
        });
        var color = colors[Math.floor(idx / 2)];
        renderTriangle(rotatedTriangle, color);
    });
    requestAnimationFrame(render);
}

initGeometry();
render();

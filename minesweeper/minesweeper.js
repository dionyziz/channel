var COLS = 10, ROWS = 10, MINES = 10;
var board = [];
var state = [];
var STATE_CLOSED = 0,
    STATE_FLAGGED = 1,
    STATE_OPENED = 2;
var BLOCK_MINE = -1;
var playing = true;

function inBounds(x, y) {
    return x >= 0 && y >= 0
        && x < COLS && y < ROWS;
}

function countMinesAround(x, y) {
    var count = 0;
    for (var dx = -1; dx <= 1; ++dx) {
        for (var dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            var yy = y + dy,
                xx = x + dx;
            if (inBounds(xx, yy)) {
                if (board[yy][xx] == BLOCK_MINE) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function init() {
    for (var y = 0; y < ROWS; ++y) {
        board.push([]);
        state.push([]);
        for (var x = 0; x < COLS; ++x) {
            board[y].push(0);
            state[y].push(STATE_CLOSED);
        }
    }

    for (var mine = 0; mine < MINES; ++mine) {
        var x, y;
        do {
            x = Math.floor(Math.random() * COLS),
            y = Math.floor(Math.random() * ROWS);
        } while (board[y][x] == BLOCK_MINE);

        board[y][x] = BLOCK_MINE;
    }

    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] != BLOCK_MINE) {
                board[y][x] = countMinesAround(x, y);
            }
        }
    }
}

function openBlock(x, y) {
    if (!playing) {
        return;
    }
    if (state[y][x] == STATE_FLAGGED) {
        return;
    }

    if (board[y][x] == BLOCK_MINE) {
        alert('Game over!');
        playing = false;
        revealBoard(false);
        return;
    }

    state[y][x] = STATE_OPENED;
    if (board[y][x] == 0) {
        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                var xx = x + dx,
                    yy = y + dy;
                if (inBounds(xx, yy)) {
                    if (state[yy][xx] != STATE_OPENED) {
                        openBlock(xx, yy);
                    }
                }
            }
        }
    }

    if (checkVictory()) {
        alert('You are victorious!');
        playing = false;
        revealBoard(true);
    }
}

function checkVictory() {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] != BLOCK_MINE) {
                if (state[y][x] != STATE_OPENED) {
                    return false;
                }
            }
        }
    }
    return true;
}

function flagBlock(x, y) {
    if (state[y][x] == STATE_OPENED) {
        return;
    }
    state[y][x] = 1 - state[y][x];
}

function revealBoard(victorious) {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] == BLOCK_MINE && victorious) {
                state[y][x] = STATE_FLAGGED;
                continue;
            }
            state[y][x] = STATE_OPENED;
        }
    }
}

init();

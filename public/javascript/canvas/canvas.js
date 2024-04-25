const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

var gameover = false;
const wincondition = 3;
var mouse = {
    x: undefined,
    y: undefined,
};
var currentplayer = "o";
var player = {
    player1: { x: undefined, y: undefined },
    player2: { x: undefined, y: undefined },
};

class DrawLine {
    constructor(x, y, z, k) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.k = k;
    }
    Drawline() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.z, this.k);
        c.stroke();
    }
    update() {
        this.Drawline();
    }
}
class DrawCircle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        c.stroke();
    }
    update() {
        this.draw();
    }
}
class Tictactoe {
    constructor(gamesize) {
        this.gamesize = gamesize;
        this.Board = [];
        this.currentplayer = currentplayer;
    }
    getcurrentplayer() {
        console.log(this.currentplayer);
    }
    CreateBroad() {
        for (let i = 0; i < this.gamesize; i++) {
            this.Board[i] = [];
            for (let j = 0; j < this.gamesize; j++) {
                this.Board[i][j] = null;
            }
        }
    }
    checkHorizontal() {
        console.log(this.Board.length);
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[i][j] === this.currentplayer) {
                    count += 1;
                } else {
                    count = 0;
                }
                if (count === wincondition) {
                    return true;
                }
            }
        }
    }
    checkVertical() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[j][i] === this.currentplayer) {
                    count += 1;
                } else {
                    count = 0;
                }
                if (count === wincondition) {
                    return true;
                }
            }
        }
    }
    checkDiagonals() {
        var count1 = 0;
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i][i] === this.currentplayer) {
                console.log(`gia tri = ${this.Board[i][i]} ,tai  i = ${i}  `);
                console.log(this.Board);
                count1 += 1;
            } else {
                count1 = 0;
            }
        }
        var count2 = 0;
        for (let i = 0; i < this.Board.length-1; i++) {
            if (this.Board[i][this.gamesize - i - 1] === this.currentplayer) {
                count2 += 1;
            } else {
                count2 = 0;
            }
        }
        if (count1 === wincondition || count2 === wincondition) {
            return true;
        }
    }

    checkwinner() {
        if (
            this.checkHorizontal() ||
            this.checkVertical()||
            this.checkDiagonals()
        ) {
            return true;
        }
    }
    showBroad() {
        this.CreateBroad();
        return this.Board;
    }
}
var startx = 50;
var starty = 50;
var lastpointx = 50;
var lastpointy = 50;
var displaysize = 10;

var gamesize = displaysize - 1;
var rowsize = 50;
for (let i = 1; i <= displaysize; i++) {
    var line = new DrawLine(
        startx,
        starty * i,
        lastpointx * displaysize,
        lastpointy * i
    );
    line.update();
    var line2 = new DrawLine(
        startx * i,
        starty,
        lastpointx * i,
        lastpointy * displaysize,
    );
    line2.update();
}
//create board
var game = new Tictactoe(gamesize);
var board = game.showBroad();
function drawX(posx, posy) {
    c.font = "50px Arial";
    c.fillStyle = "red";
    c.fillText("x", posx, posy);
}
function drawO(posx, posy) {
    c.font = "50px Arial";
    c.fillStyle = "blue";
    c.fillText("o", posx, posy);
}
function drawwineer(winner) {
    c.font = "100px Arial";
    c.fillStyle = "black";
    c.fillText(`${winner} win`, 190, 260);
}

window.addEventListener("click", function (e) {
    if (gameover) {
        return;
    }
    mouse.x = e.x;
    mouse.y = e.y;
    var positionx = Math.floor((mouse.y - startx) / rowsize);
    var positiony = Math.floor((mouse.x - starty) / rowsize);
    var posx = Math.floor(mouse.x / rowsize) * rowsize + 10;
    var posy = Math.floor(mouse.y / rowsize) * rowsize + 45;
    if (board[positionx][positiony] === null) {
        board[positionx][positiony] = currentplayer;
        game.currentplayer = currentplayer;
        if (game.checkwinner()) {
            drawwineer(currentplayer);
            gameover = true;
        }
        if (currentplayer === "x") {
            drawX(posx, posy);
            currentplayer = "o";

        } else {
            drawO(posx, posy);
            currentplayer = "x";
        }

    }
});

var test = []
for (let i = 0; i < this.gamesize; i++) {
    this.test[i] = [];
    for (let j = 0; j < this.gamesize; j++) {
        this.test[i][j] = undefined;
    }
}

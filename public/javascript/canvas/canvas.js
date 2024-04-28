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
        for (let i = 0; i < this.Board.length; i++) {
            var count = 0;
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[i][j] === this.currentplayer) {
                    count += 1;
                    if (count >= wincondition) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }
    checkVertical() {
        for (let i = 0; i < this.Board.length; i++) {
            let count = 0;
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[j][i] === this.currentplayer) {
                    count++;
                    if (count >= wincondition) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    checkfromPosition(i, j, stepX, stepY) {
        let sx = stepX;
        let sy = stepY;
        let x = i;
        let y = j;
        let count = 0;
        while (
            x >= 0 &&
            x < this.Board.length &&
            y >= 0 &&
            y < this.Board.length
        ) {
            if (this.Board[x][y] === this.currentplayer) {
                count += 1;
                if (count >= wincondition) {
                    return true;
                }
            } else {
                count = 0;
            }
            x += sx;
            y += sy;
        }
    }
    checkfromleft() {
        for (let i = 0; i < this.Board.length; i++) {
            if (this.checkfromPosition(i, 0, 1, 1)) {
                return true;
            }
            if (this.checkfromPosition(0, i, 1, 1)) {
                return true;
            }
        }
    }
    checkfromright() {
        for (let i = 0; i < this.Board.length; i++) {
            if (this.checkfromPosition(0, this.Board.length - i - 1, 1, -1)) {
                return true;
            }
            if (this.checkfromPosition(i, this.Board.length - 1, 1, -1)) {
                return true;
            }
        }
    }
    checkwinner() {
        if (
            this.checkHorizontal() ||
            this.checkVertical() ||
            this.checkfromleft() ||
            this.checkfromright()
        ) {
            return true;
        }
    }
    checkdraw() {
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }
    showBroad() {
        this.CreateBroad();
        return this.Board;
    }
}
const startx = 50;
const starty = 50;
const displaysize = 4;
const gamesize = displaysize - 1;
const rowsize = 50;
var lastpointx = 50;
var lastpointy = 50;
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
        lastpointy * displaysize
    );
    line2.update();
}
//create board
var game = new Tictactoe(gamesize);
var board = game.showBroad();
class drawText {
    constructor(px, py, cr, t) {
        this.posx = px;
        this.posy = py;
        this.color = cr;
        this.text = t;
    }
    draw() {
        c.font = "50px Arial";
        c.fillStyle = this.color;
        c.fillText(this.text, this.posx, this.posy);
    }
}
function drawtextfunction(posx, posy, color, text) {
    let draw = new drawText(posx, posy, color, text);
    return draw;
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
            drawtextfunction(190, 260, "black", `${currentplayer} win`).draw();
            gameover = true;
        }
        else if(game.checkdraw()){
            drawtextfunction(190, 260, "black", "DRAW").draw();
            gameover = true;
        }
        if (currentplayer === "x") {
            drawtextfunction(posx, posy, "blue", `${currentplayer}`).draw();
            currentplayer = "o";
        } else {
            drawtextfunction(posx, posy, "red", `${currentplayer}`).draw();
            currentplayer = "x";
        }
    }
});

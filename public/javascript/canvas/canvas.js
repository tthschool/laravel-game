const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
const gamerow = 4;
const rowWidth = 50;
const rowHeight = 50 ;
var gameover = false;
const wincondition = 3 ;
var mouse = {
    x: undefined,
    y: undefined,
};
var currentplayer = "o";
var player = {
    player1: { x: undefined, y: undefined },
    player2: { x: undefined, y: undefined }
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
    constructor(gamerow , currentplayer) {
        this.gamerow = gamerow;
        this.Board = [];
        this.currentplayer= currentplayer;
    }
    CreateBroad() {
        for (let i = 0; i < this.gamerow - 1; i++) {
            this.Board[i] = [];
            for (let j = 0; j < this.gamerow - 1; j++) {
                this.Board[i][j] = undefined;
            }
        }
    }
    checkHorizontal() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[i][j] === this.currentplayer) {
                    count += 1;
                }
                else{
                    count = 0 ;
                }
                if (count === wincondition) {
                    return true;
                }
            }
        }
    }
    checkVertical() {
        console.log(this.currentplayer);
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[j][i] === this.currentplayer) {
                    count += 1;
                }
                else{
                    count = 0 ;
                }
                if(count === wincondition){
                    return true;
                }

            }
        }
    }
    checkmaindiagonal() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i][i] === this.currentplayer) {
                count += 1;
            } else {
                count = 0;
            }
            if (count == wincondition) {
                console.log("main");
                return true;
            }
        }
    }
    checksub(){
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i][this.gamerow - i - 2] === this.currentplayer) {
                count += 1;
            } else {
                count = 0;
            }
            if (count == wincondition) {
                return true;
            }
        }
    }
    checkwinner() {
        if (
            this.checkHorizontal() ||
            this.checkVertical() ||
            this.checkmaindiagonal() ||
            this.checksub()

        ) {
            return true;
        }
    }
    showBroad() {
        this.CreateBroad();
        return this.Board;
    }
}
for (let i = 1; i <= gamerow; i++) {
    var line = new DrawLine(rowHeight, rowHeight * i, gamerow*rowWidth, rowHeight * i);
    line.Drawline();
    var line2 = new DrawLine(rowHeight * i, rowHeight, rowHeight * i, gamerow*rowWidth);
    line2.Drawline();
}
//create board
var game = new Tictactoe(gamerow , currentplayer);
var board = game.showBroad();
function drawX(posx, posy) {
    c.font = "50px Arial";
    c.fillText("X", posx, posy);
}
function drawO(posx, posy) {
    c.font = "50px Arial";
    c.fillText("0", posx, posy);
}
function drawwineer(winner) {
    c.font = "60px Arial";
    c.fillText(`${winner} win`, 190, 260);
}

window.addEventListener("click", function (e) {
    if (gameover) {
        return ;
    }
    mouse.x = e.x;
    mouse.y = e.y;
    var positionx = Math.floor((mouse.y - rowHeight) / rowWidth);
    var positiony = Math.floor((mouse.x - rowHeight) / rowHeight);
    console.log(positionx);
    var posx = Math.floor(mouse.x / rowHeight) * rowHeight + 10;
    var posy = Math.floor(mouse.y / rowHeight) * rowHeight + 45;
    if (board[positionx][positiony] === undefined) {
        board[positionx][positiony] = currentplayer
        board.currentplayer = currentplayer;
        if (currentplayer === "x") {
            drawX(posx, posy);
            currentplayer = "o";
        }
        else{
            drawO(posx , posy);
            currentplayer = "x"
        };
        if(game.checkwinner()){
            drawwineer(currentplayer)
            gameover = true;
        };
        console.log(game);
    }
});


//current player always be O

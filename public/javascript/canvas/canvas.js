const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
var player = {
    player1: { x: undefined, y: undefined },
    player2: { x: undefined, y: undefined }
};
var currentplayer = 0;
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
    constructor(gamerow) {
        this.gamerow = gamerow;
        this.Board = [];
    }
    CreateBroad() {
        for (let i = 0; i < this.gamerow - 1; i++) {
            this.Board[i] = [];
            for (let j = 0; j < this.gamerow - 1; j++) {
                this.Board[i][j] = 0;
            }
        }
    }
    checkHorizontal() {
        var iswin = false;
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[i][j] == 1) {
                    count += 1;
                } else {
                    if (count == 3) {
                        iswin = true;
                    } else {
                        count = 0;
                    }
                }
            }
        }
        return iswin;
    }
    checkVertical() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            for (let j = 0; j < this.Board.length; j++) {
                if (this.Board[j][i] == 1) {
                    count += 1;
                }
                else {
                    if (count == 3) {
                        return true;
                    } else {
                        count = 0;
                    }
                }
            }
        }
    }
    checkmaindiagonal() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i][i] == 1) {
                count += 1;
            } else {
                count = 0;
            }
            // check if cn
            if (count == 3) {
                return true;
            }
        }
        // Trả về false nếu không tìm thấy chuỗi ba "1" liên tiếp
        return false;
    }

    checksub() {
        var count = 0;
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i][this.gamerow - i - 1] == 1) { // Sửa gamerow thành this.gamerow
                count += 1;
            } else {
                count = 0;
            }
            // Kiểm tra ngay khi đếm đủ 3
            if (count == 3) {
                return true;
            }
        }
        // Trả về false nếu không tìm thấy chuỗi ba "1" liên tiếp
        return false;
    }

    checkwinner() {
        console.log(this.checksub());
        if (
            this.checkHorizontal() ||
            this.checkVertical() ||
            this.checkmaindiagonal() ||
            this.checksub()
        ) {
            console.log("win");
        }
    }
    showBroad() {
        this.CreateBroad();
        return this.Board;
    }
}
var mouse = {
    x: undefined,
    y: undefined,
};
const gamerow = 4;
const rowWidth = 100;
for (let i = 1; i <= gamerow; i++) {
    var line = new DrawLine(100, 100 * i, 400, 100 * i);
    line.Drawline();
    var line2 = new DrawLine(100 * i, 100, 100 * i, 400);
    line2.Drawline();
}
//create board
var game = new Tictactoe(gamerow);
var board = game.showBroad();
function drawX(posx, posy) {
    c.font = "60px Arial";
    c.fillText("X", posx, posy);
}
function drawO(posx, posy) {
    c.font = "60px Arial";
    c.fillText("0", posx, posy);
}
window.addEventListener("click", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
    var positionx = Math.floor((mouse.y - 100) / rowWidth);
    var positiony = Math.floor((mouse.x - 100) / rowWidth);
    board[positionx][positiony] = 1;
    var posx = Math.floor(mouse.x / 100) * 100 + 30;
    var posy = Math.floor(mouse.y / 100) * 100 + 70;
    game.checkwinner();

    if (currentplayer == 0) {
        drawX(posx, posy);
        currentplayer = 1;
    }
    else{
        drawO(posx , posy);
        currentplayer = 0
    };
});



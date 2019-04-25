var canvas = document.getElementById("bars");
canvas.height = 500;
canvas.width = canvas.clientWidth;


squares = [];

class square {
    constructor(x, y, noteid, type) {

        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = 500;
        console.log("create" + this.x1 + " " + this.y1 + ", " + this.x2 + " " + this.y2)
        this.noteid = noteid;
        this.type = type; //1自下而上 2自下而上且释放
    }

    move(move_speed) {
        if (this.type === 1)
            this.y1 = Math.max(this.y1 - move_speed, 0);
        else if (this.type === 2) {
            this.y1 = Math.max(this.y1 - move_speed, 0);
            this.y2 = Math.max(this.y2 - move_speed, 0);
        }

    }

}


function draw_bars() {
    var ctx2 = canvas.getContext('2d');
    ctx2.clearRect(0, 0, 1920, 500);
    for (i in squares) {
        ctx2.beginPath();
        ctx2.moveTo(squares[i].x1, squares[i].y1);       //设置起点状态
        ctx2.lineTo(squares[i].x2, squares[i].y2);       //设置末端状态
        ctx2.lineWidth = 20;          //设置线宽状态
        ctx2.strokeStyle = "#62e1e6";  //设置线的颜色状态
        ctx2.stroke();               //进行绘制
        squares[i].move(10);
    }
    var j;
    for (j = squares.length-1; j >= 0; j--) {
        if (squares[j].y1 === 0 && squares[j].y2 === 0)
            squares.slice(j, 1);
    }
    window.requestAnimationFrame(draw_bars);
}

function draw_line(posx, posy) {
    console.log("draw" + posx + "," + posy);
    context.moveTo(posx, posy);       //设置起点状态
    context.lineTo(posx, 0);       //设置末端状态
    context.lineWidth = 20;          //设置线宽状态
    context.strokeStyle = "#226fc7";  //设置线的颜色状态
    context.stroke();               //进行绘制
}

function add_line(posx, noteid) {
    squares.push(new square(posx, 500, noteid, 1))
}

function release_line(noteid) {
    for (i in squares)
        if (squares[i].noteid === noteid)
            squares[i].type = 2;
}

window.requestAnimationFrame(draw_bars);
var canvas = document.getElementById("bars");
canvas.height = 600;
canvas.width = canvas.clientWidth;


squares = [];

class square {
    constructor(x, y, noteid, type,velocity) {

        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = y;
        console.log("create  " + this.x1 + " " + this.y1 + ", " + this.x2 + " " + this.y2);
        this.noteid = noteid;
        this.velocity=velocity;
        this.type = type; //1自下而上 2自下而上且释放  3、4反向
    }

    move(move_speed) {
        if (this.type === 1)
            this.y1 = Math.max(this.y1 - move_speed, 0);
        else if (this.type === 2) {
            this.y1 = Math.max(this.y1 - move_speed, 0);
            this.y2 = Math.max(this.y2 - move_speed, 0);
        }else if (this.type === 3)
            this.y1 = Math.min(this.y1 + move_speed, 600);
        else if (this.type === 4) {
            this.y1 = Math.min(this.y1 + move_speed, 600);
            this.y2 = Math.min(this.y2 + move_speed, 600);
        }

    }

}


function draw_bars() {
    var ctx2 = canvas.getContext('2d');
    ctx2.clearRect(0, 0, 1920, 600);
    for (i in squares) {
        ctx2.beginPath();
        ctx2.moveTo(squares[i].x1, squares[i].y1);       //设置起点状态
        ctx2.lineTo(squares[i].x2, squares[i].y2);       //设置末端状态
        ctx2.lineWidth = 20*squares[i].velocity;          //设置线宽状态
        if (squares[i].noteid.length === 2)
            ctx2.strokeStyle = "#62e1e6";  //设置线的颜色状态
        else
            ctx2.strokeStyle = "#e68f00";  //设置线的颜色状态
        ctx2.stroke();               //进行绘制
        squares[i].move(10);
    }
    var j;
    for (j = squares.length - 1; j >= 0; j--) {
        if (squares[j].y1 === 0 && squares[j].y2 === 0)
            squares.splice(j, 1);
    }
    window.requestAnimationFrame(draw_bars);
}


function add_line(posx, noteid,velocity) {
    squares.push(new square(posx, 600, noteid, 1,velocity))
}

function add_line2(posx, noteid,velocity) {
    squares.push(new square(posx, 0, noteid, 3,velocity))
}

function release_line(noteid) {
    for (i in squares)
        if (squares[i].noteid === noteid && squares[i].type===1)
            squares[i].type = 2;
        else if(squares[i].noteid === noteid && squares[i].type===3)
            squares[i].type = 4;
}

window.requestAnimationFrame(draw_bars);
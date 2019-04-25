//canvas鼠标点击烟花特效

let endpos = (x, y) => {
    let angle = random(0, 360) * Math.PI / 180,
        value = random(20, 150),
        radius = [-1, 1][random(0, 1)] * value;

    return {
        x: x + radius * Math.cos(angle),
        y: y - Math.abs(radius * Math.sin(angle))
    }
}

let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Circle {
    constructor(x, y) {
        this.r = random(5, 9)
        this.opos = {}
        this.x = this.opos.x = x
        this.y = this.opos.y = y

        this.colors = ['#92d9ff', '#41b5ff', '#5A87FF', '#44bdfb']
        this.color = this.colors[random(0, this.colors.length)];
        this.tpos = endpos(x, y)
    }

    creatCircle(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
    }

    //根据不同距离段设置前行的步伐，分为3个阶段，离出发点近的那一段为速度最快，中间为速度一般，最远为速度最慢
    //区分目标点小于出发点的情况
    //ratio为两点之间的距离的行走比例，比例数值越大，行走越慢
    moveFun(start, end, current) {
        let s = random(26, 35),
            m = random(20, 25),
            f = random(15, 20),
            ff = start.x + ~~((end.x - start.x) / 3),
            mm = ff + ~~((end.x - start.x) / 3),
            ratio = end.x >= start.x ? (Math.max(current, ff) == current ? (Math.max(current, mm) == current ? s : m) : f) : (Math.max(current, ff) == current ? f : (Math.max(current, mm) == current ? m : s)),
            mp = {
                x: end.x - start.x,
                y: end.y - start.y
            };

        return {
            x: Math.abs(mp.x / ratio),
            y: Math.abs(mp.y / ratio)
        }
    }

    //根据计算出来的移动值去移动
    //如果目标坐标大于原始坐标则向右移动，最大不能超过目标坐标，反之向左移动最小不能小于目标坐标
    move() {
        var movepos = this.moveFun(this.opos, this.tpos, this.x);

        this.x = (this.opos.x > this.tpos.x) ? Math.max(this.x - movepos.x, this.tpos.x) : Math.min(this.x + movepos.x, this.tpos.x)
        this.y = this.opos.y > this.tpos.y ? Math.max(this.y - movepos.y, this.tpos.y) : Math.min(this.y + movepos.y, this.tpos.y)
        this.r = Math.max(Math.abs((this.r - Math.random() / 1.2).toFixed(2)), 0)

    }
}

class BigCircle {
    constructor(x, y) {
        this.bR = random(16, 32)
        this.overR = random(60, 100)
        this.x = x
        this.y = y
        this.op = 1
    }

    creatBigCircle(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.bR, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(128, 128, 128, ' + this.op + ')'
        ctx.stroke()
    }

    changeR() {
        this.bR = Math.min(this.bR += random(1, 4), this.overR);
        this.op = Math.max((this.op - Math.random() / 12).toFixed(2), 0)
    }

    //检查是否运行完毕，以大圆为标准清空屏幕
    complete() {
        return this.bR >= this.overR && this.op <= 0;
    }
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.clearRequestTimeout = window.cancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame;


let c = document.getElementById("fireworks"),
    w = c.width = c.offsetWidth,
    h = c.height = c.offsetHeight,

    ctx = c.getContext("2d"),
    nums = 40,
    circles = [],
    bCircle = null,
    animationId = false;

let int = function (x, y) {
    //circles = []

    if (animationId) clearRequestTimeout(animationId)

    for (let i = nums; i-- > 0;) {
        circles.push(new Circle(x, y))
    }
    while (circles.length > 200) circles.shift()

    bCircle = new BigCircle(x, y)
    creat()
}

let creat = function () {
    ctx.clearRect(0, 0, w, h);

    circles.forEach(function (v) {
        v.move();
        v.creatCircle(ctx)
    })

    bCircle.changeR()
    bCircle.creatBigCircle(ctx)

    animationId = requestAnimationFrame(creat)

    if (bCircle.complete()) {
        //以大圆为标准，清空屏幕停止动画
        circles = []
        ctx.clearRect(0, 0, w, h);
        clearRequestTimeout(animationId)
    }
}




class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.listenMouse();
    }

    init() {
        this.gameWidth = 0, this.gameHeight = 0;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.fps = new FPS();
        this.board = new Board(this, 300, 300, 0, 0);
        this.start();

    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            if (this.board.checkWin() !== '' || this.board.checkDraw()) {
                return;
            }
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            let { row, col } = this.board.getRowCol(x, y);
            this.board.setValue(row, col, this.board.type);
            console.log(this.board.data);
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;

        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }

   

    loop(timestamp) {
        this.fps.calculateFPS(timestamp);
        this.update();
        this.draw();
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    start() {
        console.log("start");
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update() {
        this.render();
    }

    render() {
        if (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            this.gameWidth = this.canvas.width;
            this.gameHeight = this.canvas.height;
        }
    }

    draw() {
        this.clearScreen();
        this.drawFPS();
        this.board.draw();
        this.drawText();
    }

    drawFPS() {
        this.context.textAlign = 'left';
        this.context.font = (20) + 'px NVNPixelFJVerdana8pt';
        this.context.fillStyle = "white";
        let fps = this.fps.getFPS();
        if (fps < 30)
            this.context.fillStyle = "red";
        this.context.fillText("FPS: " + fps, 50, 50);
    }

    drawText() {
        this.context.font = (20) + 'px NVNPixelFJVerdana8pt';
        this.context.textAlign = 'center';
        this.context.fillStyle = "white";
        this.context.fillText("Turn of " + this.board.type, this.gameWidth / 2, 50);
        let winner = this.board.checkWin();
        let draw = this.board.checkDraw();
        if (winner !== '') {
            this.context.fillText(winner + " win", this.gameWidth / 2, 100);
            setTimeout(() => {
                this.board.clear();
                document.location.reload();
            }, 5000);
        }
        if (draw) {
            this.context.fillText("Draw", this.gameWidth / 2, 100);
            setTimeout(() => {
                this.board.clear();
            }, 1000);
        }
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
        this.board.getAtrribute();
    }
}

var g = new Game();
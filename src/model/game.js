class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.listenMouse();
        this.count = 20;
        this.row = 0;
        this.col = 1;
    }

    init() {
        console.log(this.board);
        this.isWin = false;
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
            if (this.board.checkWin(this.board.data) !== '') {
                return;
            }
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            let { row, col } = this.board.getRowCol(x, y);
            this.board.setValue(row, col, this.board.type);
            if (this.board.type === 'o' && !this.isWin) {
                this.count = 0;
            }
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
        let winner = this.board.checkWin(this.board.data);
        if (winner !== '' && !this.isWin) {
            this.isWin = true;
            this.board.showResult();
            setTimeout(() => {
                alert(winner + " win");
                this.board.clear();
                this.isWin = false;
            }, 1000);
        }
        if (this.board.type === 'o' && !this.isWin) {
            if (this.count++ == 20) {
                let { row, col, score } = Minimax.getBestMove(this.board.data, 10);
                this.row = row;
                this.col = col;
                this.count = -10e9;
            }
        }
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
        // this.drawFPS();
        this.board.draw();
        this.drawText();
        this.drawRowCol();
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

    drawRowCol() {
        let center = this.gameWidth / 2;
        let size = this.gameWidth / 5;
        this.context.font = (5) + 'px NVNPixelFJVerdana8pt';
        this.context.fillText("." , center + (this.row - 1) * size, 10);
        this.context.fillText("." , center + (this.col - 1) * size, this.gameHeight - 10);
    }

    drawText() {
        this.context.font = (40) + 'px NVNPixelFJVerdana8pt';
        this.context.textAlign = 'center';
        this.context.fillStyle = "white";
        let Y = this.isMobile() ? this.gameHeight / 5 : 10;
        this.context.fillText("Turn of " + this.board.type.toUpperCase(), this.gameWidth / 2, 100 + Y);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
        this.board.getAtrribute();
    }

    isMobile() {
        return this.gameWidth < this.gameHeight;
    }
}

var g = new Game();
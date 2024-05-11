class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.listenMouse();
        this.stepBot = 10e6;
    }

    init() {
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
            if (!this.board.isPlayerTurn()) {
                return;
            }
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;

            let { row, col } = this.board.getRowCol(x, y);
            let isSolveStep = this.board.setValue(row, col, this.board.type);
            if (isSolveStep) {
                this.stepBot = 0;
            } else {
                console.log("Can't solve step");
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
            this.board.score = (winner == 'x') ? -Minimax.maxDepth : Minimax.maxDepth;
            this.board.showResult();
            setTimeout(() => {
                alert("You " + ((winner == 'x') ? "win!" : "lose!"));
                this.board.clear();
                if (winner == 'x')
                    this.board.nextLevel();
                this.isWin = false;
            }, 500);
        }
        if (this.stepBot++ === 15 && !this.isWin) {
            this.draw();
            this.board.setPlayerTurn(false);
            this.board.autoPlay();
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
            this.board.setXOchangeSize();
        }
    }

    draw() {
        this.clearScreen();
        // this.drawFPS();
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
        this.context.font = (40) + 'px NVNPixelFJVerdana8pt';
        this.context.textAlign = 'center';
        this.context.fillStyle = "white";
        let Y = this.isMobile() ? this.gameHeight / 5 : 10;
        //yellow light
        if (this.board.type == 'o')
            this.context.fillStyle = "yellow";
        this.context.fillText("Turn of " + this.board.type.toUpperCase(), this.gameWidth / 2, 50 + Y);
        this.context.font = (20) + 'px NVNPixelFJVerdana8pt';
        let winRate = this.board.score;
        winRate = Math.floor((100 / Minimax.maxDepth) * winRate);
        this.context.fillStyle = "cyan";
        if (winRate > 0)
            this.context.fillStyle = "red";
        if (winRate < 0)
            this.context.fillStyle = "#00ff00";
        this.context.fillText("Win rate: " + -winRate + "%", this.gameWidth / 2, 100 + Y);
        this.context.fillStyle = 'cyan';
        this.context.textAlign = 'left';
        this.context.font = (30) + 'px NVNPixelFJVerdana8pt';
        if (this.isMobile()) {
            this.context.textAlign = 'center';
            this.context.fillText("Level " + (this.board.level + 1), this.gameWidth / 2, 100);
        } else
        this.context.fillText("Level " + (this.board.level + 1), 10, 50);
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
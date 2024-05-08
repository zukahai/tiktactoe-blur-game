class Board extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
        this.getAtrribute();
        this.data = [
            ['', 'X', ''],
            ['', '', 'X'],
            ['O', '', '']
        ];
    }

    getAtrribute() {
        let minSize = Math.min(this.game.gameWidth, this.game.gameHeight);
        this.width = this.height = minSize / 1.5;
        this.xAlignment = (this.game.gameWidth - this.width) / 2;
        this.yAlignment = (this.game.gameHeight - this.height) / 2;
    }

    setImage() {
        this.image = new Image();
        this.image.src = "assets/images/board.png";
    }

    draw() {
        super.draw();
        this.drawXO();
    }

    drawXO() {
        this.data.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 'X' || col === 'O') {
                    let x = this.xAlignment + j * this.width / 3;
                    let y = this.yAlignment + i * this.height / 3;
                    let xo = new XO(this.game, this.width / 3, this.height / 3, x, y, col);
                    // console.log(xo);
                    xo.draw();
                }
            });
        });
    }
}
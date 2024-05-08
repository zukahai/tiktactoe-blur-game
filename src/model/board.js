class Board extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
        this.getAtrribute();
        this.data = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.type = 'X';
        this.arrayX = [];
        this.arrayO = [];
        this.xo = [
            [, ,],
            [, ,],
            [, ,]
        ]
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
                if (col === 'X' || col === 'O' || col === 'Xb' || col === 'Ob') {
                    let x = this.xAlignment + j * this.width / 3;
                    let y = this.yAlignment + i * this.height / 3;
                    if (this.xo[i][j] === undefined) {
                        this.xo[i][j] = new XO(this.game, this.width / 3, this.height / 3, x, y, col);
                    }
                    this.xo[i][j].getImage();
                    this.xo[i][j].draw();
                }
            });
        });
    }

    getRowCol(x, y) {
        if (x < this.xAlignment || x > this.xAlignment + this.width || y < this.yAlignment || y > this.yAlignment + this.height) {
            return { row: -1, col: -1 };
        }
        let row = Math.floor((y - this.yAlignment) / (this.height / 3));
        let col = Math.floor((x - this.xAlignment) / (this.width / 3));
        return { row, col };
    }

    setValue(row, col, value) {
        if (this.data[row][col] === '' && (value === 'X' || value === 'O') && row >= 0 && row < 3 && col >= 0 && col < 3) {
            this.data[row][col] = value;
            this.setArrayXO(row, col, value);
            this.type = this.type === 'X' ? 'O' : 'X';
            return true;
        }
        return false;
    }

    setArrayXO(row, col, value) {
        if (value === 'X') {
            if (this.arrayX.length >= 3) {
                let { row, col } = this.arrayX.shift();
                this.data[row][col] = '';
            }
            this.arrayX.push({ row, col });
            if (this.arrayX.length === 3) {
                let { row, col } = this.arrayX[0];
                this.data[row][col] = 'Xb';
            }
        } else if (value === 'O') {
            if (this.arrayO.length >= 3) {
                let { row, col } = this.arrayO.shift();
                this.data[row][col] = '';
            }
            this.arrayO.push({ row, col });
            if (this.arrayO.length === 3) {
                let { row, col } = this.arrayO[0];
                this.data[row][col] = 'Ob';
            }
        }
        this.setXoByArray();
    }

    checkWin() {
        let data = this.data;
        data = data.map(row => row.map(col => col === 'Xb' ? 'X' : col === 'Ob' ? 'O' : col));
        for (let i = 0; i < 3; i++) {
            if (data[i][0] === data[i][1] && data[i][1] === data[i][2] && data[i][0] !== '') {
                return data[i][0];
            }
            if (data[0][i] === data[1][i] && data[1][i] === data[2][i] && data[0][i] !== '') {
                return data[0][i];
            }
        }
        if (data[0][0] === data[1][1] && data[1][1] === data[2][2] && data[0][0] !== '') {
            return data[0][0];
        }
        if (data[0][2] === data[1][1] && data[1][1] === data[2][0] && data[0][2] !== '') {
            return data[0][2];
        }
        return '';
    }

    setXoByArray() {
        this.xo.forEach((row, i) => {
            row.forEach((col, j) => {
                if (this.data[i][j] === 'X' || this.data[i][j] === 'O' || this.data[i][j] === 'Xb' || this.data[i][j] === 'Ob') {
                    let x = this.xAlignment + j * this.width / 3;
                    let y = this.yAlignment + i * this.height / 3;
                    if (this.xo[i][j] === undefined) {
                        this.xo[i][j] = new XO(this.game, this.width / 3, this.height / 3, x, y, this.data[i][j]);
                    }
                    this.xo[i][j].setType(this.data[i][j]);
                    this.xo[i][j].getImage();
                }
            });
        });
    }

    checkDraw() {
        let data = this.data;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (data[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    clear() {
        this.data = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.type = 'X';
        this.arrayX = [];
        this.arrayO = [];
    }
}
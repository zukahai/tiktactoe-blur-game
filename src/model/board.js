class Board extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
        this.getAtrribute();
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
}
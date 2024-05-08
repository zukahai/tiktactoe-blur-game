class Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        this.width = width;
        this.height = height;
        this.xAlignment = xAlignment;
        this.yAlignment = yAlignment;
        this.game = game;
        this.setImage();
    }

    draw() {
        this.game.context.drawImage(this.image, this.xAlignment, this.yAlignment, this.width, this.height);
    }

    getImage() {
        this.image();
    }

    setImage() {
        this.image = new Image();
    }
}
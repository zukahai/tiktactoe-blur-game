class XO extends Item {
    constructor(game, width, height, xAlignment, yAlignment, type) {
        super(game, width, height, xAlignment, yAlignment);
        this.type = type;
        this.setImage();
        this.getImage();
    }

    getImage() {
        if (this.type === 'X') {
            this.image.src = 'assets/images/x.png';
        } else if (this.type === 'O') {
            this.image.src = 'assets/images/o.png';
        }
    }

    setImage() {
        this.image = new Image();
    }

    setType(type) {
        this.type = type;
        this.setImage();
    }
}
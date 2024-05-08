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
        } else if (this.type === 'Xb') {
            this.image.src = 'assets/images/x_blur.png';
        } else if (this.type === 'Ob') {
            this.image.src = 'assets/images/o_blur.png';
        } else {
            this.image.src = 'assets/images/empty.png';
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
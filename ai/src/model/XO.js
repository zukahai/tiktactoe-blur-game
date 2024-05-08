class XO extends Item {
    constructor(game, width, height, xAlignment, yAlignment, type) {
        super(game, width, height, xAlignment, yAlignment);
        this.type = type;
        this.setImage();
        this.getImage();
    }

    getImage() {
        this.image.src = '../assets/images/' + this.type + '.png';
    }

    setImage() {
        this.image = new Image();
    }

    setType(type) {
        this.type = type;
        this.setImage();
    }
}
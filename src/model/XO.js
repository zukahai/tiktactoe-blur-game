class XO extends Item {
    constructor(game, width, height, xAlignment, yAlignment, type) {
        super(game, width, height, xAlignment, yAlignment);
        this.type = type;
        this.setImage();
        this.getImage();
    }

    getImage() {
        this.image.src = 'assets/images/' + this.type + '.png';
    }

    setImage() {
        this.image = new Image();
    }

    setType(type) {
        this.type = type;
        this.setImage();
    }

    setAmimation(step) {
        let old = {
            width: this.width,
            height: this.height,
            xAlignment: this.xAlignment,
            yAlignment: this.yAlignment
        }
        let nStep = 60;
        let size = this.width;
        let stepSize = size / (nStep * (nStep + 1) / 2);
        this.xAlignment += size / 2;
        this.yAlignment += size / 2;
        this.width = this.height = 10;
        this.ani = setInterval(() => {
            this.width += step * stepSize;
            this.height += step * stepSize;
            this.xAlignment = old.xAlignment + (size - this.width) / 2;
            this.yAlignment = old.yAlignment + (size - this.height) / 2;
            if (++step == nStep) {
                clearInterval(this.ani); 
                this.width = old.width;
                this.height = old.height;
                this.xAlignment = old.xAlignment;
                this.yAlignment = old.yAlignment;
            }
        }, 1);
    }
}
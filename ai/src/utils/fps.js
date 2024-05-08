class FPS {
    constructor() {
        this.lasttime = 0;
        this.fps = 0;
    }

    calculateFPS(time) {
        this.fps = Math.round(1000 / (time - this.lasttime));
        this.lasttime = time;
    }

    getFPS() {
        return this.fps;
    }
}

export default class Layer {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.layout = Layer.initLayout(width, height);
        this.active = true;
    }

    static initLayout(width, height) {
        let layout;
        layout = new Array(width);
        for (let x = 0; x < layout.length; x++) {
            layout[x] = new Array(height);
            for (let y = 0; y < layout[x].length; y++) {
                layout[x][y] = null;
            }
        }
        return layout;
    }

    static getCurrent(layers) {
        for (let i = 0; i < layers.length; i++) if (layers[i].active) return layers[i];
    }

    destroy() {
        this.delete = true;
    }

    setAt(tile, x, y) {
        this.layout[x][y] = tile;
    }

    getAt(x, y) {
        return this.layout[x][y];
    }

    removeAt(x, y) {
        if (this.layout[x][y] !== null) {
            this.layout[x][y].destroy();
            this.layout[x][y] = null;
        }
    }

    render(state) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.layout[x][y] !== null) this.layout[x][y].render();
            }
        }
    }
}

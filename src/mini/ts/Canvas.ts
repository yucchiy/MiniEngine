export class Canvas {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = 0;
        this.canvas.height = 0;
    }

    setSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    get width() : number {
        return this.canvas.width;
    }

    get height() : number {
        return this.canvas.height;
    }

    get aspect(): number {
        return this.canvas.width / this.canvas.height;
    }

    getContext(contextId: string) : RenderingContext | null {
        return this.canvas.getContext(contextId);
    }
}

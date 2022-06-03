import { Canvas } from "./Canvas";

export class CanvasFactory {
    static CreateCanvas(parent : HTMLElement) : Canvas {
        var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas') as HTMLCanvasElement;
        parent.append(canvas);

        return new Canvas(canvas);
    }
}
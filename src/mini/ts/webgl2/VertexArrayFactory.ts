import { VertexArray } from "./VertexArray";

export class VertexArrayFactory {
    private gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    createVertexArray(): VertexArray {
        return new VertexArray(this.gl);
    }
}
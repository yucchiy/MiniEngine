export class VertexArray {
    private gl: WebGL2RenderingContext;
    private vertexArray: WebGLVertexArrayObject;

    constructor(gl: WebGL2RenderingContext) {
        var vertexArray = gl.createVertexArray();
        if (vertexArray === null) {
            throw new Error("failed to create vertex array.");
        }

        this.gl = gl;
        this.vertexArray = vertexArray;
    }

    bind() {
        this.gl.bindVertexArray(this.vertexArray);
    }

    unbind() {
        this.gl.bindVertexArray(null);
    }
}
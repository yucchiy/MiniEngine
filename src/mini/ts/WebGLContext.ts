export class WebGLContext {
    private gl : WebGLRenderingContext;

    constructor(gl : WebGLRenderingContext) {
        this.gl = gl;

        this.gl.enable(gl.DEPTH_TEST);
        this.gl.depthFunc(gl.LEQUAL);
        this.gl.enable(gl.CULL_FACE);
    }

    viewport(x : number, y : number, width : number, height : number) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(r : number, g : number, b : number, a : number) {
        this.gl.clearColor(r, g, b, a);
    }

    clearDepth(depth : number) {
        this.gl.clearDepth(depth);
    }

    clear(mask : number) {
        this.gl.COLOR_WRITEMASK
        this.gl.clear(mask);
    }

    flush() {
        this.gl.flush();
    }

    static readonly COLOR_BUFFER_BIT : number = WebGLRenderingContext.COLOR_BUFFER_BIT;
    static readonly DEPTH_BUFFER_BIT : number = WebGLRenderingContext.DEPTH_BUFFER_BIT;
}
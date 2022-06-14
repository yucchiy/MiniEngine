import { Program } from "./Program";

export class Uniform {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;
    private location: WebGLUniformLocation;

    constructor(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
        this.gl = gl;
        this.program = program;

        var location = this.gl.getUniformLocation(this.program, name);
        if (location == null) {
            throw Error("failed to get uniform(name = " + name + ")");
        }

        this.location = location;
    }

    uniform1f(x: number) {
        this.gl.uniform1f(this.location, x);
    }

    uniform1i(x: number) {
        this.gl.uniform1i(this.location, x);
    }
}
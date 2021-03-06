import { Shader } from "./Shader";
import { Uniform } from "./Uniform";

export class Program {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;

    constructor(gl: WebGL2RenderingContext, vertexShader: Shader, fragmentShader: Shader) {
        var program = gl.createProgram();
        if (program === null) {
            throw new Error("failed to create program.");
        }

        gl.attachShader(program, vertexShader.raw);
        gl.attachShader(program, fragmentShader.raw);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("failed to link program.(message = " + gl.getProgramInfoLog(program)+ ")");
        }

        this.gl = gl;
        this.program = program;
    }

    use() {
        this.gl.useProgram(this.program);
    }

    getAttributeLocation(attribute: string): number {
        return this.gl.getAttribLocation(this.program, attribute);
    }

    getUniform(name: string): Uniform {
        this.use();
        return new Uniform(this.gl, this.program, name);
    }
}
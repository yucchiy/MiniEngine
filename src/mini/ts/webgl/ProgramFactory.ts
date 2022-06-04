import { Program } from "./Program";
import { Shader } from "./Shader";

export class ProgramFactory {
    private gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    createProgram(vertexShader: Shader, fragmentShader: Shader) {
        return new Program(this.gl, vertexShader, fragmentShader);
    }
}
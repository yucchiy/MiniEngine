import { Program } from "./Program";
import { Shader } from "./Shader";

export class ProgramFactory {
    private gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    createProgram(vertexShader: Shader, fragmentShader: Shader) {
        return new Program(this.gl, vertexShader, fragmentShader);
    }
}
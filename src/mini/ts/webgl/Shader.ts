import { ShaderType } from "./ShaderType";

export class Shader {
    private shader: WebGLShader;

    constructor(gl: WebGLRenderingContext, type: ShaderType, source: string) {
        var shader = gl.createShader(type);
        if (shader === null) {
            throw new Error("failed to create shader.");
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error("failed to compile shader. (message = " + gl.getShaderInfoLog(shader) + ")");
        }

        this.shader = shader;
    }

    get raw(): WebGLShader {
        return this.shader;
    }
}
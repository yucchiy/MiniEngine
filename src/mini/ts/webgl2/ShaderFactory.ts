import { Shader } from "./Shader";
import { ShaderType } from "./ShaderType";

export class ShaderFactory {
    private gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    createVertexShader(source: string): Shader {
        return new Shader(this.gl, ShaderType.VertexShader, source);
    }

    createFragmentShader(source: string): Shader {
        return new Shader(this.gl, ShaderType.FragmentShader, source);
    }
}
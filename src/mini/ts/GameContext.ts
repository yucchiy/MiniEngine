import { Canvas } from "./Canvas";
import { Buffer as MiniBuffer } from "./webgl2/Buffer";
import { BufferFactory } from "./webgl2/BufferFactory";
import { BufferUsage } from "./webgl2/BufferUsage";
import { Program } from "./webgl2/Program";
import { ProgramFactory } from "./webgl2/ProgramFactory";
import { Shader } from "./webgl2/Shader";
import { ShaderFactory } from "./webgl2/ShaderFactory";

export class GameContext {
    gl: WebGL2RenderingContext;
    canvas: Canvas;
    private shaderFactory: ShaderFactory;
    private bufferFactory: BufferFactory;
    private programFactory: ProgramFactory;

    constructor(
        gl: WebGL2RenderingContext,
        canvas: Canvas,
        bufferFactroy: BufferFactory,
        shaderFactory: ShaderFactory,
        programFactory: ProgramFactory
    ) {
        this.gl = gl;
        this.canvas = canvas;
        this.bufferFactory = bufferFactroy;
        this.shaderFactory = shaderFactory;
        this.programFactory = programFactory;
    }

    createArrayBuffer<T extends BufferSource>(data: T, usage: BufferUsage): MiniBuffer<T> {
        return this.bufferFactory.createArrayBuffer<T>(data, usage);
    }

    createVertexShader(source: string): Shader {
        return this.shaderFactory.createVertexShader(source);
    }

    createFragmentShader(source: string): Shader {
        return this.shaderFactory.createFragmentShader(source);
    }

    createProgram(vertexShader: Shader, fragmentShader: Shader): Program {
        return this.programFactory.createProgram(vertexShader, fragmentShader);
    }
}
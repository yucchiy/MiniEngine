import { Canvas } from "./Canvas";
import { Buffer as MiniBuffer } from "./webgl/Buffer";
import { BufferFactory } from "./webgl/BufferFactory";
import { BufferUsage } from "./webgl/BufferUsage";
import { Program } from "./webgl/Program";
import { ProgramFactory } from "./webgl/ProgramFactory";
import { Shader } from "./webgl/Shader";
import { ShaderFactory } from "./webgl/ShaderFactory";

export class GameContext {
    gl: WebGLRenderingContext;
    canvas: Canvas;
    private shaderFactory: ShaderFactory;
    private bufferFactory: BufferFactory;
    private programFactory: ProgramFactory;

    constructor(
        gl: WebGLRenderingContext,
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
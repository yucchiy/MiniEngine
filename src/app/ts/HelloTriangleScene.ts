import { Game } from "../../mini/ts/Game";
import { Program } from "../../mini/ts/webgl/Program";
import { Shader } from "../../mini/ts/webgl/Shader";
import { ShaderType } from "../../mini/ts/webgl/ShaderType";
import { WebGLContext as GL } from "../../mini/ts/webgl/WebGLContext";
import { BaseScene } from "./BaseScene";
import { Buffer as MiniBuffer } from "../../mini/ts/webgl/Buffer";
import { BufferType } from "../../mini/ts/webgl/BufferType";
import { BufferUsage } from "../../mini/ts/webgl/BufferUsage";

import VertexShaderSource from "../glsl/HelloTriangleScene/vertex.glsl";
import FragmentShaderSource from "../glsl/HelloTriangleScene/fragment.glsl";

export class HelloTriangleScene extends BaseScene {
    private program: Program;
    private vertexPositionBuffer: MiniBuffer<Float32Array>;
    private vertexColorBuffer: MiniBuffer<Float32Array>;

    constructor(game : Game) {
        super(game);

        var positions = [
             0.0,  1.0, 0.0,
            -1.0, -0.5, 0.0,
             1.0, -0.5, 0.0,
        ];

        var colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
        ];

        var vertexShader = new Shader(this.game.gl, ShaderType.VertexShader, VertexShaderSource);
        var fragmentShader = new Shader(this.game.gl, ShaderType.FragmentShader, FragmentShaderSource);
        this.program = new Program(this.game.gl, vertexShader, fragmentShader);
        this.vertexPositionBuffer = new MiniBuffer(this.game.gl, BufferType.ArrayBuffer, new Float32Array(positions), BufferUsage.StaticDraw);
        this.vertexPositionBuffer.sendData();
        this.vertexColorBuffer = new MiniBuffer(this.game.gl, BufferType.ArrayBuffer, new Float32Array(colors), BufferUsage.StaticDraw);
        this.vertexColorBuffer.sendData();
    }

    renderScene(deltaTime: number): void {
        var gl = this.game.webglContext.rawContext;
        var canvas = this.game.canvas;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        this.program.use();

        var attributePosition = this.program.getAttributeLocation('position');
        this.vertexPositionBuffer.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        var attributeColor = this.program.getAttributeLocation('color');
        this.vertexColorBuffer.bind();
        gl.enableVertexAttribArray(attributeColor);
        gl.vertexAttribPointer(attributeColor, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.flush();
    }
}
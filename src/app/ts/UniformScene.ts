import { Program } from "../../mini/ts/webgl2/Program";
import { BaseScene } from "./BaseScene";
import { Buffer as MiniBuffer } from "../../mini/ts/webgl2/Buffer";
import { BufferUsage } from "../../mini/ts/webgl2/BufferUsage";

import VertexShaderSource from "../glsl/UniformScene/vertex.glsl";
import FragmentShaderSource from "../glsl/UniformScene/fragment.glsl";
import { GameContext } from "../../mini/ts/GameContext";
import { SceneCreator } from "../../mini/ts/SceneCreator";
import { VertexArray } from "../../mini/ts/webgl2/VertexArray";
import { Uniform } from "../../mini/ts/webgl2/Uniform";

export class UniformScene extends BaseScene {
    private program: Program;
    private alphaUniform: Uniform;
    private vertexArray: VertexArray;
    private vertexPositionBuffer: MiniBuffer<Float32Array>;
    private vertexColorBuffer: MiniBuffer<Float32Array>;
    private totalTime: number;

    constructor(ctx: GameContext) {
        super();

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

        var vertexShader = ctx.createVertexShader(VertexShaderSource);
        var fragmentShader = ctx.createFragmentShader(FragmentShaderSource);
        this.program = ctx.createProgram(vertexShader, fragmentShader);
        this.vertexArray = ctx.createVertexArray();
        this.vertexPositionBuffer = ctx.createArrayBuffer(new Float32Array(positions), BufferUsage.StaticDraw);
        this.vertexPositionBuffer.sendData();
        this.vertexColorBuffer = ctx.createArrayBuffer(new Float32Array(colors), BufferUsage.StaticDraw);
        this.vertexColorBuffer.sendData();

        this.program.use();
        this.alphaUniform = this.program.getUniform("alpha");
        var gl = ctx.gl;

        this.vertexArray.bind();

        var attributePosition = this.program.getAttributeLocation('position');
        this.vertexPositionBuffer.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        var attributeColor = this.program.getAttributeLocation('color');
        this.vertexColorBuffer.bind();
        gl.enableVertexAttribArray(attributeColor);
        gl.vertexAttribPointer(attributeColor, 4, gl.FLOAT, false, 0, 0);

        this.vertexArray.unbind();

        this.totalTime = 0;
    }

    renderScene(deltaTime: number, ctx: GameContext): void {
        var gl = ctx.gl;
        var canvas = ctx.canvas;
        this.totalTime += deltaTime;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var alpha = (Math.sin((this.totalTime / 1000)) + 1) * 0.5;
        this.alphaUniform.uniform1f(alpha);

        this.program.use();
        this.vertexArray.bind();

        gl.drawArrays(gl.TRIANGLES, 0, 3);

        this.vertexArray.unbind();

        gl.flush();
    }
}

export class UniformSceneCreator implements SceneCreator<UniformScene> {
    createScene(ctx: GameContext): UniformScene {
        return new UniformScene(ctx);
    }
}
import { Program } from "../../mini/ts/webgl2/Program";
import { BaseScene } from "./BaseScene";
import { Buffer as MiniBuffer } from "../../mini/ts/webgl2/Buffer";
import { BufferUsage } from "../../mini/ts/webgl2/BufferUsage";

import VertexShaderSource from "../glsl/HelloTriangleScene/vertex.glsl";
import FragmentShaderSource from "../glsl/HelloTriangleScene/fragment.glsl";
import { GameContext } from "../../mini/ts/GameContext";
import { SceneCreator } from "../../mini/ts/SceneCreator";

export class HelloTriangleScene extends BaseScene {
    private program: Program;
    private vertexPositionBuffer: MiniBuffer<Float32Array>;
    private vertexColorBuffer: MiniBuffer<Float32Array>;

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
        this.vertexPositionBuffer = ctx.createArrayBuffer(new Float32Array(positions), BufferUsage.StaticDraw);
        this.vertexPositionBuffer.sendData();
        this.vertexColorBuffer = ctx.createArrayBuffer(new Float32Array(colors), BufferUsage.StaticDraw);
        this.vertexColorBuffer.sendData();
    }

    renderScene(deltaTime: number, ctx: GameContext): void {
        var gl = ctx.gl;
        var canvas = ctx.canvas;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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

export class HelloTriangleSceneCreator implements SceneCreator<HelloTriangleScene> {
    createScene(ctx: GameContext): HelloTriangleScene {
        return new HelloTriangleScene(ctx);
    }
}
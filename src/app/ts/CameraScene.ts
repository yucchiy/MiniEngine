import { Program } from "../../mini/ts/webgl2/Program";
import { BaseScene } from "./BaseScene";
import { Buffer as MiniBuffer } from "../../mini/ts/webgl2/Buffer";
import { BufferUsage } from "../../mini/ts/webgl2/BufferUsage";

import VertexShaderSource from "../glsl/CameraScene/vertex.glsl";
import FragmentShaderSource from "../glsl/CameraScene/fragment.glsl";
import { GameContext } from "../../mini/ts/GameContext";
import { SceneCreator } from "../../mini/ts/SceneCreator";
import { VertexArray } from "../../mini/ts/webgl2/VertexArray";
import { Uniform } from "../../mini/ts/webgl2/Uniform";
import { mat4, vec3 } from "gl-matrix";
import GUI from "lil-gui";

export class CameraScene extends BaseScene {
    private program: Program;
    private vertexArray: VertexArray;
    private vertexPositionBuffer: MiniBuffer<Float32Array>;
    private vertexColorBuffer: MiniBuffer<Float32Array>;
    private indexBuffer : MiniBuffer<Uint16Array>;

    private modelMatrixUniform : Uniform;
    private viewMatrixUniform : Uniform;
    private projectionMatrixUniform : Uniform;

    private gui: GUI;

    constructor(ctx: GameContext) {
        super();

        var positions = [
            -0.5, -0.5, 0.0, // left-bottom
             0.5, -0.5, 0.0, // right-bottom
             0.5,  0.5, 0.0, // right-top
            -0.5,  0.5, 0.0, // left-top
        ];

        var indices = [
            0, 1, 2,
            0, 2, 3
        ];

        var colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
        ];

        var vertexShader = ctx.createVertexShader(VertexShaderSource);
        var fragmentShader = ctx.createFragmentShader(FragmentShaderSource);
        this.program = ctx.createProgram(vertexShader, fragmentShader);

        var identity = mat4.create();
        mat4.identity(identity);
        this.modelMatrixUniform = this.program.getUniform("ModelMatrix");
        this.modelMatrixUniform.uniformMatrix4(identity);
        this.viewMatrixUniform = this.program.getUniform("ViewMatrix");
        this.viewMatrixUniform.uniformMatrix4(ctx.camera.viewMatrix);
        this.projectionMatrixUniform = this.program.getUniform("ProjectionMatrix");
        this.projectionMatrixUniform.uniformMatrix4(ctx.camera.projectionMatrix);

        this.vertexArray = ctx.createVertexArray();
        this.vertexPositionBuffer = ctx.createArrayBuffer(new Float32Array(positions), BufferUsage.StaticDraw);
        this.vertexPositionBuffer.sendData();
        this.vertexColorBuffer = ctx.createArrayBuffer(new Float32Array(colors), BufferUsage.StaticDraw);
        this.vertexColorBuffer.sendData();

        this.indexBuffer = ctx.createIndexBuffer(new Uint16Array(indices), BufferUsage.StaticDraw);
        this.indexBuffer.sendData();

        this.program.use();
        var gl = ctx.gl;

        this.indexBuffer.bind();
        this.vertexArray.bind();

        var attributePosition = this.program.getAttributeLocation('position');
        this.vertexPositionBuffer.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        var attributeColor = this.program.getAttributeLocation('color');
        this.vertexColorBuffer.bind();
        gl.enableVertexAttribArray(attributeColor);
        gl.vertexAttribPointer(attributeColor, 4, gl.FLOAT, false, 0, 0);

        this.gui = new GUI();

        const folder = this.gui.addFolder('Camera position');
        folder.add(ctx.camera.position, '0', -10, 10);
        folder.add(ctx.camera.position, '1', -10, 10);
        folder.add(ctx.camera.position, '2', -10, 10);

        this.vertexArray.unbind();
    }

    renderScene(deltaTime: number, ctx: GameContext): void {
        var gl = ctx.gl;
        var canvas = ctx.canvas;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.viewMatrixUniform.uniformMatrix4(ctx.camera.viewMatrix);

        this.program.use();
        this.vertexArray.bind();
        this.indexBuffer.bind();

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

        this.vertexArray.unbind();

        gl.flush();
    }
}

export class CameraSceneCreator implements SceneCreator<CameraScene> {
    createScene(ctx: GameContext): CameraScene{
        return new CameraScene(ctx);
    }
}
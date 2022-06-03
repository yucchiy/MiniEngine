import { Game } from "../../mini/ts/Game";
import { WebGLContext as GL } from "../../mini/ts/WebGLContext";
import { BaseScene } from "./BaseScene";

export class EmptyScene extends BaseScene {
    constructor(game : Game) {
        super(game);
    }

    renderScene(deltaTime: number): void {
        var gl = this.game.gl;
        var canvas = this.game.canvas;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        gl.flush();
    }
}
import { GameContext } from "../../mini/ts/GameContext";
import { SceneCreator } from "../../mini/ts/SceneCreator";
import { BaseScene } from "./BaseScene";

export class EmptyScene extends BaseScene {
    renderScene(deltaTime: number, ctx: GameContext): void {
        var gl = ctx.gl;
        var canvas = ctx.canvas;

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.flush();
    }
}

export class EmptySceneCreator implements SceneCreator<EmptyScene> {
    createScene(ctx: GameContext): EmptyScene {
        return new EmptyScene();
    }
}
import { Game } from "../../mini/ts/Game";
import { IRenderable } from "../../mini/ts/IRenderable";
import { IScene } from "../../mini/ts/IScene";

export abstract class BaseScene implements IScene, IRenderable {
    game : Game;
    constructor(game : Game) {
        this.game = game;
    }

    render(deltaTime: number): void {
        this.renderScene(deltaTime);
    }

    abstract renderScene(deltaTime: number) : void
}
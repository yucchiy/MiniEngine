import { GameContext } from "../../mini/ts/GameContext";
import { Renderable } from "../../mini/ts/Renderable";
import { IScene } from "../../mini/ts/IScene";

export abstract class BaseScene implements IScene, Renderable {
    render(deltaTime: number, ctx: GameContext): void {
        this.renderScene(deltaTime, ctx);
    }

    abstract renderScene(deltaTime: number, ctx: GameContext) : void
}
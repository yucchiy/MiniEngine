import { GameContext } from "./GameContext";
import { IScene } from "./IScene";

export interface SceneCreator<T extends IScene> {
    createScene(ctx: GameContext): T;
}
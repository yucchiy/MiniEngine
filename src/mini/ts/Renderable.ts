import { GameContext } from "./GameContext";

export interface Renderable {
    render(deltaTime : number, ctx: GameContext) : void;
}
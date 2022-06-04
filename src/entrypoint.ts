import { EmptyScene } from "./app/ts/EmptyScene";
import { HelloTriangleScene } from "./app/ts/HelloTriangleScene";
import { Game } from "./mini/ts/Game"

window.onload = function() {
    var game = new Game(document.body);
    game.run(new HelloTriangleScene(game));
}
import { EmptyScene } from "./app/ts/EmptyScene";
import { Game } from "./mini/ts/Game"

window.onload = function() {
    var game = new Game(document.body);
    game.run(new EmptyScene(game));
}
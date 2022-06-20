import { CameraSceneCreator } from "./app/ts/CameraScene";
import { EmptySceneCreator } from "./app/ts/EmptyScene";
import { HelloTriangleSceneCreator } from "./app/ts/HelloTriangleScene";
import { IndexBufferSceneCreator } from "./app/ts/IndexBufferScene";
import { TextureSceneCreator } from "./app/ts/TextureScene";
import { UniformSceneCreator } from "./app/ts/UniformScene";
import { Game } from "./mini/ts/Game"

window.onload = function() {
    var game = new Game(document.body);
    // game.run(new HelloTriangleSceneCreator());
    // game.run(new UniformSceneCreator());
    // game.run(new IndexBufferSceneCreator());
    // game.run(new CameraSceneCreator());
    game.run(new TextureSceneCreator());
}
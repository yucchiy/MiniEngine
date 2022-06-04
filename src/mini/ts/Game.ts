import { Canvas } from "./Canvas";
import { CanvasFactory } from "./CanvasFactory";
import { IRenderable } from "./IRenderable";
import { IScene } from "./IScene";
import { WebGLContext } from "./webgl/WebGLContext";
import { WebGLContextFactory } from "./webgl/WebGLContextFactory";

export class Game {
    canvas : Canvas;
    webglContext : WebGLContext;
    gl: WebGLRenderingContext;

    constructor(body : HTMLElement) {
        this.canvas = CanvasFactory.CreateCanvas(body);
        this.webglContext = WebGLContextFactory.CreateContext(this.canvas);
        this.gl = this.webglContext.rawContext;
        this.canvas.setSize(600, 600);
    }

    run(firstScene : IScene) {
        var timestamp = function() {
           return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        };

        var currentTime = timestamp(), deltaTime;
        var currentScene = firstScene as IRenderable;

        var frame = function() {
            var previousTime = currentTime;
            currentTime = timestamp();
            deltaTime = currentTime - previousTime;

            currentScene.render(deltaTime);

            window.requestAnimationFrame(frame);
        }

        // main loop
        frame();
    }
}
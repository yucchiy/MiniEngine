import { Canvas } from "./Canvas";
import { CanvasFactory } from "./CanvasFactory";
import { GameContext } from "./GameContext";
import { IScene } from "./IScene";
import { SceneCreator } from "./SceneCreator";
import { BufferFactory } from "./webgl/BufferFactory";
import { ProgramFactory } from "./webgl/ProgramFactory";
import { ShaderFactory } from "./webgl/ShaderFactory";
import { WebGLContextFactory } from "./webgl/WebGLContextFactory";

export class Game {
    private canvasFactory: CanvasFactory;
    private webGLContextFactory: WebGLContextFactory;
    private shaderFactory: ShaderFactory;
    private bufferFactory: BufferFactory;
    private programFactory: ProgramFactory;

    private context: GameContext;

    canvas : Canvas;
    gl: WebGLRenderingContext;

    constructor(body : HTMLElement) {
        // build factories
        this.canvasFactory = new CanvasFactory();
        this.webGLContextFactory = new WebGLContextFactory();

        this.canvas = this.canvasFactory.createCanvas(body);
        this.gl = this.webGLContextFactory.createContext(this.canvas);

        this.shaderFactory = new ShaderFactory(this.gl);
        this.bufferFactory = new BufferFactory(this.gl);
        this.programFactory = new ProgramFactory(this.gl);

        // build game context
        this.context = new GameContext(this.gl, this.canvas, this.bufferFactory, this.shaderFactory, this.programFactory);

        this.canvas.setSize(600, 600);
    }

    run<T extends IScene>(firstSceneCreator: SceneCreator<T>) {
        var timestamp = function() {
           return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        };

        var currentTime = timestamp(), deltaTime;
        var currentScene = firstSceneCreator.createScene(this.context);
        var ctx = this.context;

        var frame = function() {
            var previousTime = currentTime;
            currentTime = timestamp();
            deltaTime = currentTime - previousTime;

            currentScene.render(deltaTime, ctx);

            window.requestAnimationFrame(frame);
        }

        // main loop
        frame();
    }
}
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { CanvasFactory } from "./CanvasFactory";
import { GameContext } from "./GameContext";
import { IScene } from "./IScene";
import { SceneCreator } from "./SceneCreator";
import { BufferFactory } from "./webgl2/BufferFactory";
import { ProgramFactory } from "./webgl2/ProgramFactory";
import { ShaderFactory } from "./webgl2/ShaderFactory";
import { VertexArrayFactory } from "./webgl2/VertexArrayFactory";
import { WebGL2ContextFactory } from "./webgl2/WebGL2ContextFactory";

export class Game {
    private canvasFactory: CanvasFactory;
    private webGLContextFactory: WebGL2ContextFactory;
    private shaderFactory: ShaderFactory;
    private bufferFactory: BufferFactory;
    private vertexArrayFactory: VertexArrayFactory;
    private programFactory: ProgramFactory;

    private context: GameContext;

    canvas : Canvas;
    camera: Camera;
    gl: WebGL2RenderingContext;

    constructor(body : HTMLElement) {
        // build factories
        this.canvasFactory = new CanvasFactory();
        this.webGLContextFactory = new WebGL2ContextFactory();

        this.canvas = this.canvasFactory.createCanvas(body);
        this.camera = new Camera(this.canvas);
        this.gl = this.webGLContextFactory.createContext(this.canvas);

        this.shaderFactory = new ShaderFactory(this.gl);
        this.bufferFactory = new BufferFactory(this.gl);
        this.vertexArrayFactory = new VertexArrayFactory(this.gl);
        this.programFactory = new ProgramFactory(this.gl);

        // build game context
        this.context = new GameContext(this.gl, this.canvas, this.camera, this.bufferFactory, this.vertexArrayFactory, this.shaderFactory, this.programFactory);

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
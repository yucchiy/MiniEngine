import { mat4, vec3 } from "gl-matrix";
import { Canvas } from "./Canvas";

export class Camera {
    private canvas: Canvas;
    public position: vec3;
    public center: vec3;
    public fov: number;
    public near: number;
    public far: number;

    constructor(canvas: Canvas) {
        this.canvas = canvas;

        this.position = [0, 5, -5];
        this.center = [0, 0, 0];
        this.fov = 30;
        this.near = 0.1;
        this.far = 10;
    }

    get viewMatrix(): mat4 {
        var m = mat4.create();
        mat4.lookAt(m, this.position, this.center, [0, 1, 0]);
        return m;
    }

    get projectionMatrix(): mat4 {
        var m = mat4.create();
        mat4.perspectiveNO(m, this.fov * Math.PI / 180, this.canvas.aspect, this.near, this.far);
        return m;
    }
}
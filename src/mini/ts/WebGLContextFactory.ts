import { Canvas } from "./Canvas";
import { WebGLContext } from "./WebGLContext";

export class WebGLContextFactory {
    static CreateContext(canvas : Canvas) : WebGLContext {
        var gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
        return new WebGLContext(gl);
    }
}
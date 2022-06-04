import { Canvas } from "../Canvas";

export class WebGLContextFactory {
    createContext(canvas : Canvas) : WebGLRenderingContext {
        var gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
        return gl;
    }
}
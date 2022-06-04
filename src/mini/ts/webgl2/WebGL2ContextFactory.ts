import { Canvas } from "../Canvas";

export class WebGL2ContextFactory {
    createContext(canvas : Canvas) : WebGL2RenderingContext {
        var gl = (canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2')) as WebGL2RenderingContext;
        return gl;
    }
}
import { Buffer as MiniBuffer } from './Buffer';
import { BufferType } from './BufferType';
import { BufferUsage } from './BufferUsage';

export class BufferFactory {
    private gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    createArrayBuffer<T extends BufferSource>(data: T, usage: BufferUsage): MiniBuffer<T> {
        return new MiniBuffer<T>(this.gl, BufferType.ArrayBuffer, data, usage);
    }
}
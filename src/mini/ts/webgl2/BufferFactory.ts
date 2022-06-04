import { Buffer as MiniBuffer } from './Buffer';
import { BufferType } from './BufferType';
import { BufferUsage } from './BufferUsage';

export class BufferFactory {
    private gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    createArrayBuffer<T extends BufferSource>(data: T, usage: BufferUsage): MiniBuffer<T> {
        return new MiniBuffer<T>(this.gl, BufferType.ArrayBuffer, data, usage);
    }
}
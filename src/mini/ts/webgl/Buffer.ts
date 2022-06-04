import { BufferType } from "./BufferType";
import { BufferUsage } from "./BufferUsage";

export class Buffer<T extends BufferSource> {
    private gl: WebGLRenderingContext;
    private target: BufferType;
    private usage: BufferUsage;
    private buffer: WebGLBuffer;
    private data: T;

    constructor(gl: WebGLRenderingContext, target: BufferType, data: T, usage: BufferUsage) {
        var buffer = gl.createBuffer();
        if (buffer === null) {
            throw new Error("failed to create buffer");
        }

        this.gl = gl;
        this.target = target;
        this.usage = usage;
        this.buffer = buffer;
        this.data = data;
    }

    sendData() {
        this.bind();
        this.gl.bufferData(this.target, this.data, this.usage);
    }

    bind() {
        this.gl.bindBuffer(this.target, this.buffer);
    }

    unbind() {
        this.gl.bindBuffer(this.target, null);
    }
}
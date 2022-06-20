#version 300 es

precision mediump float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D texture1;

void main(void) {
    outColor = texture(texture1, vUv);
}

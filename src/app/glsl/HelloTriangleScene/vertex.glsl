attribute vec3 position;
attribute vec4 color;

varying vec4 outColor;

void main(void) {
    outColor = color;
    gl_Position = vec4(position, 1.0);
}
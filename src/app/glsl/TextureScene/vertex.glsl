#version 300 es

in vec3 position;
in vec2 uv;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

out vec4 vColor;
out vec2 vUv;

void main(void) {
    vUv = uv;
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(position, 1.0);
}
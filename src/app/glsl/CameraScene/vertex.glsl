#version 300 es

in vec3 position;
in vec4 color;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

out vec4 vColor;

void main(void) {
    vColor = color;
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(position, 1.0);
}
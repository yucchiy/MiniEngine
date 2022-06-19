import { GameContext } from "./GameContext";

export class PrimitiveFactory {
    private ctx: GameContext;

    constructor(ctx: GameContext) {
        this.ctx = ctx;
    }

    createCubePositionIndicesNormal(scale: number): [Array<number>, Array<number>, Array<number>] {
        return [[...PrimitiveFactory.CubePositions], [...PrimitiveFactory.CubeIndices], [...PrimitiveFactory.CubeNormal]];
    }

    static CubePositions: Array<number> = [
        // front
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        // top
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,
        // back
         0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
        // bottom
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5,
        // let
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5,
        // right
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
    ];

    static CubeIndices: Array<number> = [
        // front
        0,  1,  2,
        2,  3,  0,
        // top
        4,  5,  6,
        6,  7,  4,
        // back
        8,  9, 10,
        10, 11,  8,
        // bottom
        12, 13, 14,
        14, 15, 12,
        // left
        16, 17, 18,
        18, 19, 16,
        // right
        20, 21, 22,
        22, 23, 20,
    ];

    static CubeNormal: Array<number> = [
        // front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        // top
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        // back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        // bottom
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        // let
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        // right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    ];
}

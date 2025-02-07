import { Frame } from "../entity/Frame";

export interface CameraInterface {
    id: number;
    host: string;
    name: string;
    width: number;
    height: number;
    fps: number;
    frames: Frame[];
};

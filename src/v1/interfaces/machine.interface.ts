import { Camera } from "../entity/Camera";

export interface MachineInterface {
    id: number;
    name: string;
    cameras: Camera[];
};
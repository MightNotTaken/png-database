import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityMetaInfo } from "./entity-meta-info";
import { FrameInterface } from "../interfaces/frame.interface";
import { Camera } from "./Camera";
import { KeyInterface } from "../interfaces/key.interface";

@Entity()
export class Frame extends EntityMetaInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    top: number;

    @Column()
    left: number;

    @Column()
    bottom: number;

    @Column()
    right: number;

    @Column()
    sachet: number;

    @Column({
        default: false
    })
    capture: boolean;

    @Column({
        default: false
    })
    leakage: boolean;

    @Column({
        default: 'unknown'
    })
    category: string;
    
    @ManyToOne(() => Camera, camera => camera.frames, { onDelete: 'CASCADE' })
    camera: Camera;

    constructor(init: Partial<FrameInterface>) {
        super();
        if (!init) {
            return;
        }
        Object.assign(this, init);
    }

    public static keys(): KeyInterface[] {
        return [
            {
                key: 'top',
                type: 'number',
                native: true
            },
            {
                key: 'left',
                type: 'number',
                native: true
            },
            {
                key: 'bottom',
                type: 'number',
                native: true
            },
            {
                key: 'right',
                type: 'number',
                native: true
            },
            {
                key: 'sachet',
                type: 'number',
                native: true
            },
            {
                key: 'camera',
                type: Camera,
                native: false
            }
        ];
    }
}
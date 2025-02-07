import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityMetaInfo } from "./entity-meta-info";
import { CameraInterface } from "../interfaces/camera.interface";
import { Frame } from "./Frame";
import { KeyInterface } from "../interfaces/key.interface";
import { Machine } from "./Machine";

@Entity()
export class Camera extends EntityMetaInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    width: number;
    
    @Column()
    height: number;

    @Column({
        default: 0
    })
    fps: number;

    @Column({
        default: false
    })
    capture: boolean;
    
    @OneToMany(() => Frame, frame => frame.camera, { cascade: true })
    frames: Frame[];

    @ManyToOne(() => Machine, machine => machine.cameras, { onDelete: 'CASCADE' })
    machine: Machine;

    constructor(init: Partial<CameraInterface>) {
        super();
        if (!init) {
            return;
        }
        Object.assign(this, init);
    }

    public static keys(): KeyInterface[] {
        return [
            {
                key: 'name',
                type: 'string',
                native: true
            },
            {
                key: 'width',
                type: 'number',
                native: true
            },
            {
                key: 'height',
                type: 'number',
                native: true
            },
            {
                key: 'frames',
                type: Frame,
                native: false,
                optional: true,
                population: 'array'
            },
        ];
    }
}
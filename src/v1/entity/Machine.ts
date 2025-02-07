import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityMetaInfo } from "./entity-meta-info";
import { Camera } from "./Camera";
import { MachineInterface } from "../interfaces/machine.interface";
import { populate } from "dotenv";
import { KeyInterface } from "../interfaces/key.interface";

@Entity()
export class Machine extends EntityMetaInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Camera, camera => camera.machine, { cascade: true })
    cameras: Camera[];

    constructor(init: Partial<MachineInterface>) {
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
                key: 'camera',
                type: Camera,
                native: false,
                optional: true,
                population: 'array'
            }
        ];
    }

}
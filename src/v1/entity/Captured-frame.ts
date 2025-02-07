import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityMetaInfo } from "./entity-meta-info";
import { FrameInterface } from "../interfaces/frame.interface";
import { Camera } from "./Camera";
import { KeyInterface } from "../interfaces/key.interface";

@Entity()
export class CapturedFrame extends EntityMetaInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sachet: number;
    
    @Column()
    label: string;
    
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
                key: 'sachet',
                type: 'number',
                native: true
            },
            {
                key: 'label',
                type: 'number',
                native: true
            }
        ];
    }
}
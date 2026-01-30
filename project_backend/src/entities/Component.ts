import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("COMPONENT")
export class Component {
    @PrimaryColumn({name: "COMP_ID", type: "int", nullable: false})
    compId!: number;

    @Column({name: "COMP_NAME", type: "varchar", length: 32, nullable: false})
    compName!: string;

    @Column({name: "COMP_QTY", type: "int", nullable: false})
    compQuantity!: number;

    @Column({name: "COMP_SPECS", type: "varchar", length: 32, nullable: false})
    compSpecs!: string;

    @Column({name: "PLANT_ID", type: "int", nullable: true})
    plantId!: number | null;
}
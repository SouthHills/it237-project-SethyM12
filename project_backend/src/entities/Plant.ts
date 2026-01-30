import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("Plant")
export class Plant {
    @PrimaryColumn({name: "PLANT_ID", type: "int", nullable: false})
    plantId!: number;

    @Column({name: "PLANT_NAME", type: "varchar", length: 32, nullable: false})
    plantName!: string;

    @Column({name: "PLANT_CITY", type: "varchar", length: 32, nullable: false})
    plantLocation!: string;

    @Column({name: "PLANT_STATE", type: "char", length: 2, nullable: false})
    plantState!: string;
}
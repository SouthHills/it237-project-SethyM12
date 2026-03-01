import {Entity, PrimaryColumn} from "typeorm";

@Entity("BUILD")
export class Build {
    @PrimaryColumn({name: "COMP_ID", type: "int", nullable: false})
    compId!: number;

    @PrimaryColumn({name: "PART_ID", type: "int", nullable: false})
    partId!: number;
}
import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("PART")
export class Part{
    @PrimaryColumn({name: "PART_ID", type: "int", nullable: false})
    partId!: number;

    @Column({name: "PART_NAME", type: "varchar", length: 64, nullable: false})
    partName!: string;

    @Column({name: "PART_QTY", type: "int", nullable: false})
    partQuantity!: number;

    @Column({name: "PART_SPECS", type: "varchar", length: 32, nullable: false})
    partSpecs!: string;

    @Column({name: "VENDOR_ID", type: "int", nullable: true})
    vendorId!: number | null;
}
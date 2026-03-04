import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("VENDOR")
export class Vendor {
    @PrimaryColumn({name: "VENDOR_ID", type: "int", nullable: false})
    vendorId!: number;

    @Column({name: "VENDOR_NAME", type: "varchar", length: 32, nullable: false})
    vendorName!: string;

    @Column({name: "VENDOR_CITY", type: "varchar", length: 32, nullable: false})
    vendorCity!: string;

    @Column({name: "VENDOR_STATE", type: "char", length: 2, nullable: false})
    vendorState!: string;
}
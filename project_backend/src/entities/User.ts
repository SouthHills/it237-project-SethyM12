import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("USER")
export class User {
    @PrimaryColumn({name: "USER_ID", type: "int", nullable: false})
    userId!: number;

    @Column({name: "USER_FNAME", type: "varchar", length: 32, nullable: false})
    userFname!: string;

    @Column({name: "USER_LNAME", type: "varchar", length: 32, nullable: false})
    userLname!: string;

    @Column({name: "USER_EMAIL", type: "varchar", length: 64, nullable: false})
    userEmail!: string;

    @Column({name: "USER_PASSWORD", type: "varchar", length: 64, nullable: false})
    userPassword!: string;

    @Column({name: "USER_ROLE_MANAGER", type: "bit", nullable: false})
    userRoleManager!: number;

    @Column({name: "USER_TOKEN", type: "varchar", length: 500, nullable: true})
    userToken!: string | null;

    @Column({name: "PLANT_ID", type: "int", nullable: true})
    plantId!: number | null;
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, PrimaryColumn } from "typeorm";
let User = class User {
};
__decorate([
    PrimaryColumn({ name: "USER_ID", type: "int", nullable: false })
], User.prototype, "userId", void 0);
__decorate([
    Column({ name: "USER_FNAME", type: "varchar", length: 32, nullable: false })
], User.prototype, "userFname", void 0);
__decorate([
    Column({ name: "USER_LNAME", type: "varchar", length: 32, nullable: false })
], User.prototype, "userLname", void 0);
__decorate([
    Column({ name: "USER_EMAIL", type: "varchar", length: 64, nullable: false })
], User.prototype, "userEmail", void 0);
__decorate([
    Column({ name: "USER_PASSWORD", type: "varchar", length: 64, nullable: false })
], User.prototype, "userPassword", void 0);
__decorate([
    Column({ name: "USER_ROLE_MANAGER", type: "bit", nullable: false })
], User.prototype, "userRoleManager", void 0);
__decorate([
    Column({ name: "USER_TOKEN", type: "varchar", length: 500, nullable: true })
], User.prototype, "userToken", void 0);
__decorate([
    Column({ name: "PLANT_ID", type: "int", nullable: true })
], User.prototype, "plantId", void 0);
User = __decorate([
    Entity("USER")
], User);
export { User };

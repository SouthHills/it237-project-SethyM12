var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, PrimaryColumn } from "typeorm";
let Plant = class Plant {
    plantId;
    plantName;
    plantLocation;
    plantState;
};
__decorate([
    PrimaryColumn({ name: "PLANT_ID", type: "int", nullable: false })
], Plant.prototype, "plantId", void 0);
__decorate([
    Column({ name: "PLANT_NAME", type: "varchar", length: 32, nullable: false })
], Plant.prototype, "plantName", void 0);
__decorate([
    Column({ name: "PLANT_CITY", type: "varchar", length: 32, nullable: false })
], Plant.prototype, "plantLocation", void 0);
__decorate([
    Column({ name: "PLANT_STATE", type: "char", length: 2, nullable: false })
], Plant.prototype, "plantState", void 0);
Plant = __decorate([
    Entity("PLANT")
], Plant);
export { Plant };

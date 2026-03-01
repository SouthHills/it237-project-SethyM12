var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, PrimaryColumn } from "typeorm";
let Component = class Component {
};
__decorate([
    PrimaryColumn({ name: "COMP_ID", type: "int", nullable: false })
], Component.prototype, "compId", void 0);
__decorate([
    Column({ name: "COMP_NAME", type: "varchar", length: 32, nullable: false })
], Component.prototype, "compName", void 0);
__decorate([
    Column({ name: "COMP_QTY", type: "int", nullable: false })
], Component.prototype, "compQuantity", void 0);
__decorate([
    Column({ name: "COMP_SPECS", type: "varchar", length: 32, nullable: false })
], Component.prototype, "compSpecs", void 0);
__decorate([
    Column({ name: "PLANT_ID", type: "int", nullable: true })
], Component.prototype, "plantId", void 0);
Component = __decorate([
    Entity("COMPONENT")
], Component);
export { Component };

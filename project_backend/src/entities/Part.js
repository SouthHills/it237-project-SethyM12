var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, PrimaryColumn } from "typeorm";
let Part = class Part {
    partId;
    partName;
    partQuantity;
    partSpecs;
    vendorId;
};
__decorate([
    PrimaryColumn({ name: "PART_ID", type: "int", nullable: false })
], Part.prototype, "partId", void 0);
__decorate([
    Column({ name: "PART_NAME", type: "varchar", length: 64, nullable: false })
], Part.prototype, "partName", void 0);
__decorate([
    Column({ name: "PART_QTY", type: "int", nullable: false })
], Part.prototype, "partQuantity", void 0);
__decorate([
    Column({ name: "PART_SPECS", type: "varchar", length: 32, nullable: false })
], Part.prototype, "partSpecs", void 0);
__decorate([
    Column({ name: "VENDOR_ID", type: "int", nullable: true })
], Part.prototype, "vendorId", void 0);
Part = __decorate([
    Entity("PART")
], Part);
export { Part };

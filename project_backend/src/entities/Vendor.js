var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, PrimaryColumn } from "typeorm";
let Vendor = class Vendor {
};
__decorate([
    PrimaryColumn({ name: "VENDOR_ID", type: "int", nullable: false })
], Vendor.prototype, "vendorId", void 0);
__decorate([
    Column({ name: "VENDOR_NAME", type: "varchar", length: 32, nullable: false })
], Vendor.prototype, "vendorName", void 0);
__decorate([
    Column({ name: "VENDOR_CITY", type: "varchar", length: 32, nullable: false })
], Vendor.prototype, "vendorCity", void 0);
__decorate([
    Column({ name: "VENDOR_STATE", type: "char", length: 2, nullable: false })
], Vendor.prototype, "vendorState", void 0);
Vendor = __decorate([
    Entity("VENDOR")
], Vendor);
export { Vendor };

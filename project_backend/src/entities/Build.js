var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryColumn } from "typeorm";
let Build = class Build {
    compId;
    partId;
};
__decorate([
    PrimaryColumn({ name: "COMP_ID", type: "int", nullable: false })
], Build.prototype, "compId", void 0);
__decorate([
    PrimaryColumn({ name: "PART_ID", type: "int", nullable: false })
], Build.prototype, "partId", void 0);
Build = __decorate([
    Entity("BUILD")
], Build);
export { Build };

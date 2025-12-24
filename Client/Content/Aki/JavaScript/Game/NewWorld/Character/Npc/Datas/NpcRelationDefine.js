"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSharingRelation = exports.NpcRelation = undefined;
class NpcRelation {
  constructor() {
    this.RelationType = 0;
  }
}
class MotorcycleSharingRelation extends (exports.NpcRelation = NpcRelation) {
  constructor() {
    super(...arguments);
    this.RelationType = 2;
  }
}
exports.MotorcycleSharingRelation = MotorcycleSharingRelation;
//# sourceMappingURL=NpcRelationDefine.js.map
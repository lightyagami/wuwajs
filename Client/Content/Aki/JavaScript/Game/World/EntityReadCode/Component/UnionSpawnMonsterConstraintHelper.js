"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpawnMonsterConstraintHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSpawnMonsterConstraintAnnularSector_1 = require("./FbSpawnMonsterConstraintAnnularSector");
class UnionSpawnMonsterConstraintHelper {
  static GetUnionSpawnMonsterConstraintObject(n) {
    if (n === fb_component_1.UnionSpawnMonsterConstraint.SpawnMonsterConstraintAnnularSector) {
      return new fb_component_1.SpawnMonsterConstraintAnnularSector();
    }
  }
  static ReadUnionSpawnMonsterConstraint(n, t) {
    if (t !== undefined && n === fb_component_1.UnionSpawnMonsterConstraint.SpawnMonsterConstraintAnnularSector) {
      return FbSpawnMonsterConstraintAnnularSector_1.FbSpawnMonsterConstraintAnnularSector.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSpawnMonsterConstraintHelper = UnionSpawnMonsterConstraintHelper;
//# sourceMappingURL=UnionSpawnMonsterConstraintHelper.js.map
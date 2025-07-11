"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpawnMonsterPreConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSpawnMonsterPreDependOnPreceding_1 = require("./FbSpawnMonsterPreDependOnPreceding");
class UnionSpawnMonsterPreConditionHelper {
  static GetUnionSpawnMonsterPreConditionObject(e) {
    if (e === fb_component_1.UnionSpawnMonsterPreCondition.SpawnMonsterPreDependOnPreceding) {
      return new fb_component_1.SpawnMonsterPreDependOnPreceding();
    }
  }
  static ReadUnionSpawnMonsterPreCondition(e, n) {
    if (n !== undefined && e === fb_component_1.UnionSpawnMonsterPreCondition.SpawnMonsterPreDependOnPreceding) {
      return FbSpawnMonsterPreDependOnPreceding_1.FbSpawnMonsterPreDependOnPreceding.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionSpawnMonsterPreConditionHelper = UnionSpawnMonsterPreConditionHelper;
//# sourceMappingURL=UnionSpawnMonsterPreConditionHelper.js.map
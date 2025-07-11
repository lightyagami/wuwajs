"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPasserbyNpcSpawnHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPasserbyNpcFixIntervalSpawn_1 = require("./FbPasserbyNpcFixIntervalSpawn");
class UnionPasserbyNpcSpawnHelper {
  static GetUnionPasserbyNpcSpawnObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcSpawn.PasserbyNpcFixIntervalSpawn) {
      return new fb_component_1.PasserbyNpcFixIntervalSpawn();
    }
  }
  static ReadUnionPasserbyNpcSpawn(e, n) {
    if (n !== undefined && e === fb_component_1.UnionPasserbyNpcSpawn.PasserbyNpcFixIntervalSpawn) {
      return FbPasserbyNpcFixIntervalSpawn_1.FbPasserbyNpcFixIntervalSpawn.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionPasserbyNpcSpawnHelper = UnionPasserbyNpcSpawnHelper;
//# sourceMappingURL=UnionPasserbyNpcSpawnHelper.js.map
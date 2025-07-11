"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcSpawnComponent = undefined;
const UnionPasserbyNpcMoveHelper_1 = require("./UnionPasserbyNpcMoveHelper");
const UnionPasserbyNpcSourceHelper_1 = require("./UnionPasserbyNpcSourceHelper");
const UnionPasserbyNpcSpawnHelper_1 = require("./UnionPasserbyNpcSpawnHelper");
class FbPasserbyNpcSpawnComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.OEh = false;
    this.FEh = undefined;
    this.bQh = false;
    this.LQh = undefined;
    this.AQh = false;
    this.xQh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPasserbyNpcSpawnComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MoveConfig() {
    var e;
    var s;
    if (!this.OEh && (this.OEh = true, e = this.FbDataInternal.moveConfigType(), s = UnionPasserbyNpcMoveHelper_1.UnionPasserbyNpcMoveHelper.GetUnionPasserbyNpcMoveObject(e))) {
      this.FEh = UnionPasserbyNpcMoveHelper_1.UnionPasserbyNpcMoveHelper.ReadUnionPasserbyNpcMove(e, this.FbDataInternal.moveConfig(s));
    }
    return this.FEh;
  }
  get SpawnConfig() {
    var e;
    var s;
    if (!this.bQh && (this.bQh = true, e = this.FbDataInternal.spawnConfigType(), s = UnionPasserbyNpcSpawnHelper_1.UnionPasserbyNpcSpawnHelper.GetUnionPasserbyNpcSpawnObject(e))) {
      this.LQh = UnionPasserbyNpcSpawnHelper_1.UnionPasserbyNpcSpawnHelper.ReadUnionPasserbyNpcSpawn(e, this.FbDataInternal.spawnConfig(s));
    }
    return this.LQh;
  }
  get SourceConfig() {
    var e;
    var s;
    if (!this.AQh && (this.AQh = true, e = this.FbDataInternal.sourceConfigType(), s = UnionPasserbyNpcSourceHelper_1.UnionPasserbyNpcSourceHelper.GetUnionPasserbyNpcSourceObject(e))) {
      this.xQh = UnionPasserbyNpcSourceHelper_1.UnionPasserbyNpcSourceHelper.ReadUnionPasserbyNpcSource(e, this.FbDataInternal.sourceConfig(s));
    }
    return this.xQh;
  }
}
exports.FbPasserbyNpcSpawnComponent = FbPasserbyNpcSpawnComponent;
//# sourceMappingURL=FbPasserbyNpcSpawnComponent.js.map
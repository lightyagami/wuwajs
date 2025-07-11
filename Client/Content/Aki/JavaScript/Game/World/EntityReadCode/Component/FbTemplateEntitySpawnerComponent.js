"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTemplateEntitySpawnerComponent = undefined;
const UnionSpawnConfigHelper_1 = require("./UnionSpawnConfigHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTemplateEntitySpawnerComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.KPc = false;
    this.XPc = undefined;
    this.YPc = false;
    this.zPc = undefined;
    this.bQh = false;
    this.LQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTemplateEntitySpawnerComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SpawnConditions() {
    if (!this.KPc) {
      this.KPc = true;
      this.XPc = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.spawnConditions());
    }
    return this.XPc;
  }
  get ClearConditions() {
    if (!this.YPc) {
      this.YPc = true;
      this.zPc = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.clearConditions());
    }
    return this.zPc;
  }
  get SpawnConfig() {
    var t;
    var i;
    if (!this.bQh && (this.bQh = true, t = this.FbDataInternal.spawnConfigType(), i = UnionSpawnConfigHelper_1.UnionSpawnConfigHelper.GetUnionSpawnConfigObject(t))) {
      this.LQh = UnionSpawnConfigHelper_1.UnionSpawnConfigHelper.ReadUnionSpawnConfig(t, this.FbDataInternal.spawnConfig(i));
    }
    return this.LQh;
  }
}
exports.FbTemplateEntitySpawnerComponent = FbTemplateEntitySpawnerComponent;
//# sourceMappingURL=FbTemplateEntitySpawnerComponent.js.map
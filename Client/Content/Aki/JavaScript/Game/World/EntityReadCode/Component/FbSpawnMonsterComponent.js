"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnMonsterComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSpawnMonsterConfig_1 = require("./FbSpawnMonsterConfig");
const UnionSpawnMonsterConstraintHelper_1 = require("./UnionSpawnMonsterConstraintHelper");
const UnionSpawnMonsterStartConditionHelper_1 = require("./UnionSpawnMonsterStartConditionHelper");
class FbSpawnMonsterComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Oqh = false;
    this.Fqh = undefined;
    this.Nqh = false;
    this.Vqh = undefined;
    this.jqh = false;
    this.Hqh = false;
    this.Wqh = false;
    this.Qqh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSpawnMonsterComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ActiveType() {
    var t;
    var n;
    if (!this.Oqh && (this.Oqh = true, t = this.FbDataInternal.activeTypeType(), n = UnionSpawnMonsterStartConditionHelper_1.UnionSpawnMonsterStartConditionHelper.GetUnionSpawnMonsterStartConditionObject(t))) {
      this.Fqh = UnionSpawnMonsterStartConditionHelper_1.UnionSpawnMonsterStartConditionHelper.ReadUnionSpawnMonsterStartCondition(t, this.FbDataInternal.activeType(n));
    }
    return this.Fqh;
  }
  get SpawnMonsterConfigs() {
    if (!this.Nqh) {
      this.Nqh = true;
      this.Vqh = new Array();
      var n = this.FbDataInternal.spawnMonsterConfigsLength();
      if (n) {
        for (let t = 0; t < n; ++t) {
          var i = this.FbDataInternal.spawnMonsterConfigs(t, new fb_component_1.SpawnMonsterConfig());
          this.Vqh.push(FbSpawnMonsterConfig_1.FbSpawnMonsterConfig.Create(i));
        }
      }
    }
    return this.Vqh;
  }
  get IssharedHatred() {
    if (!this.jqh) {
      this.jqh = true;
      this.Hqh = this.FbDataInternal.issharedHatred();
    }
    return this.Hqh;
  }
  get SpawnMonsterConstraintType() {
    var t;
    var n;
    if (!this.Wqh && (this.Wqh = true, t = this.FbDataInternal.spawnMonsterConstraintTypeType(), n = UnionSpawnMonsterConstraintHelper_1.UnionSpawnMonsterConstraintHelper.GetUnionSpawnMonsterConstraintObject(t))) {
      this.Qqh = UnionSpawnMonsterConstraintHelper_1.UnionSpawnMonsterConstraintHelper.ReadUnionSpawnMonsterConstraint(t, this.FbDataInternal.spawnMonsterConstraintType(n));
    }
    return this.Qqh;
  }
}
exports.FbSpawnMonsterComponent = FbSpawnMonsterComponent;
//# sourceMappingURL=FbSpawnMonsterComponent.js.map
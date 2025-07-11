"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemPatrol = undefined;
const UnionSceneItemAiPatrolTypeHelper_1 = require("./UnionSceneItemAiPatrolTypeHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbSceneItemPatrol {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bYh = false;
    this.LYh = undefined;
    this.AYh = false;
    this.xYh = undefined;
    this.RYh = false;
    this.wYh = false;
    this.PYh = false;
    this.UYh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneItemPatrol(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EnableCondition() {
    if (!this.bYh) {
      this.bYh = true;
      this.LYh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.enableCondition());
    }
    return this.LYh;
  }
  get DisableCondition() {
    if (!this.AYh) {
      this.AYh = true;
      this.xYh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.disableCondition());
    }
    return this.xYh;
  }
  get HideWhenDisable() {
    if (!this.RYh) {
      this.RYh = true;
      this.wYh = this.FbDataInternal.hideWhenDisable();
    }
    return this.wYh;
  }
  get PatrolType() {
    var t;
    var i;
    if (!this.PYh && (this.PYh = true, t = this.FbDataInternal.patrolTypeType(), i = UnionSceneItemAiPatrolTypeHelper_1.UnionSceneItemAiPatrolTypeHelper.GetUnionSceneItemAiPatrolTypeObject(t))) {
      this.UYh = UnionSceneItemAiPatrolTypeHelper_1.UnionSceneItemAiPatrolTypeHelper.ReadUnionSceneItemAiPatrolType(t, this.FbDataInternal.patrolType(i));
    }
    return this.UYh;
  }
}
exports.FbSceneItemPatrol = FbSceneItemPatrol;
//# sourceMappingURL=FbSceneItemPatrol.js.map
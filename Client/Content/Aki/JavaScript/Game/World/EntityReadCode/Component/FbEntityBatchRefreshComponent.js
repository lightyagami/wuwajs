"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityBatchRefreshComponent = undefined;
const UnionEntityBatchRefreshHelper_1 = require("./UnionEntityBatchRefreshHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityBatchRefreshComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.fw1 = false;
    this.gw1 = undefined;
    this.Cw1 = false;
    this.pw1 = undefined;
    this.vw1 = false;
    this.yw1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityBatchRefreshComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get StartCondition() {
    if (!this.fw1) {
      this.fw1 = true;
      this.gw1 = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.startCondition());
    }
    return this.gw1;
  }
  get EndCondition() {
    if (!this.Cw1) {
      this.Cw1 = true;
      this.pw1 = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.endCondition());
    }
    return this.pw1;
  }
  get EntityBatchRefresh() {
    var t;
    var i;
    if (!this.vw1 && (this.vw1 = true, t = this.FbDataInternal.entityBatchRefreshType(), i = UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.GetUnionEntityBatchRefreshObject(t))) {
      this.yw1 = UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.ReadUnionEntityBatchRefresh(t, this.FbDataInternal.entityBatchRefresh(i));
    }
    return this.yw1;
  }
}
exports.FbEntityBatchRefreshComponent = FbEntityBatchRefreshComponent;
//# sourceMappingURL=FbEntityBatchRefreshComponent.js.map
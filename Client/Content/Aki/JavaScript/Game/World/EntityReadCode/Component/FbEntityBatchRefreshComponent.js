"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbEntityBatchRefreshComponent = void 0;
const UnionEntityBatchRefreshHelper_1 = require("./UnionEntityBatchRefreshHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityBatchRefreshComponent {
  constructor(t) {
    this.FbDataInternal = t, this.q_h = !1, this.k_h = !1, this.jL1 = !1, this.HL1 = void 0, this.$L1 = !1, this.WL1 = void 0, this.QL1 = !1, this.KL1 = void 0
  }
  static Create(t) {
    if (t) return new FbEntityBatchRefreshComponent(t)
  }
  get Disabled() {
    return this.q_h || (this.q_h = !0, this.k_h = this.FbDataInternal.disabled()), this.k_h
  }
  get StartCondition() {
    return this.jL1 || (this.jL1 = !0, this.HL1 = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.startCondition())), this.HL1
  }
  get EndCondition() {
    return this.$L1 || (this.$L1 = !0, this.WL1 = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.endCondition())), this.WL1
  }
  get EntityBatchRefresh() {
    var t, i;
    return !this.QL1 && (this.QL1 = !0, t = this.FbDataInternal.entityBatchRefreshType(), i = UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.GetUnionEntityBatchRefreshObject(t)) && (this.KL1 = UnionEntityBatchRefreshHelper_1.UnionEntityBatchRefreshHelper.ReadUnionEntityBatchRefresh(t, this.FbDataInternal.entityBatchRefresh(i))), this.KL1
  }
}
exports.FbEntityBatchRefreshComponent = FbEntityBatchRefreshComponent;
//# sourceMappingURL=FbEntityBatchRefreshComponent.js.map
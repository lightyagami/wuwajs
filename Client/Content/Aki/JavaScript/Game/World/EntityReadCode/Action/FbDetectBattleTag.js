"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDetectBattleTag = undefined;
const UnionDetectBattleTagTypeHelper_1 = require("./UnionDetectBattleTagTypeHelper");
class FbDetectBattleTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.$vh = false;
    this.Xvh = undefined;
    this.Yvh = false;
    this.zvh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDetectBattleTag(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get TagOption() {
    var t;
    var e;
    if (!this.$vh && (this.$vh = true, t = this.FbDataInternal.tagOptionType(), e = UnionDetectBattleTagTypeHelper_1.UnionDetectBattleTagTypeHelper.GetUnionDetectBattleTagTypeObject(t))) {
      this.Xvh = UnionDetectBattleTagTypeHelper_1.UnionDetectBattleTagTypeHelper.ReadUnionDetectBattleTagType(t, this.FbDataInternal.tagOption(e));
    }
    return this.Xvh;
  }
  get MaxWaitTime() {
    if (!this.Yvh) {
      this.Yvh = true;
      this.zvh = this.FbDataInternal.maxWaitTime();
    }
    return this.zvh;
  }
}
exports.FbDetectBattleTag = FbDetectBattleTag;
//# sourceMappingURL=FbDetectBattleTag.js.map
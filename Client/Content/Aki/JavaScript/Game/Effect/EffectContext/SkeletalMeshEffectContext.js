"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletalMeshEffectContext = undefined;
const cpp_1 = require("cpp");
const EffectContext_1 = require("./EffectContext");
class SkeletalMeshEffectContext extends EffectContext_1.EffectContext {
  constructor() {
    super(...arguments);
    this.SkeletalMeshComp = undefined;
    this.IsSyncEffectTimeScale = false;
    this.IsSyncEventTimeToEffectTime = false;
  }
  ToKuroEffectContext(t) {
    super.ToKuroEffectContext(t);
    if (t instanceof cpp_1.FSkeletalMeshEffectContext) {
      t.SkeletalMeshComponent = this.SkeletalMeshComp;
      t.IsSyncTimeDilation = this.IsSyncEffectTimeScale;
      t.IsSyncEventTimeToEffectTime = this.IsSyncEventTimeToEffectTime;
    }
  }
}
exports.SkeletalMeshEffectContext = SkeletalMeshEffectContext;
//# sourceMappingURL=SkeletalMeshEffectContext.js.map
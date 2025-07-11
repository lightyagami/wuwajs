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
  }
  ToKuroEffectContext(e) {
    super.ToKuroEffectContext(e);
    if (e instanceof cpp_1.FSkeletalMeshEffectContext) {
      e.SkeletalMeshComponent = this.SkeletalMeshComp;
      e.IsSyncTimeDilation = this.IsSyncEffectTimeScale;
    }
  }
}
exports.SkeletalMeshEffectContext = SkeletalMeshEffectContext;
//# sourceMappingURL=SkeletalMeshEffectContext.js.map
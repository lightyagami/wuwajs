"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTowardEntityConfig = undefined;
class FbTowardEntityConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.MYh = false;
    this.EYh = undefined;
    this.Vvh = false;
    this.jvh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTowardEntityConfig(t);
    }
  }
  get ReferenceActorKey() {
    if (!this.MYh) {
      this.MYh = true;
      this.EYh = this.FbDataInternal.referenceActorKey();
    }
    return this.EYh;
  }
  get TargetEntityId() {
    if (!this.Vvh) {
      this.Vvh = true;
      this.jvh = this.FbDataInternal.targetEntityId();
    }
    return this.jvh;
  }
}
exports.FbTowardEntityConfig = FbTowardEntityConfig;
//# sourceMappingURL=FbTowardEntityConfig.js.map
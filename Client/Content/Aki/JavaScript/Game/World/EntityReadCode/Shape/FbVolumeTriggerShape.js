"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVolumeTriggerShape = undefined;
class FbVolumeTriggerShape {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.IZh = false;
    this.TZh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVolumeTriggerShape(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get VolumeKey() {
    if (!this.IZh) {
      this.IZh = true;
      this.TZh = this.FbDataInternal.volumeKey();
    }
    return this.TZh;
  }
}
exports.FbVolumeTriggerShape = FbVolumeTriggerShape;
//# sourceMappingURL=FbVolumeTriggerShape.js.map
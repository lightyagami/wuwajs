"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVisionComponent = undefined;
class FbVisionComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this._Vh = false;
    this.cVh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVisionComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get VisionId() {
    if (!this._Vh) {
      this._Vh = true;
      this.cVh = this.FbDataInternal.visionId();
    }
    return this.cVh;
  }
}
exports.FbVisionComponent = FbVisionComponent;
//# sourceMappingURL=FbVisionComponent.js.map
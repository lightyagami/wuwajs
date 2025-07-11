"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVisionItemComponent = undefined;
class FbVisionItemComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
  }
  static Create(t) {
    if (t) {
      return new FbVisionItemComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
}
exports.FbVisionItemComponent = FbVisionItemComponent;
//# sourceMappingURL=FbVisionItemComponent.js.map
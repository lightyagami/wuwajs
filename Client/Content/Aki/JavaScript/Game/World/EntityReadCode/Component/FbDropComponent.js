"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDropComponent = undefined;
class FbDropComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
  }
  static Create(t) {
    if (t) {
      return new FbDropComponent(t);
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
exports.FbDropComponent = FbDropComponent;
//# sourceMappingURL=FbDropComponent.js.map
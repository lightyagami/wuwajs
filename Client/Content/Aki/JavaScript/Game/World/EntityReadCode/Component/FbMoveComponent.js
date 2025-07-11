"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveComponent = undefined;
class FbMoveComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.WDh = false;
    this.QDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbMoveComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get InitSpeed() {
    if (!this.WDh) {
      this.WDh = true;
      this.QDh = this.FbDataInternal.initSpeed();
    }
    return this.QDh;
  }
}
exports.FbMoveComponent = FbMoveComponent;
//# sourceMappingURL=FbMoveComponent.js.map
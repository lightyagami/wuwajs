"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevitateMagnetComponent = undefined;
class FbLevitateMagnetComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.YHh = false;
    this.zHh = 0;
    this.U7h = false;
    this.D7h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbLevitateMagnetComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get MoveSpeed() {
    if (!this.YHh) {
      this.YHh = true;
      this.zHh = this.FbDataInternal.moveSpeed();
    }
    return this.zHh;
  }
  get Test() {
    if (!this.U7h) {
      this.U7h = true;
      this.D7h = this.FbDataInternal.test();
    }
    return this.D7h;
  }
}
exports.FbLevitateMagnetComponent = FbLevitateMagnetComponent;
//# sourceMappingURL=FbLevitateMagnetComponent.js.map
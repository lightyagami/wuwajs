"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelPlayComponent = undefined;
class FbLevelPlayComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Ryh = false;
    this.wyh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbLevelPlayComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get LevelPlayId() {
    if (!this.Ryh) {
      this.Ryh = true;
      this.wyh = this.FbDataInternal.levelPlayId();
    }
    return this.wyh;
  }
}
exports.FbLevelPlayComponent = FbLevelPlayComponent;
//# sourceMappingURL=FbLevelPlayComponent.js.map
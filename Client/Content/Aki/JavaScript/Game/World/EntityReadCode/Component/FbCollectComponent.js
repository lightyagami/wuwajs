"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCollectComponent = undefined;
class FbCollectComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.HNh = false;
    this.WNh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCollectComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get IsDisableOneClickCollection() {
    if (!this.HNh) {
      this.HNh = true;
      this.WNh = this.FbDataInternal.isDisableOneClickCollection();
    }
    return this.WNh;
  }
}
exports.FbCollectComponent = FbCollectComponent;
//# sourceMappingURL=FbCollectComponent.js.map
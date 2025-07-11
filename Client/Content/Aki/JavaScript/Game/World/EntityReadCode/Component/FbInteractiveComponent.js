"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractiveComponent = undefined;
class FbInteractiveComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Euh = false;
    this.Iuh = undefined;
    this.d_h = false;
    this.m_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractiveComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Content() {
    if (!this.Euh) {
      this.Euh = true;
      this.Iuh = this.FbDataInternal.content();
    }
    return this.Iuh;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
}
exports.FbInteractiveComponent = FbInteractiveComponent;
//# sourceMappingURL=FbInteractiveComponent.js.map
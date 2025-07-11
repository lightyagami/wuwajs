"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRefreshSingleComponent = undefined;
class FbRefreshSingleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.xBh = false;
    this.RBh = 0;
    this.wBh = false;
    this.PBh = false;
    this.Iph = false;
    this.Tph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRefreshSingleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get RefreshInterval() {
    if (!this.xBh) {
      this.xBh = true;
      this.RBh = this.FbDataInternal.refreshInterval();
    }
    return this.RBh;
  }
  get DelayRefresh() {
    if (!this.wBh) {
      this.wBh = true;
      this.PBh = this.FbDataInternal.delayRefresh();
    }
    return this.PBh;
  }
  get TemplateGuid() {
    if (!this.Iph) {
      this.Iph = true;
      this.Tph = this.FbDataInternal.templateGuid();
    }
    return this.Tph;
  }
}
exports.FbRefreshSingleComponent = FbRefreshSingleComponent;
//# sourceMappingURL=FbRefreshSingleComponent.js.map
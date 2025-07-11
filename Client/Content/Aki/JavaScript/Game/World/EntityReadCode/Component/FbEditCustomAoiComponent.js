"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEditCustomAoiComponent = undefined;
class FbEditCustomAoiComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Ayh = false;
    this.xyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEditCustomAoiComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Entities() {
    if (!this.Ayh) {
      this.Ayh = true;
      this.xyh = new Array();
      var i = this.FbDataInternal.entitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.xyh.push(this.FbDataInternal.entities(t));
        }
      }
    }
    return this.xyh;
  }
}
exports.FbEditCustomAoiComponent = FbEditCustomAoiComponent;
//# sourceMappingURL=FbEditCustomAoiComponent.js.map
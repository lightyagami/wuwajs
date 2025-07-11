"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCombinedVisibleGroupComponent = undefined;
class FbCombinedVisibleGroupComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.g5h = false;
    this.f5h = undefined;
    this.p5h = false;
    this.v5h = false;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCombinedVisibleGroupComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AreaIds() {
    if (!this.g5h) {
      this.g5h = true;
      this.f5h = new Array();
      var i = this.FbDataInternal.areaIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.f5h.push(this.FbDataInternal.areaIds(t));
        }
      }
    }
    return this.f5h;
  }
  get IncludeSubArea() {
    if (!this.p5h) {
      this.p5h = true;
      this.v5h = this.FbDataInternal.includeSubArea();
    }
    return this.v5h;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbCombinedVisibleGroupComponent = FbCombinedVisibleGroupComponent;
//# sourceMappingURL=FbCombinedVisibleGroupComponent.js.map
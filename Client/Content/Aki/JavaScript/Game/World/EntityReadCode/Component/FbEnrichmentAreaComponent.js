"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnrichmentAreaComponent = undefined;
class FbEnrichmentAreaComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.GXh = false;
    this.OXh = undefined;
    this.FXh = false;
    this.NXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnrichmentAreaComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get RefEntityIds() {
    if (!this.GXh) {
      this.GXh = true;
      this.OXh = new Array();
      var i = this.FbDataInternal.refEntityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.OXh.push(this.FbDataInternal.refEntityIds(t));
        }
      }
    }
    return this.OXh;
  }
  get FogIds() {
    if (!this.FXh) {
      this.FXh = true;
      this.NXh = new Array();
      var i = this.FbDataInternal.fogIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.NXh.push(this.FbDataInternal.fogIds(t));
        }
      }
    }
    return this.NXh;
  }
}
exports.FbEnrichmentAreaComponent = FbEnrichmentAreaComponent;
//# sourceMappingURL=FbEnrichmentAreaComponent.js.map
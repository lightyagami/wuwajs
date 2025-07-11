"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideWorldEntityAndLevelPlay = undefined;
class FbHideWorldEntityAndLevelPlay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.oxh = false;
    this.nxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHideWorldEntityAndLevelPlay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ExcludeEntities() {
    if (!this.oxh) {
      this.oxh = true;
      this.nxh = new Array();
      var i = this.FbDataInternal.excludeEntitiesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.nxh.push(this.FbDataInternal.excludeEntities(t));
        }
      }
    }
    return this.nxh;
  }
}
exports.FbHideWorldEntityAndLevelPlay = FbHideWorldEntityAndLevelPlay;
//# sourceMappingURL=FbHideWorldEntityAndLevelPlay.js.map
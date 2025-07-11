"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetEntityClientVisibleSave = undefined;
class FbSetEntityClientVisibleSave {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.Amh = false;
    this.xmh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetEntityClientVisibleSave(t);
    }
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
  get Visible() {
    if (!this.Amh) {
      this.Amh = true;
      this.xmh = this.FbDataInternal.visible();
    }
    return this.xmh;
  }
}
exports.FbSetEntityClientVisibleSave = FbSetEntityClientVisibleSave;
//# sourceMappingURL=FbSetEntityClientVisibleSave.js.map
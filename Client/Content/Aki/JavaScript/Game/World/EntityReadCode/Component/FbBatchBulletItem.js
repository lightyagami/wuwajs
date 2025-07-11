"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBatchBulletItem = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbBatchBulletCaster_1 = require("./FbBatchBulletCaster");
class FbBatchBulletItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.Fph = false;
    this.Nph = 0;
    this.mXh = false;
    this.CXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBatchBulletItem(t);
    }
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get CasterList() {
    if (!this.mXh) {
      this.mXh = true;
      this.CXh = new Array();
      var e = this.FbDataInternal.casterListLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var s = this.FbDataInternal.casterList(t, new fb_component_1.BatchBulletCaster());
          this.CXh.push(FbBatchBulletCaster_1.FbBatchBulletCaster.Create(s));
        }
      }
    }
    return this.CXh;
  }
}
exports.FbBatchBulletItem = FbBatchBulletItem;
//# sourceMappingURL=FbBatchBulletItem.js.map
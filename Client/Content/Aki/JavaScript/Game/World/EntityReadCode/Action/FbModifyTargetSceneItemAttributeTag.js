"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModifyTargetSceneItemAttributeTag = undefined;
class FbModifyTargetSceneItemAttributeTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.pLh = false;
    this.vLh = false;
    this.gLh = false;
    this.fLh = undefined;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbModifyTargetSceneItemAttributeTag(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsAddTag() {
    if (!this.pLh) {
      this.pLh = true;
      this.vLh = this.FbDataInternal.isAddTag();
    }
    return this.vLh;
  }
  get PerformanceTag() {
    if (!this.gLh) {
      this.gLh = true;
      this.fLh = new Array();
      var i = this.FbDataInternal.performanceTagLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.fLh.push(this.FbDataInternal.performanceTag(t));
        }
      }
    }
    return this.fLh;
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
exports.FbModifyTargetSceneItemAttributeTag = FbModifyTargetSceneItemAttributeTag;
//# sourceMappingURL=FbModifyTargetSceneItemAttributeTag.js.map
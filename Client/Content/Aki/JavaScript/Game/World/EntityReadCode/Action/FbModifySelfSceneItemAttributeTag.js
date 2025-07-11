"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModifySelfSceneItemAttributeTag = undefined;
class FbModifySelfSceneItemAttributeTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.pLh = false;
    this.vLh = false;
    this.gLh = false;
    this.fLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbModifySelfSceneItemAttributeTag(t);
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
      var e = this.FbDataInternal.performanceTagLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.fLh.push(this.FbDataInternal.performanceTag(t));
        }
      }
    }
    return this.fLh;
  }
}
exports.FbModifySelfSceneItemAttributeTag = FbModifySelfSceneItemAttributeTag;
//# sourceMappingURL=FbModifySelfSceneItemAttributeTag.js.map
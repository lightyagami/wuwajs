"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityHasSceneItemAttributeTag = undefined;
class FbCheckEntityHasSceneItemAttributeTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.wJh = false;
    this.PJh = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.UJh = false;
    this.DJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityHasSceneItemAttributeTag(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CheckType() {
    if (!this.wJh) {
      this.wJh = true;
      this.PJh = this.FbDataInternal.checkType();
    }
    return this.PJh;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get Tags() {
    if (!this.UJh) {
      this.UJh = true;
      this.DJh = new Array();
      var i = this.FbDataInternal.tagsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.DJh.push(this.FbDataInternal.tags(t));
        }
      }
    }
    return this.DJh;
  }
}
exports.FbCheckEntityHasSceneItemAttributeTag = FbCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=FbCheckEntityHasSceneItemAttributeTag.js.map
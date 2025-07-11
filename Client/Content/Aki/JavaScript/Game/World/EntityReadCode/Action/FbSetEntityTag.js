"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetEntityTag = undefined;
class FbSetEntityTag {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Rvh = false;
    this.wvh = undefined;
    this.Pvh = false;
    this.Uvh = undefined;
    this.Gfh = false;
    this.Ofh = 0;
    this.Dvh = false;
    this.Bvh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetEntityTag(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get GameplayTag() {
    if (!this.Rvh) {
      this.Rvh = true;
      this.wvh = this.FbDataInternal.gameplayTag();
    }
    return this.wvh;
  }
  get SetType() {
    if (!this.Pvh) {
      this.Pvh = true;
      this.Uvh = this.FbDataInternal.setType();
    }
    return this.Uvh;
  }
  get DelayTime() {
    if (!this.Gfh) {
      this.Gfh = true;
      this.Ofh = this.FbDataInternal.delayTime();
    }
    return this.Ofh;
  }
  get BeforeHide() {
    if (!this.Dvh) {
      this.Dvh = true;
      this.Bvh = this.FbDataInternal.beforeHide();
    }
    return this.Bvh;
  }
}
exports.FbSetEntityTag = FbSetEntityTag;
//# sourceMappingURL=FbSetEntityTag.js.map
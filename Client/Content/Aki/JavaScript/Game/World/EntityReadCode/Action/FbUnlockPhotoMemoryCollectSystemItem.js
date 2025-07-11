"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockPhotoMemoryCollectSystemItem = undefined;
class FbUnlockPhotoMemoryCollectSystemItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockPhotoMemoryCollectSystemItem(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
}
exports.FbUnlockPhotoMemoryCollectSystemItem = FbUnlockPhotoMemoryCollectSystemItem;
//# sourceMappingURL=FbUnlockPhotoMemoryCollectSystemItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyQuestItem = undefined;
class FbDestroyQuestItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.auh = false;
    this.huh = 0;
    this.luh = false;
    this.v4i = 0;
    this.muh = false;
    this.Cuh = false;
  }
  static Create(t) {
    if (t) {
      return new FbDestroyQuestItem(t);
    }
  }
  get ItemId() {
    if (!this.auh) {
      this.auh = true;
      this.huh = this.FbDataInternal.itemId();
    }
    return this.huh;
  }
  get Count() {
    if (!this.luh) {
      this.luh = true;
      this.v4i = this.FbDataInternal.count();
    }
    return this.v4i;
  }
  get IsAll() {
    if (!this.muh) {
      this.muh = true;
      this.Cuh = this.FbDataInternal.isAll();
    }
    return this.Cuh;
  }
}
exports.FbDestroyQuestItem = FbDestroyQuestItem;
//# sourceMappingURL=FbDestroyQuestItem.js.map
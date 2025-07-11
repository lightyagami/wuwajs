"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHeadInfoChangeData = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbHeadInfoChangeData {
  constructor(t) {
    this.FbDataInternal = t;
    this.ich = false;
    this.rch = undefined;
    this.bwh = false;
    this.Lwh = undefined;
    this.d_h = false;
    this.m_h = undefined;
    this.jZ_ = false;
    this.HZ_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHeadInfoChangeData(t);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.conditions());
    }
    return this.rch;
  }
  get TidName() {
    if (!this.bwh) {
      this.bwh = true;
      this.Lwh = this.FbDataInternal.tidName();
    }
    return this.Lwh;
  }
  get Icon() {
    if (!this.d_h) {
      this.d_h = true;
      this.m_h = this.FbDataInternal.icon();
    }
    return this.m_h;
  }
  get TidSecondaryName() {
    if (!this.jZ_) {
      this.jZ_ = true;
      this.HZ_ = this.FbDataInternal.tidSecondaryName();
    }
    return this.HZ_;
  }
}
exports.FbHeadInfoChangeData = FbHeadInfoChangeData;
//# sourceMappingURL=FbHeadInfoChangeData.js.map
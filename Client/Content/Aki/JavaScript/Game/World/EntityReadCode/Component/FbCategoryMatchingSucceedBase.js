"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCategoryMatchingSucceedBase = undefined;
const FbEntityState_1 = require("./FbEntityState");
class FbCategoryMatchingSucceedBase {
  constructor(t) {
    this.FbDataInternal = t;
    this.iFh = false;
    this.rFh = false;
    this.bEh = false;
    this.LEh = false;
    this.qFh = false;
    this.kFh = false;
    this.GFh = false;
    this.OFh = undefined;
    this.FFh = false;
    this.NFh = undefined;
    this.VFh = false;
    this.jFh = undefined;
    this.HFh = false;
    this.WFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCategoryMatchingSucceedBase(t);
    }
  }
  get IsSilent() {
    if (!this.iFh) {
      this.iFh = true;
      this.rFh = this.FbDataInternal.isSilent();
    }
    return this.rFh;
  }
  get IsDestroy() {
    if (!this.bEh) {
      this.bEh = true;
      this.LEh = this.FbDataInternal.isDestroy();
    }
    return this.LEh;
  }
  get SyncAdsorbatePerformance() {
    if (!this.qFh) {
      this.qFh = true;
      this.kFh = this.FbDataInternal.syncAdsorbatePerformance();
    }
    return this.kFh;
  }
  get ChangeSelfState() {
    if (!this.GFh) {
      this.GFh = true;
      this.OFh = this.FbDataInternal.changeSelfState();
    }
    return this.OFh;
  }
  get ChangeSelfStateAfterDischarged() {
    if (!this.FFh) {
      this.FFh = true;
      this.NFh = this.FbDataInternal.changeSelfStateAfterDischarged();
    }
    return this.NFh;
  }
  get ChangeItemState() {
    if (!this.VFh) {
      this.VFh = true;
      this.jFh = FbEntityState_1.FbEntityState.Create(this.FbDataInternal.changeItemState());
    }
    return this.jFh;
  }
  get ChangeItemStateAfterDischarged() {
    if (!this.HFh) {
      this.HFh = true;
      this.WFh = FbEntityState_1.FbEntityState.Create(this.FbDataInternal.changeItemStateAfterDischarged());
    }
    return this.WFh;
  }
}
exports.FbCategoryMatchingSucceedBase = FbCategoryMatchingSucceedBase;
//# sourceMappingURL=FbCategoryMatchingSucceedBase.js.map
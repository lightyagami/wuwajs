"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateInfo = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("./FbActionInfo");
const FbPosA_1 = require("./FbPosA");
class FbStateInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
    this.x_h = false;
    this.FGi = undefined;
    this.ogh = false;
    this.ngh = false;
    this.L_h = false;
    this.A_h = undefined;
    this.Gxh = false;
    this.Oxh = false;
    this.PH_ = false;
    this.xH_ = false;
    this.DH_ = false;
    this.BH_ = false;
    this.Fxh = false;
    this.Nxh = false;
    this.Vxh = false;
    this.jxh = false;
    this.lu_ = false;
    this._u_ = false;
    this.rc1 = false;
    this.oc1 = false;
    this.Hxh = false;
    this.Wxh = false;
    this.Qxh = false;
    this.Kxh = undefined;
    this.$xh = false;
    this.Xxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStateInfo(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get _folded() {
    if (!this.ogh) {
      this.ogh = true;
      this.ngh = this.FbDataInternal.folded();
    }
    return this.ngh;
  }
  get Actions() {
    if (!this.L_h) {
      this.L_h = true;
      this.A_h = new Array();
      var i = this.FbDataInternal.actionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
      }
    }
    return this.A_h;
  }
  get KeepBgm() {
    if (!this.Gxh) {
      this.Gxh = true;
      this.Oxh = this.FbDataInternal.keepBgm();
    }
    return this.Oxh;
  }
  get OnlyPlayOnce() {
    if (!this.PH_) {
      this.PH_ = true;
      this.xH_ = this.FbDataInternal.onlyPlayOnce();
    }
    return this.xH_;
  }
  get KeepInVehicle() {
    if (!this.DH_) {
      this.DH_ = true;
      this.BH_ = this.FbDataInternal.keepInVehicle();
    }
    return this.BH_;
  }
  get AllowMultiReference() {
    if (!this.Fxh) {
      this.Fxh = true;
      this.Nxh = this.FbDataInternal.allowMultiReference();
    }
    return this.Nxh;
  }
  get IgnoreInPlotHandBook() {
    if (!this.Vxh) {
      this.Vxh = true;
      this.jxh = this.FbDataInternal.ignoreInPlotHandBook();
    }
    return this.jxh;
  }
  get DontInterruptMatch() {
    if (!this.lu_) {
      this.lu_ = true;
      this._u_ = this.FbDataInternal.dontInterruptMatch();
    }
    return this._u_;
  }
  get IsPreloadFlow() {
    if (!this.rc1) {
      this.rc1 = true;
      this.oc1 = this.FbDataInternal.isPreloadFlow();
    }
    return this.oc1;
  }
  get _showImport() {
    if (!this.Hxh) {
      this.Hxh = true;
      this.Wxh = this.FbDataInternal.showImport();
    }
    return this.Wxh;
  }
  get PlotPos() {
    if (!this.Qxh) {
      this.Qxh = true;
      this.Kxh = FbPosA_1.FbPosA.Create(this.FbDataInternal.plotPos());
    }
    return this.Kxh;
  }
  get _SelectedIndexes() {
    if (!this.$xh) {
      this.$xh = true;
      this.Xxh = new Array();
      var i = this.FbDataInternal.selectedIndexesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Xxh.push(this.FbDataInternal.selectedIndexes(t));
        }
      }
    }
    return this.Xxh;
  }
}
exports.FbStateInfo = FbStateInfo;
//# sourceMappingURL=FbStateInfo.js.map
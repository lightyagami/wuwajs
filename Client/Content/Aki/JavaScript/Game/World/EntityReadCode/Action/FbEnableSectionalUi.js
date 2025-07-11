"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableSectionalUi = undefined;
class FbEnableSectionalUi {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.iSh = false;
    this.rSh = false;
    this.oSh = false;
    this.nSh = false;
    this.sSh = false;
    this.aSh = false;
    this.hSh = false;
    this.lSh = false;
    this._Sh = false;
    this.cSh = false;
    this.uSh = false;
    this.dSh = false;
    this.xPc = false;
    this.DPc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnableSectionalUi(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ShowMiniMap() {
    if (!this.iSh) {
      this.iSh = true;
      this.rSh = this.FbDataInternal.showMiniMap();
    }
    return this.rSh;
  }
  get ShowQuestTrack() {
    if (!this.oSh) {
      this.oSh = true;
      this.nSh = this.FbDataInternal.showQuestTrack();
    }
    return this.nSh;
  }
  get ShowEsc() {
    if (!this.sSh) {
      this.sSh = true;
      this.aSh = this.FbDataInternal.showEsc();
    }
    return this.aSh;
  }
  get ShowSystem() {
    if (!this.hSh) {
      this.hSh = true;
      this.lSh = this.FbDataInternal.showSystem();
    }
    return this.lSh;
  }
  get ShowScreenEffect() {
    if (!this._Sh) {
      this._Sh = true;
      this.cSh = this.FbDataInternal.showScreenEffect();
    }
    return this.cSh;
  }
  get ShowOther() {
    if (!this.uSh) {
      this.uSh = true;
      this.dSh = this.FbDataInternal.showOther();
    }
    return this.dSh;
  }
  get AlwaysShowUiSections() {
    if (!this.xPc) {
      this.xPc = true;
      this.DPc = new Array();
      var i = this.FbDataInternal.alwaysShowUiSectionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.DPc.push(this.FbDataInternal.alwaysShowUiSections(t));
        }
      }
    }
    return this.DPc;
  }
}
exports.FbEnableSectionalUi = FbEnableSectionalUi;
//# sourceMappingURL=FbEnableSectionalUi.js.map
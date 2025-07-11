"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelSequenceSectionInfo = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbActionInfo_1 = require("../Action/FbActionInfo");
class FbLevelSequenceSectionInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ubh = false;
    this.dbh = undefined;
    this.OYh = false;
    this.FYh = 0;
    this.Bch = false;
    this.Cbo = undefined;
    this.oyh = false;
    this.nyh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelSequenceSectionInfo(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Key() {
    if (!this.ubh) {
      this.ubh = true;
      this.dbh = this.FbDataInternal.key();
    }
    return this.dbh;
  }
  get FrameId() {
    if (!this.OYh) {
      this.OYh = true;
      this.FYh = this.FbDataInternal.frameId();
    }
    return this.FYh;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get ActionList() {
    if (!this.oyh) {
      this.oyh = true;
      this.nyh = new Array();
      var i = this.FbDataInternal.actionListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actionList(t, new fb_action_1.ActionInfo());
          this.nyh.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
      }
    }
    return this.nyh;
  }
}
exports.FbLevelSequenceSectionInfo = FbLevelSequenceSectionInfo;
//# sourceMappingURL=FbLevelSequenceSectionInfo.js.map
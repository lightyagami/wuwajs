"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayLevelSequence = undefined;
const FbEaseData_1 = require("./FbEaseData");
const UnionLevelSequenceTransitionHelper_1 = require("./UnionLevelSequenceTransitionHelper");
class FbPlayLevelSequence {
  constructor(e) {
    this.FbDataInternal = e;
    this.Ybh = false;
    this.zbh = undefined;
    this.Jbh = false;
    this.Zbh = false;
    this.eLh = false;
    this.tLh = undefined;
    this.iLh = false;
    this.rLh = undefined;
    this.oLh = false;
    this.nLh = undefined;
    this.sLh = false;
    this.aLh = undefined;
    this.F4h = false;
    this.DTo = 0;
    this.DDc = false;
    this.UDc = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPlayLevelSequence(e);
    }
  }
  get LevelSequencePath() {
    if (!this.Ybh) {
      this.Ybh = true;
      this.zbh = this.FbDataInternal.levelSequencePath();
    }
    return this.zbh;
  }
  get KeepUI() {
    if (!this.Jbh) {
      this.Jbh = true;
      this.Zbh = this.FbDataInternal.keepUi();
    }
    return this.Zbh;
  }
  get Mark() {
    if (!this.eLh) {
      this.eLh = true;
      this.tLh = this.FbDataInternal.mark();
    }
    return this.tLh;
  }
  get PlayMode() {
    if (!this.iLh) {
      this.iLh = true;
      this.rLh = this.FbDataInternal.playMode();
    }
    return this.rLh;
  }
  get Intro() {
    var e;
    var t;
    if (!this.oLh && (this.oLh = true, e = this.FbDataInternal.introType(), t = UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.GetUnionLevelSequenceTransitionObject(e))) {
      this.nLh = UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.ReadUnionLevelSequenceTransition(e, this.FbDataInternal.intro(t));
    }
    return this.nLh;
  }
  get Outro() {
    var e;
    var t;
    if (!this.sLh && (this.sLh = true, e = this.FbDataInternal.outroType(), t = UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.GetUnionLevelSequenceTransitionObject(e))) {
      this.aLh = UnionLevelSequenceTransitionHelper_1.UnionLevelSequenceTransitionHelper.ReadUnionLevelSequenceTransition(e, this.FbDataInternal.outro(t));
    }
    return this.aLh;
  }
  get Rate() {
    if (!this.F4h) {
      this.F4h = true;
      this.DTo = this.FbDataInternal.rate();
    }
    return this.DTo;
  }
  get RateEase() {
    if (!this.DDc) {
      this.DDc = true;
      this.UDc = FbEaseData_1.FbEaseData.Create(this.FbDataInternal.rateEase());
    }
    return this.UDc;
  }
}
exports.FbPlayLevelSequence = FbPlayLevelSequence;
//# sourceMappingURL=FbPlayLevelSequence.js.map
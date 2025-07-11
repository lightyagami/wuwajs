"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkSequenceTransition = undefined;
class FbTalkSequenceTransition {
  constructor(t) {
    this.FbDataInternal = t;
    this.gph = false;
    this.fph = undefined;
    this.pph = false;
    this.vph = undefined;
    this.yph = false;
    this.Sph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTalkSequenceTransition(t);
    }
  }
  get OptionText() {
    if (!this.gph) {
      this.gph = true;
      this.fph = this.FbDataInternal.optionText();
    }
    return this.fph;
  }
  get OptionTextKey() {
    if (!this.pph) {
      this.pph = true;
      this.vph = this.FbDataInternal.optionTextKey();
    }
    return this.vph;
  }
  get NextSequenceIndex() {
    if (!this.yph) {
      this.yph = true;
      this.Sph = this.FbDataInternal.nextSequenceIndex();
    }
    return this.Sph;
  }
}
exports.FbTalkSequenceTransition = FbTalkSequenceTransition;
//# sourceMappingURL=FbTalkSequenceTransition.js.map
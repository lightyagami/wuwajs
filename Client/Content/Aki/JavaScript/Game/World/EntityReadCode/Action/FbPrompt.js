"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPrompt = undefined;
class FbPrompt {
  constructor(t) {
    this.FbDataInternal = t;
    this.dmh = false;
    this.mmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPrompt(t);
    }
  }
  get GeneralTextId() {
    if (!this.dmh) {
      this.dmh = true;
      this.mmh = this.FbDataInternal.generalTextId();
    }
    return this.mmh;
  }
}
exports.FbPrompt = FbPrompt;
//# sourceMappingURL=FbPrompt.js.map
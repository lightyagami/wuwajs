"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomInteractOption = undefined;
const FbInteractOption_1 = require("../Action/FbInteractOption");
class FbRandomInteractOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.jDh = false;
    this.HDh = 0;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRandomInteractOption(t);
    }
  }
  get Weight() {
    if (!this.jDh) {
      this.jDh = true;
      this.HDh = this.FbDataInternal.weight();
    }
    return this.HDh;
  }
  get Option() {
    if (!this.s_h) {
      this.s_h = true;
      this.Hye = FbInteractOption_1.FbInteractOption.Create(this.FbDataInternal.option());
    }
    return this.Hye;
  }
}
exports.FbRandomInteractOption = FbRandomInteractOption;
//# sourceMappingURL=FbRandomInteractOption.js.map
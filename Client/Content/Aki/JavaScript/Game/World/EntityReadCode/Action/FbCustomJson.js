"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCustomJson = undefined;
class FbCustomJson {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.NAh = false;
    this.VAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCustomJson(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get JsonString() {
    if (!this.NAh) {
      this.NAh = true;
      this.VAh = this.FbDataInternal.jsonString();
    }
    return this.VAh;
  }
}
exports.FbCustomJson = FbCustomJson;
//# sourceMappingURL=FbCustomJson.js.map
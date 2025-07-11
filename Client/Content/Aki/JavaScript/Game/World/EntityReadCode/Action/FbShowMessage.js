"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowMessage = undefined;
class FbShowMessage {
  constructor(s) {
    this.FbDataInternal = s;
    this.Euh = false;
    this.Iuh = undefined;
  }
  static Create(s) {
    if (s) {
      return new FbShowMessage(s);
    }
  }
  get Content() {
    if (!this.Euh) {
      this.Euh = true;
      this.Iuh = this.FbDataInternal.content();
    }
    return this.Iuh;
  }
}
exports.FbShowMessage = FbShowMessage;
//# sourceMappingURL=FbShowMessage.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSendNpcMail = undefined;
class FbSendNpcMail {
  constructor(t) {
    this.FbDataInternal = t;
    this.Imh = false;
    this.Tmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSendNpcMail(t);
    }
  }
  get MailId() {
    if (!this.Imh) {
      this.Imh = true;
      this.Tmh = this.FbDataInternal.mailId();
    }
    return this.Tmh;
  }
}
exports.FbSendNpcMail = FbSendNpcMail;
//# sourceMappingURL=FbSendNpcMail.js.map
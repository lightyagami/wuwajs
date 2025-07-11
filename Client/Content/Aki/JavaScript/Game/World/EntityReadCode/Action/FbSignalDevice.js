"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSignalDevice = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbColorPiece_1 = require("./FbColorPiece");
class FbSignalDevice {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbSignalDevice(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var t = this.FbDataInternal.configLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.config(i, new fb_action_1.ColorPiece());
          this.TAe.push(FbColorPiece_1.FbColorPiece.Create(e));
        }
      }
    }
    return this.TAe;
  }
}
exports.FbSignalDevice = FbSignalDevice;
//# sourceMappingURL=FbSignalDevice.js.map
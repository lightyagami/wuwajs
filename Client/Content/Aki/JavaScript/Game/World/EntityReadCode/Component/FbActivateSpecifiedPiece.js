"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActivateSpecifiedPiece = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbActivateSpecifiedPieceConfig_1 = require("./FbActivateSpecifiedPieceConfig");
class FbActivateSpecifiedPiece {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbActivateSpecifiedPiece(e);
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
      var i = this.FbDataInternal.configLength();
      if (i) {
        for (let e = 0; e < i; ++e) {
          var t = this.FbDataInternal.config(e, new fb_component_1.ActivateSpecifiedPieceConfig());
          this.TAe.push(FbActivateSpecifiedPieceConfig_1.FbActivateSpecifiedPieceConfig.Create(t));
        }
      }
    }
    return this.TAe;
  }
}
exports.FbActivateSpecifiedPiece = FbActivateSpecifiedPiece;
//# sourceMappingURL=FbActivateSpecifiedPiece.js.map
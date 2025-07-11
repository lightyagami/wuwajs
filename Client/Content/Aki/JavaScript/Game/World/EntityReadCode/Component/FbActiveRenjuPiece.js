"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActiveRenjuPiece = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbJigsawItemMatchedConfig_1 = require("./FbJigsawItemMatchedConfig");
const FbRenjuConfig_1 = require("./FbRenjuConfig");
class FbActiveRenjuPiece {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.INh = false;
    this.TNh = undefined;
    this.Y6l = false;
    this.z6l = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbActiveRenjuPiece(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RenjuConfig() {
    if (!this.INh) {
      this.INh = true;
      this.TNh = new Array();
      var e = this.FbDataInternal.renjuConfigLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.renjuConfig(t, new fb_component_1.RenjuConfig());
          this.TNh.push(FbRenjuConfig_1.FbRenjuConfig.Create(i));
        }
      }
    }
    return this.TNh;
  }
  get ExitMatchedConfig() {
    if (!this.Y6l) {
      this.Y6l = true;
      this.z6l = new Array();
      var e = this.FbDataInternal.exitMatchedConfigLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.exitMatchedConfig(t, new fb_component_1.JigsawItemMatchedConfig());
          this.z6l.push(FbJigsawItemMatchedConfig_1.FbJigsawItemMatchedConfig.Create(i));
        }
      }
    }
    return this.z6l;
  }
}
exports.FbActiveRenjuPiece = FbActiveRenjuPiece;
//# sourceMappingURL=FbActiveRenjuPiece.js.map
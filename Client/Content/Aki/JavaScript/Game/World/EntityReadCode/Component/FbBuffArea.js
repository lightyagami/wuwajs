"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBuffArea = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbBuffAreaStateConfig_1 = require("./FbBuffAreaStateConfig");
class FbBuffArea {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.i$h = false;
    this.r$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBuffArea(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BuffConfigs() {
    if (!this.i$h) {
      this.i$h = true;
      this.r$h = new Array();
      var e = this.FbDataInternal.buffConfigsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.buffConfigs(t, new fb_component_1.BuffAreaStateConfig());
          this.r$h.push(FbBuffAreaStateConfig_1.FbBuffAreaStateConfig.Create(i));
        }
      }
    }
    return this.r$h;
  }
}
exports.FbBuffArea = FbBuffArea;
//# sourceMappingURL=FbBuffArea.js.map
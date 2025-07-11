"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityMatchDynamic = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbEntityMatchDynamic {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.oXh = false;
    this.nXh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityMatchDynamic(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MatchEntity() {
    if (!this.oXh) {
      this.oXh = true;
      this.nXh = new Array();
      var i = this.FbDataInternal.matchEntityLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchEntity(t, new fb_component_1.DynamicEntityMatch());
          this.nXh.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(e));
        }
      }
    }
    return this.nXh;
  }
}
exports.FbEntityMatchDynamic = FbEntityMatchDynamic;
//# sourceMappingURL=FbEntityMatchDynamic.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomInteract = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbRandomInteractOption_1 = require("./FbRandomInteractOption");
class FbRandomInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.NDh = false;
    this.VDh = 0;
    this.ugh = false;
    this.dgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRandomInteract(t);
    }
  }
  get RandomCount() {
    if (!this.NDh) {
      this.NDh = true;
      this.VDh = this.FbDataInternal.randomCount();
    }
    return this.VDh;
  }
  get Options() {
    if (!this.ugh) {
      this.ugh = true;
      this.dgh = new Array();
      var e = this.FbDataInternal.optionsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var n = this.FbDataInternal.options(t, new fb_component_1.RandomInteractOption());
          this.dgh.push(FbRandomInteractOption_1.FbRandomInteractOption.Create(n));
        }
      }
    }
    return this.dgh;
  }
}
exports.FbRandomInteract = FbRandomInteract;
//# sourceMappingURL=FbRandomInteract.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCalculateComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbNumberVar_1 = require("../Action/FbNumberVar");
const FbTypeFunction_1 = require("../Action/FbTypeFunction");
class FbCalculateComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.RUh = false;
    this.wUh = undefined;
    this.PUh = false;
    this.UUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCalculateComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Vars() {
    if (!this.RUh) {
      this.RUh = true;
      this.wUh = new Array();
      var i = this.FbDataInternal.varsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.vars(t, new fb_action_1.NumberVar());
          this.wUh.push(FbNumberVar_1.FbNumberVar.Create(e));
        }
      }
    }
    return this.wUh;
  }
  get Functions() {
    if (!this.PUh) {
      this.PUh = true;
      this.UUh = new Array();
      var i = this.FbDataInternal.functionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.functions(t, new fb_action_1.TypeFunction());
          this.UUh.push(FbTypeFunction_1.FbTypeFunction.Create(e));
        }
      }
    }
    return this.UUh;
  }
}
exports.FbCalculateComponent = FbCalculateComponent;
//# sourceMappingURL=FbCalculateComponent.js.map
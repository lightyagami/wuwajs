"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVarComponent = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const FbVarDefine_1 = require("../Var/FbVarDefine");
class FbVarComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.RUh = false;
    this.wUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVarComponent(t);
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
      var e = this.FbDataInternal.varsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var r = this.FbDataInternal.vars(t, new fb_var_1.VarDefine());
          this.wUh.push(FbVarDefine_1.FbVarDefine.Create(r));
        }
      }
    }
    return this.wUh;
  }
}
exports.FbVarComponent = FbVarComponent;
//# sourceMappingURL=FbVarComponent.js.map
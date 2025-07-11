"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWindDirectional = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbWindDirectionalStateGrade_1 = require("./FbWindDirectionalStateGrade");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbWindDirectional {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Aph = false;
    this.xph = undefined;
    this._Ec = false;
    this.cEc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbWindDirectional(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Rot() {
    if (!this.Aph) {
      this.Aph = true;
      this.xph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rot());
    }
    return this.xph;
  }
  get Grades() {
    if (!this._Ec) {
      this._Ec = true;
      this.cEc = new Array();
      var i = this.FbDataInternal.gradesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.grades(t, new fb_component_1.WindDirectionalStateGrade());
          this.cEc.push(FbWindDirectionalStateGrade_1.FbWindDirectionalStateGrade.Create(e));
        }
      }
    }
    return this.cEc;
  }
}
exports.FbWindDirectional = FbWindDirectional;
//# sourceMappingURL=FbWindDirectional.js.map
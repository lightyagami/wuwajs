"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcSplineMove = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPasserbyNpcSpline_1 = require("./FbPasserbyNpcSpline");
class FbPasserbyNpcSplineMove {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.RQh = false;
    this.wQh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPasserbyNpcSplineMove(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Routes() {
    if (!this.RQh) {
      this.RQh = true;
      this.wQh = new Array();
      var s = this.FbDataInternal.routesLength();
      if (s) {
        for (let e = 0; e < s; ++e) {
          var t = this.FbDataInternal.routes(e, new fb_component_1.PasserbyNpcSpline());
          this.wQh.push(FbPasserbyNpcSpline_1.FbPasserbyNpcSpline.Create(t));
        }
      }
    }
    return this.wQh;
  }
}
exports.FbPasserbyNpcSplineMove = FbPasserbyNpcSplineMove;
//# sourceMappingURL=FbPasserbyNpcSplineMove.js.map
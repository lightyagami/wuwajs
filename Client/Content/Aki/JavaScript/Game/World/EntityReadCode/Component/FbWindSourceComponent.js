"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWindSourceComponent = undefined;
const UnionWindSourceHelper_1 = require("./UnionWindSourceHelper");
class FbWindSourceComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.oOc = false;
    this.nOc = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbWindSourceComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get WindSource() {
    var e;
    var t;
    if (!this.oOc && (this.oOc = true, e = this.FbDataInternal.windSourceType(), t = UnionWindSourceHelper_1.UnionWindSourceHelper.GetUnionWindSourceObject(e))) {
      this.nOc = UnionWindSourceHelper_1.UnionWindSourceHelper.ReadUnionWindSource(e, this.FbDataInternal.windSource(t));
    }
    return this.nOc;
  }
}
exports.FbWindSourceComponent = FbWindSourceComponent;
//# sourceMappingURL=FbWindSourceComponent.js.map
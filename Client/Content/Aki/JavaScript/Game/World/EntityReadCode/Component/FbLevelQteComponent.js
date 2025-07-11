"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelQteComponent = undefined;
const UnionQteTypeHelper_1 = require("./UnionQteTypeHelper");
class FbLevelQteComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.NYh = false;
    this.VYh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbLevelQteComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get QteConfig() {
    var e;
    var t;
    if (!this.NYh && (this.NYh = true, e = this.FbDataInternal.qteConfigType(), t = UnionQteTypeHelper_1.UnionQteTypeHelper.GetUnionQteTypeObject(e))) {
      this.VYh = UnionQteTypeHelper_1.UnionQteTypeHelper.ReadUnionQteType(e, this.FbDataInternal.qteConfig(t));
    }
    return this.VYh;
  }
}
exports.FbLevelQteComponent = FbLevelQteComponent;
//# sourceMappingURL=FbLevelQteComponent.js.map
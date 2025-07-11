"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportToLatestResetPoint = undefined;
const UnionTeleportToLatestResetPointOptionHelper_1 = require("./UnionTeleportToLatestResetPointOptionHelper");
class FbTeleportToLatestResetPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportToLatestResetPoint(t);
    }
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionTeleportToLatestResetPointOptionHelper_1.UnionTeleportToLatestResetPointOptionHelper.GetUnionTeleportToLatestResetPointOptionObject(t))) {
      this.Hye = UnionTeleportToLatestResetPointOptionHelper_1.UnionTeleportToLatestResetPointOptionHelper.ReadUnionTeleportToLatestResetPointOption(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
  }
}
exports.FbTeleportToLatestResetPoint = FbTeleportToLatestResetPoint;
//# sourceMappingURL=FbTeleportToLatestResetPoint.js.map
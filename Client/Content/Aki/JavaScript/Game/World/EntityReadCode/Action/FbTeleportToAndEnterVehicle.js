"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportToAndEnterVehicle = undefined;
const UnionTeleportToAndEnterVehicleTypeHelper_1 = require("./UnionTeleportToAndEnterVehicleTypeHelper");
class FbTeleportToAndEnterVehicle {
  constructor(e) {
    this.FbDataInternal = e;
    this.s5_ = false;
    this.a5_ = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbTeleportToAndEnterVehicle(e);
    }
  }
  get ToVehicle() {
    var e;
    var t;
    if (!this.s5_ && (this.s5_ = true, e = this.FbDataInternal.toVehicleType(), t = UnionTeleportToAndEnterVehicleTypeHelper_1.UnionTeleportToAndEnterVehicleTypeHelper.GetUnionTeleportToAndEnterVehicleTypeObject(e))) {
      this.a5_ = UnionTeleportToAndEnterVehicleTypeHelper_1.UnionTeleportToAndEnterVehicleTypeHelper.ReadUnionTeleportToAndEnterVehicleType(e, this.FbDataInternal.toVehicle(t));
    }
    return this.a5_;
  }
}
exports.FbTeleportToAndEnterVehicle = FbTeleportToAndEnterVehicle;
//# sourceMappingURL=FbTeleportToAndEnterVehicle.js.map
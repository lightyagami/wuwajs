"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyVehicleBounce extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Time = 0;
    this.Height = 0;
    this.MotionCurve = undefined;
  }
  Constructor() {}
  K2_Notify(e, s) {
    var e = e.GetOwner();
    return e instanceof TsBaseVehicle_1.default && !!(e = e.VehicleActorComponent?.Entity?.GetComponent(275)) && (e.StartBounce({
      Time: this.Time,
      Height: this.Height,
      CurvePath: this.MotionCurve?.ToAssetPathName() ?? ""
    }), true);
  }
  GetNotifyName() {
    return "载具弹射运动";
  }
}
exports.default = TsAnimNotifyVehicleBounce;
//# sourceMappingURL=TsAnimNotifyVehicleBounce.js.map
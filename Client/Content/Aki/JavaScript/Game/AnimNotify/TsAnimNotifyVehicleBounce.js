"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
const GravityUtils_1 = require("../Utils/GravityUtils");
class TsAnimNotifyVehicleBounce extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Time = 0;
    this.Height = 0;
    this.MotionCurve = undefined;
  }
  Constructor() {}
  K2_Notify(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseVehicle_1.default) {
      var t = t.VehicleActorComponent;
      var i = t?.Entity?.GetComponent(327);
      if (t && i) {
        if (t.ActorGravityDirectProxy.DotProduct(t.ActorUpProxy) > MathUtils_1.MathUtils.KindaSmallNumber) {
          return false;
        }
        var s = this.MotionCurve?.ToAssetPathName() ?? "";
        MathUtils_1.MathUtils.CommonTempVector.DeepCopy(t.ActorLocationProxy);
        GravityUtils_1.GravityUtils.AddZnInGravity(t.ActorGravityDirectProxy, MathUtils_1.MathUtils.CommonTempVector, this.Height);
        i.SetConfig(this.Time, t.ActorLocationProxy, MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.CommonTempVector, s, 0, undefined, t.ActorGravityDirectProxy);
        i.StartCatapult();
      }
    }
    return true;
  }
  GetNotifyName() {
    return "载具弹射运动";
  }
}
exports.default = TsAnimNotifyVehicleBounce;
//# sourceMappingURL=TsAnimNotifyVehicleBounce.js.map
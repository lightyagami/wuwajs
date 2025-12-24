"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
class TsAnimNotifyLeaveVehicle extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.ExitType = 1;
  }
  Constructor() {}
  K2_Notify(e, s) {
    var e = e.GetOwner();
    if (e instanceof TsBaseVehicle_1.default && (e = e.GetEntityNoBlueprint()?.GetComponent(246))?.Driver) {
      e.TryLeaveAtOnce(e.Driver, this.ExitType ? 1 : 0, "TsAnimNotifyLeaveVehicle");
    }
    return true;
  }
  GetNotifyName() {
    return "退出乘坐状态";
  }
}
exports.default = TsAnimNotifyLeaveVehicle;
//# sourceMappingURL=TsAnimNotifyLeaveVehicle.js.map